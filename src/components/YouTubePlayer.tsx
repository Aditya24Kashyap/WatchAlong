import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

interface YouTubePlayerProps {
  videoId: string
  onStateChange?: (state: { currentTime: number; playerState: number }) => void
  onReady?: (player: any) => void
  seekTo?: number
  shouldPlay?: boolean
}

export const YouTubePlayer = ({ 
  videoId, 
  onStateChange, 
  onReady,
  seekTo,
  shouldPlay
}: YouTubePlayerProps) => {
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAPIReady, setIsAPIReady] = useState(false)

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        setIsAPIReady(true)
      }
    } else {
      setIsAPIReady(true)
    }
  }, [])

  useEffect(() => {
    if (isAPIReady && containerRef.current && videoId) {
      // Destroy existing player
      if (playerRef.current) {
        playerRef.current.destroy()
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        width: '100%',
        height: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          disablekb: 0,
          enablejsapi: 1,
          fs: 1,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0
        },
        events: {
          onReady: (event: any) => {
            onReady?.(event.target)
          },
          onStateChange: (event: any) => {
            const currentTime = event.target.getCurrentTime()
            const playerState = event.data
            onStateChange?.({ currentTime, playerState })
          }
        }
      })
    }
  }, [isAPIReady, videoId, onReady])

  useEffect(() => {
    if (playerRef.current && typeof seekTo === 'number') {
      playerRef.current.seekTo(seekTo, true)
    }
  }, [seekTo])

  useEffect(() => {
    if (playerRef.current && typeof shouldPlay === 'boolean') {
      if (shouldPlay) {
        playerRef.current.playVideo()
      } else {
        playerRef.current.pauseVideo()
      }
    }
  }, [shouldPlay])

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      {!videoId && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
          <p className="text-muted-foreground">Enter a YouTube URL to start watching</p>
        </div>
      )}
    </div>
  )
}