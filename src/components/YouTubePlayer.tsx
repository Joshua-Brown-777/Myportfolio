interface YouTubePlayerProps {
  videoId: string;
  className?: string;
}

export function YouTubePlayer({ videoId, className = "" }: YouTubePlayerProps) {
  return (
    <iframe
      className={className}
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        pointerEvents: "auto"
      }}
    />
  );
}