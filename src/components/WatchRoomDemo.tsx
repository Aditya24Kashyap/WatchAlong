import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { YouTubePlayer } from './YouTubePlayer'
import { ChatPanel } from './ChatPanel'
import { Copy, Users, Play, Pause, Clock, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface WatchRoomDemoProps {
  roomId: string
  username: string
}

type DemoMessage = {
  id: string
  room_id: string
  username: string
  message: string
  timestamp: string
  created_at: string
}

type DemoRoomState = {
  video_url: string
  current_time: number
  is_playing: boolean
  last_updated: string
}

export const WatchRoomDemo = ({ roomId, username }: WatchRoomDemoProps) => {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [roomState, setRoomState] = useState<DemoRoomState | null>(null)
  const [messages, setMessages] = useState<DemoMessage[]>([])
  const [connectedUsers] = useState<string[]>([username, 'Demo Friend'])
  const [player, setPlayer] = useState<any>(null)
  const [isUpdatingFromRemote, setIsUpdatingFromRemote] = useState(false)
  const { toast } = useToast()

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const handleUrlSubmit = async () => {
    const id = extractVideoId(youtubeUrl)
    if (!id) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive"
      })
      return
    }

    setVideoId(id)
    
    const newState: DemoRoomState = {
      video_url: youtubeUrl,
      current_time: 0,
      is_playing: false,
      last_updated: new Date().toISOString()
    }
    
    setRoomState(newState)
    localStorage.setItem(`room_${roomId}`, JSON.stringify(newState))

    // Simulate friend loading the same video
    setTimeout(() => {
      const friendMessage: DemoMessage = {
        id: Math.random().toString(),
        room_id: roomId,
        username: 'Demo Friend',
        message: 'Great choice! Ready to watch 🍿',
        timestamp: new Date().toISOString(),
        created_at: new Date().toISOString()
      }
      setMessages(prev => [...prev, friendMessage])
    }, 2000)
  }

  const handlePlayerStateChange = useCallback(async ({ currentTime, playerState }: { currentTime: number; playerState: number }) => {
    if (isUpdatingFromRemote || !roomState) return

    const isPlaying = playerState === 1 // YT.PlayerState.PLAYING
    
    const newState: DemoRoomState = {
      ...roomState,
      current_time: currentTime,
      is_playing: isPlaying,
      last_updated: new Date().toISOString()
    }
    
    setRoomState(newState)
    localStorage.setItem(`room_${roomId}`, JSON.stringify(newState))

    // Simulate friend reactions
    if (playerState === 1) { // Playing
      setTimeout(() => {
        const friendMessage: DemoMessage = {
          id: Math.random().toString(),
          room_id: roomId,
          username: 'Demo Friend',
          message: 'Let\'s go! 🎬',
          timestamp: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
        setMessages(prev => [...prev, friendMessage])
      }, 1500)
    } else if (playerState === 2) { // Paused
      setTimeout(() => {
        const friendMessage: DemoMessage = {
          id: Math.random().toString(),
          room_id: roomId,
          username: 'Demo Friend',
          message: 'Good pause timing! ⏸️',
          timestamp: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
        setMessages(prev => [...prev, friendMessage])
      }, 1000)
    }
  }, [roomId, roomState, isUpdatingFromRemote])

  const sendMessage = (message: string) => {
    const newMessage: DemoMessage = {
      id: Math.random().toString(),
      room_id: roomId,
      username,
      message,
      timestamp: new Date().toISOString(),
      created_at: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, newMessage])

    // Simulate friend responses
    const responses = [
      'Totally agree! 👍',
      'Haha that\'s so true! 😂',
      'I was thinking the same thing!',
      'This part is amazing! ✨',
      'Right?! So good! 🔥'
    ]
    
    setTimeout(() => {
      const friendMessage: DemoMessage = {
        id: Math.random().toString(),
        room_id: roomId,
        username: 'Demo Friend',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
        created_at: new Date().toISOString()
      }
      setMessages(prev => [...prev, friendMessage])
    }, 1000 + Math.random() * 2000)
  }

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Room link copied!",
      description: "Share this link with others to watch together"
    })
  }

  // Load room state on mount
  useEffect(() => {
    const savedState = localStorage.getItem(`room_${roomId}`)
    if (savedState) {
      const state = JSON.parse(savedState) as DemoRoomState
      setRoomState(state)
      const id = extractVideoId(state.video_url)
      if (id) {
        setVideoId(id)
        setYoutubeUrl(state.video_url)
      }
    }

    // Add welcome message
    const welcomeMessage: DemoMessage = {
      id: 'welcome',
      room_id: roomId,
      username: 'Demo Friend',
      message: `Welcome to the watch party, ${username}! 🎉`,
      timestamp: new Date().toISOString(),
      created_at: new Date().toISOString()
    }
    setMessages([welcomeMessage])
  }, [roomId, username])

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Demo Notice */}
        <Alert className="mb-6 bg-primary/10 border-primary/20">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Demo Mode:</strong> This is a demonstration of the Watch Together app. 
            In the full version, this would use real-time synchronization with WebRTC and a signaling server.
            Messages and sync are simulated for demo purposes.
          </AlertDescription>
        </Alert>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Watch Together
              </h1>
              <p className="text-muted-foreground">Room: {roomId}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {connectedUsers.length} online
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyRoomLink}
                className="flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                Share Room
              </Button>
            </div>
          </div>

          {/* URL Input */}
          <div className="flex gap-2 p-4 bg-glass border border-glass-border backdrop-blur-glass rounded-lg">
            <Input
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste YouTube URL here... (try: https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
              className="bg-secondary/50 border-glass-border"
            />
            <Button 
              onClick={handleUrlSubmit}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Load Video
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-glass border border-glass-border backdrop-blur-glass rounded-lg p-4">
              <YouTubePlayer
                videoId={videoId}
                onStateChange={handlePlayerStateChange}
                onReady={setPlayer}
              />
              
              {roomState && (
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {roomState.is_playing ? (
                      <Play className="w-3 h-3 text-green-500" />
                    ) : (
                      <Pause className="w-3 h-3 text-yellow-500" />
                    )}
                    {roomState.is_playing ? 'Playing' : 'Paused'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {Math.floor(roomState.current_time / 60)}:{String(Math.floor(roomState.current_time % 60)).padStart(2, '0')}
                  </div>
                  <div className="text-xs">
                    Last updated: {new Date(roomState.last_updated).toLocaleTimeString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-1">
            <ChatPanel
              messages={messages}
              onSendMessage={sendMessage}
              currentUser={username}
              connectedUsers={connectedUsers}
              className="h-[600px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}