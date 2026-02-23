import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { YouTubePlayer } from "./YouTubePlayer";
import { Slider } from "./ui/slider";
import { WavyText } from "./WavyText";

const songs = [
  { id: "song-1", title: "Hotel California", artist: "The Eagles", videoId: "09839DpTctU", tags: ["Classic Rock"] },
  { id: "song-2", title: "Kick it To Me", artist: "Sammy Rae and the Friends", videoId: "x9PNyzWtM7I", tags: ["Funk", "Soul"] },
  { id: "song-3", title: "Castle in Hollywood", artist: "Laufey", videoId: "SOID9nV1iSo", tags: ["Jazz", "Pop"] },
];

// --------------------- Card Back ---------------------
function CardBack() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/80 to-black rounded-xl border-2 border-purple-400/40 flex items-center justify-center overflow-hidden" style={{ transform: 'scaleX(-1)' }}>
      {/* Decorative corners */}
      {["top-left","top-right","bottom-left","bottom-right"].map((corner, idx) => (
        <div key={idx} className={`absolute ${corner.includes("top") ? "top-4" : "bottom-4"} ${corner.includes("left") ? "left-4" : "right-4"} w-8 h-8 border-2 border-${corner.includes("left") ? "l" : "r"}-${corner.includes("top") ? "t" : "b"}-purple-400/60 rounded-${corner}`} />
      ))}
      {/* Center Logo */}
      <div className="flex items-center justify-center gap-8">
        {["J","B"].map((letter, idx) => (
          <div key={idx} className="text-8xl italic" style={{
            background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '700',
            letterSpacing: '0.1em'
          }}>{letter}</div>
        ))}
        <div className="h-20 w-0.5" style={{ background: 'linear-gradient(to bottom, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-purple-600/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>
    </div>
  );
}

// --------------------- Carousel Card ---------------------
interface CarouselCardProps {
  song: typeof songs[0];
  position: ReturnType<typeof getCardPosition>;
  isCenterCard: boolean;
  offset: number;
  index: number;
  isDragging: boolean;
}

function CarouselCard({ song, position, isCenterCard, offset, index, isDragging }: CarouselCardProps) {
  const totalCards = songs.length;
  const angle = (offset / totalCards) * Math.PI * 2;
  const targetRotation = (angle / Math.PI) * 180;
  const rotateY = useMotionValue(targetRotation);
  const showFront = offset >= -0.75 && offset <= 0.75;
  const phaseOffset = index * 0.8;
  const baseY = position.y - 245;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[350px]"
      initial={false}
      animate={{
        x: position.x - 175,
        y: baseY,
        z: position.z,
        rotateY: targetRotation + (position.rotateYBase || 0),
        rotateX: position.rotateX,
        rotateZ: 0,
        scale: position.scale,
        opacity: position.opacity,
      }}
      transition={isDragging ? { type: "tween", duration: 0 } : { type: "spring", stiffness: 80, damping: 18, mass: 1.2 }}
      style={{ zIndex: position.zIndex, transformStyle: 'preserve-3d', rotateY, pointerEvents: 'auto' }}
    >
      <motion.div className="relative w-full h-[490px]" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div
          className="w-full h-full"
          animate={{
            y: [-8, 0, -8],
            rotateX: [0, 1.5, 0],
            rotateZ: [0, isCenterCard ? 0.8 : 0.5, 0, isCenterCard ? -0.8 : -0.5, 0]
          }}
          transition={{
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: phaseOffset },
            rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: phaseOffset },
            rotateZ: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: phaseOffset * 0.7 }
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
        {/* Card Front */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: showFront ? 1 : 0,
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            pointerEvents: 'auto', // allow pointer events
          }}
        >
          <Card
            className="h-full overflow-hidden border-primary shadow-2xl shadow-primary/30 flex flex-col bg-card/90 backdrop-blur-sm"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="youtube-player w-full h-full"
              style={{
                transform: window.innerWidth < 768 ? 'none' : undefined,
                backfaceVisibility: 'visible',
                pointerEvents: 'auto',
              }}
            >
              {/* Desktop Player */}
              <div className="hidden md:block w-full h-full">
                <YouTubePlayer videoId={song.videoId} className="w-full h-full" />
              </div>
            
              {/* Mobile Player */}
              <div className="block md:hidden absolute top-0 left-0 w-full h-full z-50">
                <YouTubePlayer videoId={song.videoId} className="w-full h-full" />
              </div>
            </div>
        
            <CardHeader className="flex-grow">
              <CardTitle>{song.title}</CardTitle>
              <CardDescription>{song.artist}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {song.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <a href={`https://www.youtube.com/watch?v=${song.videoId}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Listen on YouTube
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

          {/* Card Back */}
          <motion.div className="absolute inset-0" style={{ display: showFront ? 'none' : 'block' }}>
            <CardBack />
          </motion.div>

          {/* 3D Edges */}
          {["top","bottom","left","right"].map((edge, idx) => (
          <div key={idx} className="absolute ${edge}-0 pointer-events-none" style={{
              ...(edge === "top" || edge === "bottom" ? { left:0,right:0,height:12,transform: edge==="top"?"rotateX(90deg)":"rotateX(-90deg)", transformOrigin: edge==="top"?"top":"bottom" } : { top:0,bottom:0,width:12, transform: edge==="left"?"rotateY(-90deg)":"rotateY(90deg)", transformOrigin: edge==="left"?"left":"right" }),
              background: "linear-gradient(to bottom, #6b21a8, #4c1d95)",
              borderWidth: "1px",
              borderColor: "rgba(167,139,250,0.4)",
              backfaceVisibility: 'hidden'
            }} />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// --------------------- Carousel Logic ---------------------
const getCardPosition = (index: number, centerRotation: number) => {
  const totalCards = songs.length;
  const offset = ((index - centerRotation) % totalCards + totalCards) % totalCards;
  const normalizedOffset = offset > totalCards/2 ? offset - totalCards : offset;
  const angle = (normalizedOffset / totalCards) * Math.PI * 2;
  const radius = 500;
  const depth = Math.abs(normalizedOffset);

  return {
    x: Math.sin(angle) * radius,
    y: 0,
    z: -depth * 250,
    rotateX: Math.abs(normalizedOffset)<0.1?0:-1,
    rotateYBase: 0,
    isRightSide: normalizedOffset>0,
    scale: Math.max(0.7,1-depth*0.06),
    opacity: Math.max(0.2,0.2 + (1 - depth/(totalCards/2))*0.8),
    zIndex: Math.round(50-depth*10)
  };
};

// --------------------- Projects Section ---------------------
export function Projects() {
  const [centerRotation, setCenterRotation] = useState(0);
  const [isSliderDragging, setIsSliderDragging] = useState(false);

  const handleSliderPointerDown = () => {
    setIsSliderDragging(true);
  };

  const handleSliderChange = (value: number[]) => {
    if (isSliderDragging) {
      setCenterRotation(value[0]);
    }
  };

  const handleSliderCommit = (value: number[]) => {
    const nearestIndex = Math.round(value[0]);
    setCenterRotation(nearestIndex);
    setIsSliderDragging(false);
  };

  return (
    <section id="music" className="min-h-screen py-24 bg-gradient-to-b from-black via-purple-950/50 to-black flex items-center relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-600/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/12 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="mb-4" style={{ color: 'transparent' }}>
            <WavyText text="Music of the Moment!" large />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Music is something very important to me! Here are some songs I am listening to a lot at the moment :)
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative w-full h-[700px] flex items-center justify-center" style={{ perspective: '2000px' }}>
          <div className="relative w-full h-full">
            <AnimatePresence mode="sync">
              {songs.map((song, index) => {
                const position = getCardPosition(index, centerRotation);
                const offset = ((index - centerRotation) % songs.length + songs.length) % songs.length;
                const normalizedOffset = offset > songs.length / 2 ? offset - songs.length : offset;
                const isCenterCard = Math.abs(normalizedOffset) < 0.1;

                return (
                  <CarouselCard
                    key={index}
                    song={song}
                    position={position}
                    isCenterCard={isCenterCard}
                    offset={normalizedOffset}
                    index={index}
                    isDragging={false} // Always false, drag disabled
                  />
                );
              })}
            </AnimatePresence>
          </div>

          {/* Slider navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60] w-96 px-8" onPointerDown={handleSliderPointerDown}>
            <Slider
              value={[centerRotation]}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
              min={0}
              max={songs.length - 1}
              step={0.01}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}