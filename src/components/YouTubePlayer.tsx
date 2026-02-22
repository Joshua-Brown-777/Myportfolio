import { useEffect, useRef, useState } from "react";

interface YouTubePlayerProps {
  videoId: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubePlayer({
  videoId,
  className = "",
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
}: YouTubePlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (playerRef.current && window.YT && window.YT.Player) {
        playerInstanceRef.current = new window.YT.Player(playerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            mute: muted ? 1 : 0,
            controls: controls ? 1 : 0,
            loop: loop ? 1 : 0,
            playlist: loop ? videoId : undefined,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
          },
          events: {
            onStateChange: (event: any) => {
              // YouTube player states:
              // -1 (unstarted)
              // 0 (ended)
              // 1 (playing)
              // 2 (paused)
              // 3 (buffering)
              // 5 (video cued)
              
              if (event.data === 3 || event.data === 0 || event.data === -1) {
                // Buffering, ended, or unstarted
                setIsBuffering(true);
              } else if (event.data === 1) {
                // Playing
                setIsBuffering(false);
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }
    };
  }, [videoId, autoplay, loop, muted, controls]);

  return (
    <div className="relative w-full h-full">
      <div ref={playerRef} className={className} />
      {isBuffering && (
        <div className="absolute inset-0 backdrop-blur-md bg-black/20 pointer-events-none transition-opacity duration-300" />
      )}
    </div>
  );
}
