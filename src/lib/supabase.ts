import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://demo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type RoomState = {
  id: string
  video_url: string
  current_time: number
  is_playing: boolean
  last_updated: string
  created_at: string
}

export type ChatMessage = {
  id: string
  room_id: string
  username: string
  message: string
  timestamp: string
  created_at: string
}