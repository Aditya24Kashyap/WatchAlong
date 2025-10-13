import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Users } from 'lucide-react'
import { ChatMessage } from '@/lib/supabase'

interface ChatPanelProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
  currentUser: string
  connectedUsers: string[]
  className?: string
}

export const ChatPanel = ({ 
  messages, 
  onSendMessage, 
  currentUser,
  connectedUsers,
  className = '' 
}: ChatPanelProps) => {
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim())
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className={`flex flex-col h-full bg-glass border border-glass-border backdrop-blur-glass rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-glass-border">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Chat ({connectedUsers.length})</span>
        </div>
        <div className="flex gap-1">
          {connectedUsers.map((user, index) => (
            <span 
              key={user} 
              className={`text-xs px-2 py-1 rounded-full ${
                user === currentUser 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {user}
            </span>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div ref={scrollRef} className="space-y-3">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`p-3 rounded-lg max-w-[80%] ${
                message.username === currentUser
                  ? 'ml-auto bg-chat-own'
                  : 'bg-chat-bubble'
              }`}
            >
              {message.username !== currentUser && (
                <div className="text-xs text-primary font-medium mb-1">
                  {message.username}
                </div>
              )}
              <div className="text-sm">{message.message}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8">
              No messages yet. Start the conversation!
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-glass-border">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="bg-secondary/50 border-glass-border"
          />
          <Button 
            onClick={handleSend}
            size="icon"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}