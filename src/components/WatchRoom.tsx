import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { YouTubePlayer } from './YouTubePlayer'
import { ChatPanel } from './ChatPanel'
import { supabase, RoomState, ChatMessage } from '@/lib/supabase'
import { Copy, Users, Play, Pause, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface WatchRoomProps {
  roomId: string
  username: string
}

export const WatchRoom = ({ roomId, username }: WatchRoomProps) => {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [roomState, setRoomState] = useState<RoomState | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [connectedUsers, setConnectedUsers] = useState<string[]>([])
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
    
    // Update room state in Supabase
    const { error } = await supabase
      .from('watch_rooms')
      .upsert({
        id: roomId,
        video_url: youtubeUrl,
        current_time: 0,
        is_playing: false,
        last_updated: new Date().toISOString()
      })

    if (error) {
      console.error('Error updating room:', error)
    }
  }

  const handlePlayerStateChange = useCallback(async ({ currentTime, playerState }: { currentTime: number; playerState: number }) => {
    if (isUpdatingFromRemote || !roomState) return

    const isPlaying = playerState === 1 // YT.PlayerState.PLAYING
    
    const { error } = await supabase
      .from('watch_rooms')
      .update({
        current_time: currentTime,
        is_playing: isPlaying,
        last_updated: new Date().toISOString()
      })
      .eq('id', roomId)

    if (error) {
      console.error('Error updating player state:', error)
    }
  }, [roomId, roomState, isUpdatingFromRemote])

  const sendMessage = async (message: string) => {
    const { error } = await supabase
      .from('chat_messages')
      .insert({
        room_id: roomId,
        username,
        message,
        timestamp: new Date().toISOString()
      })

    if (error) {
      console.error('Error sending message:', error)
    }
  }

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Room link copied!",
      description: "Share this link with others to watch together"
    })
  }

  // Subscribe to room state changes
  useEffect(() => {
    const subscription = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'watch_rooms',
        filter: `id=eq.${roomId}`
      }, (payload) => {
        if (payload.new) {
          const newState = payload.new as RoomState
          setRoomState(newState)
          
          const newVideoId = extractVideoId(newState.video_url)
          if (newVideoId && newVideoId !== videoId) {
            setVideoId(newVideoId)
            setYoutubeUrl(newState.video_url)
          }

          // Sync player state
          if (player && newVideoId) {
            setIsUpdatingFromRemote(true)
            
            if (Math.abs(player.getCurrentTime() - newState.current_time) > 2) {
              player.seekTo(newState.current_time, true)
            }
            
            if (newState.is_playing) {
              player.playVideo()
            } else {
              player.pauseVideo()
            }
            
            setTimeout(() => setIsUpdatingFromRemote(false), 1000)
          }
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [roomId, videoId, player])

  // Subscribe to chat messages
  useEffect(() => {
    const subscription = supabase
      .channel(`chat:${roomId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${roomId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as ChatMessage])
      })
      .subscribe()

    // Load existing messages
    const loadMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true })
        .limit(50)

      if (data) {
        setMessages(data)
      }
    }

    loadMessages()

    return () => {
      subscription.unsubscribe()
    }
  }, [roomId])

  // Simulate connected users (in a real app, you'd track this properly)
  useEffect(() => {
    setConnectedUsers([username, 'Friend'])
  }, [username])

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
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
              placeholder="Paste YouTube URL here..."
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