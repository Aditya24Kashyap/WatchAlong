import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Users, Plus, ArrowRight, Play, MessageCircle, RotateCw } from 'lucide-react'

interface JoinRoomProps {
  onJoinRoom: (roomId: string, username: string) => void
}

export const JoinRoom = ({ onJoinRoom }: JoinRoomProps) => {
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('')

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleCreateRoom = () => {
    if (!username.trim()) return
    const newRoomId = generateRoomId()
    onJoinRoom(newRoomId, username.trim())
  }

  const handleJoinRoom = () => {
    if (!username.trim() || !roomId.trim()) return
    onJoinRoom(roomId.trim().toUpperCase(), username.trim())
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-glass border border-glass-border backdrop-blur-glass rounded-full mb-6">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Watch Together</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Sync Up
            </span>
            <br />
            <span className="text-foreground">Watch Together</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Share YouTube videos with friends in perfect sync. Chat in real-time while you watch your favorite content together.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center p-6 bg-glass border border-glass-border backdrop-blur-glass rounded-lg">
              <RotateCw className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Perfect Sync</h3>
              <p className="text-sm text-muted-foreground text-center">
                Watch videos in perfect synchronization with your friends
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-glass border border-glass-border backdrop-blur-glass rounded-lg">
              <MessageCircle className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Real-time Chat</h3>
              <p className="text-sm text-muted-foreground text-center">
                Share reactions and thoughts with instant messaging
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-glass border border-glass-border backdrop-blur-glass rounded-lg">
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Watch Parties</h3>
              <p className="text-sm text-muted-foreground text-center">
                Create or join rooms to watch with multiple friends
              </p>
            </div>
          </div>
        </div>

        {/* Join/Create Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Room */}
          <Card className="bg-glass border-glass-border backdrop-blur-glass shadow-elevated">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Create New Room</CardTitle>
              <CardDescription>
                Start a new watch party and invite your friends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Username</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-secondary/50 border-glass-border"
                />
              </div>
              <Button 
                onClick={handleCreateRoom}
                disabled={!username.trim()}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                Create Room
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Join Room */}
          <Card className="bg-glass border-glass-border backdrop-blur-glass shadow-elevated">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">Join Room</CardTitle>
              <CardDescription>
                Join an existing watch party with a room code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Username</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-secondary/50 border-glass-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Room Code</label>
                <Input
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                  placeholder="Enter room code"
                  className="bg-secondary/50 border-glass-border font-mono"
                />
              </div>
              <Button 
                onClick={handleJoinRoom}
                disabled={!username.trim() || !roomId.trim()}
                variant="outline"
                className="w-full border-glass-border hover:bg-secondary/20"
                size="lg"
              >
                Join Room
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Separator className="my-8" />
          <p className="text-sm text-muted-foreground">
            Simply paste any YouTube URL to start watching together instantly
          </p>
        </div>
      </div>
    </div>
  )
}