import { useState } from 'react'
import { JoinRoom } from '@/components/JoinRoom'
import { WatchRoomDemo } from '@/components/WatchRoomDemo'

const Index = () => {
  const [currentRoom, setCurrentRoom] = useState<{ roomId: string; username: string } | null>(null)

  const handleJoinRoom = (roomId: string, username: string) => {
    setCurrentRoom({ roomId, username })
  }

  if (currentRoom) {
    return <WatchRoomDemo roomId={currentRoom.roomId} username={currentRoom.username} />
  }

  return <JoinRoom onJoinRoom={handleJoinRoom} />
};

export default Index;
