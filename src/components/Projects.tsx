import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { WavyText } from "./WavyText";
import { Link } from "react-router-dom";
import { YouTubePlayer } from "./YouTubePlayer";
import { Slider } from "./ui/slider";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";

const projects = [
  {
    id: "snake-quiz-game",
    title: "Snake + Quiz Game",
    description: "An application with a retro vibe, created for my Lower Sixth Coursework",
    image: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnh1cTN0Z3FyZTJodnBiZnUwNWZtejA3a3g2MGtpNzNqcW02MXJ0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QXfFauCUlD7gPpiGrc/giphy.gif",
    tags: ["C#", "Winforms", "Solo Development", "Education - Yr13"],
    github: "#",
    showFullImage: true
  },
  {
    id: "spin-cycle-game",
    title: "Spin Cycle Game",
    description: "Designing and developing a Lua-based game with the LÖVE2D framework, bringing creative ideas to life through engaging UI and immersive player experiences.",
    image: "https://img.youtube.com/vi/NH0NghaJhNU/maxresdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/NH0NghaJhNU",
    tags: ["Lua", "Love2D", "Visual Studio Code"],
    github: "#",
    showFullImage: false
  },
  {
    id: "3d-modeling",
    title: "3D Modeling",
    description: "Messing around a bunch with Blender for personal projects and general development",
    image: "",
    tags: ["Blender"],
    github: "#",
    showFullImage: false
  }
];

// Card Back Component with J & B Logo
function CardBack() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/80 to-black rounded-xl border-2 border-purple-400/40 flex items-center justify-center overflow-hidden" style={{ transform: 'scaleX(-1)' }}>
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400/60 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400/60 rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400/60 rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-400/60 rounded-br-lg"></div>
      
      {/* Center logo - horizontal layout for wider appearance */}
      <div className="flex flex-row items-center justify-center gap-8">
        <div className="text-8xl italic" style={{ 
          background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: '700',
          letterSpacing: '0.1em'
        }}>
          J
        </div>
        <div className="h-20 w-0.5" style={{
          background: 'linear-gradient(to bottom, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)'
        }}></div>
        <div className="text-8xl italic" style={{ 
          background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: '700',
          letterSpacing: '0.1em'
        }}>
          B
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-600/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>
    </div>
  );
}

// Individual Card Component
function CarouselCard({ 
  project, 
  position, 
  isCenterCard,
  offset,
  index,
  isDragging
}: { 
  project: typeof projects[0], 
  position: ReturnType<typeof getCardPosition>,
  isCenterCard: boolean,
  offset: number,
  index: number,
  isDragging: boolean
}) {
  const totalCards = projects.length;
  
  // Calculate the rotation based on continuous offset
  const angle = (offset / totalCards) * Math.PI * 2;
  const targetRotation = (angle / Math.PI) * 180;
  
  const rotateY = useMotionValue(targetRotation);
  
  // Determine front/back based on card's position in the carousel
  // Cards flip only at the left and right apexes (90° and 270°)
  // Show front when card is between -0.75 and +0.75 (between left and right apexes)
  // Show back when card is past these points (in the back half)
  const showFront = offset >= -0.75 && offset <= 0.75;

  // Idle animation phase offset for each card (creates wave effect)
  const phaseOffset = index * 0.8;

  // Base Y position that transitions smoothly
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
      transition={isDragging ? {
        x: { type: "tween", duration: 0 },
        y: { type: "tween", duration: 0 },
        z: { type: "tween", duration: 0 },
        rotateY: { type: "tween", duration: 0 },
        rotateX: { type: "tween", duration: 0 },
        rotateZ: { type: "tween", duration: 0 },
        scale: { type: "tween", duration: 0 },
        opacity: { type: "tween", duration: 0 }
      } : {
        x: {
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.2
        },
        y: {
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.2
        },
        z: {
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.2
        },
        rotateY: {
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.2
        },
        rotateX: {
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.2
        },
        rotateZ: {
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.2
        },
        scale: {
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.2
        },
        opacity: {
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.2
        }
      }}
      style={{
        zIndex: position.zIndex,
        transformStyle: 'preserve-3d',
        rotateY,
        pointerEvents: isCenterCard ? 'auto' : 'none'
      }}
    >
      <motion.div 
        className="relative w-full h-[490px]"
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Idle animation wrapper - adds floating and subtle rotation on top of base position */}
        <motion.div
          className="w-full h-full"
          animate={{
            y: [-8, 0, -8],
            rotateX: [0, 1.5, 0],
            rotateZ: [0, isCenterCard ? 0.8 : 0.5, 0, isCenterCard ? -0.8 : -0.5, 0]
          }}
          transition={{
            y: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: phaseOffset
            },
            rotateX: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: phaseOffset
            },
            rotateZ: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: phaseOffset * 0.7
            }
          }}
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Card Front */}
          <motion.div 
            className="absolute inset-0"
            style={{
              display: showFront ? 'block' : 'none',
              transformStyle: 'preserve-3d'
            }}
          >
            <Card className="h-full overflow-hidden border-primary shadow-2xl shadow-primary/30 flex flex-col bg-card/90 backdrop-blur-sm" style={{ transformStyle: 'preserve-3d' }}>
              <div className={`aspect-video overflow-hidden ${project.showFullImage ? 'bg-black' : 'bg-accent'}`}>
                {project.videoEmbed ? (
                  <YouTubePlayer
                    videoId="NH0NghaJhNU"
                    className="w-full h-full"
                    autoplay={true}
                    loop={true}
                    muted={true}
                    controls={false}
                  />
                ) : (
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full ${project.showFullImage ? 'object-contain' : 'object-cover'}`}
                  />
                )}
              </div>
              <CardHeader className="flex-grow">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2" style={{ pointerEvents: 'auto' }}>
                  <Link to={`/project/${project.id}`} className="flex-1" style={{ pointerEvents: 'auto' }}>
                    <Button variant="outline" size="sm" className="w-full" style={{ pointerEvents: 'auto' }}>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Check it out
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="flex-1" style={{ pointerEvents: 'auto' }}>
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card Back */}
          <motion.div 
            className="absolute inset-0"
            style={{
              display: showFront ? 'none' : 'block'
            }}
          >
            <CardBack />
          </motion.div>

          {/* 3D Thickness - Top Edge */}
          <div 
            className="absolute top-0 left-0 right-0 h-[12px] bg-gradient-to-b from-purple-900/80 to-purple-950/90 border-t border-l border-r border-primary/40"
            style={{
              transform: 'rotateX(90deg)',
              transformOrigin: 'top',
              backfaceVisibility: 'hidden'
            }}
          />
          
          {/* 3D Thickness - Bottom Edge */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[12px] bg-gradient-to-t from-purple-900/80 to-purple-950/90 border-b border-l border-r border-primary/40"
            style={{
              transform: 'rotateX(-90deg)',
              transformOrigin: 'bottom',
              backfaceVisibility: 'hidden'
            }}
          />
          
          {/* 3D Thickness - Left Edge */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-[12px] bg-gradient-to-r from-purple-900/80 to-purple-950/90 border-t border-b border-l border-primary/40"
            style={{
              transform: 'rotateY(-90deg)',
              transformOrigin: 'left',
              backfaceVisibility: 'hidden'
            }}
          />
          
          {/* 3D Thickness - Right Edge */}
          <div 
            className="absolute top-0 right-0 bottom-0 w-[12px] bg-gradient-to-l from-purple-900/80 to-purple-950/90 border-t border-b border-r border-primary/40"
            style={{
              transform: 'rotateY(90deg)',
              transformOrigin: 'right',
              backfaceVisibility: 'hidden'
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Calculate position for each card based on its offset from center (continuous rotation)
const getCardPosition = (index: number, centerRotation: number) => {
  const totalCards = projects.length;
  const offset = ((index - centerRotation) % totalCards + totalCards) % totalCards;
  
  // Normalize offset to be between -totalCards/2 and totalCards/2
  const normalizedOffset = offset > totalCards / 2 ? offset - totalCards : offset;
  
  // Cards spiral around the center in 3D space
  const angle = (normalizedOffset / totalCards) * Math.PI * 2;
  const radius = 500;
  const depthFactor = Math.abs(normalizedOffset);
  
  // Background cards are flat (no Y rotation) but tilted backwards (X rotation)
  const isRightSide = normalizedOffset > 0;
  const rotateYBase = 0; // No side tilting - cards stay flat
  const rotateXTilt = Math.abs(normalizedOffset) < 0.1 ? 0 : -1; // Minimal backwards tilt for background cards
  
  // Calculate opacity - fade to 0.2 when card is at the back
  const distanceFromCenter = Math.abs(normalizedOffset);
  const normalizedDistance = 1 - (distanceFromCenter / (totalCards / 2));
  // Interpolate between 0.2 (at back) and 1 (at center)
  const opacity = Math.max(0.2, 0.2 + (normalizedDistance * 0.8));
  
  // Scale based on distance from center
  const scale = Math.max(0.7, 1 - (depthFactor * 0.06));
  
  return {
    x: Math.sin(angle) * radius,
    y: 0,
    z: -depthFactor * 200 - 250,
    rotateX: rotateXTilt,
    rotateYBase: rotateYBase,
    isRightSide: isRightSide,
    scale: scale,
    opacity: opacity,
    zIndex: Math.round(50 - depthFactor * 10)
  };
};

export function Projects() {
  const [centerRotation, setCenterRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start dragging if slider is being used
    if (isSliderDragging) return;
    
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartRotation.current = centerRotation;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isSliderDragging) return;
    
    const dragDistance = e.clientX - dragStartX.current;
    const rotationChange = -(dragDistance / 300); // Negative for correct direction, adjust sensitivity
    
    setCenterRotation(dragStartRotation.current + rotationChange);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Snap to nearest card
    const nearestIndex = Math.round(centerRotation);
    setCenterRotation(nearestIndex);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const handleSliderPointerDown = () => {
    setIsSliderDragging(true);
  };

  const handleSliderChange = (value: number[]) => {
    if (isSliderDragging) {
      setCenterRotation(value[0]);
    }
  };

  const handleSliderCommit = (value: number[]) => {
    // Snap to nearest card
    const nearestIndex = Math.round(value[0]);
    setCenterRotation(nearestIndex);
    setIsSliderDragging(false);
  };

  return (
    <section id="projects" className="min-h-screen py-24 bg-gradient-to-b from-black via-purple-950/50 to-black flex items-center relative overflow-hidden">
      {/* Colorful ambient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-600/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/12 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="mb-4" style={{ color: 'transparent' }}><WavyText text="Featured Projects" large /></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience in design and development.
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div 
          className="relative w-full h-[700px] flex items-center justify-center" 
          style={{ perspective: '2000px', cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative w-full h-full">
            <AnimatePresence mode="sync">
              {projects.map((project, index) => {
                const position = getCardPosition(index, centerRotation);
                const offset = ((index - centerRotation) % projects.length + projects.length) % projects.length;
                const normalizedOffset = offset > projects.length / 2 ? offset - projects.length : offset;
                const isCenterCard = Math.abs(normalizedOffset) < 0.1;

                return (
                  <CarouselCard
                    key={index}
                    project={project}
                    position={position}
                    isCenterCard={isCenterCard}
                    offset={normalizedOffset}
                    index={index}
                    isDragging={isDragging}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          {/* Scrollbar Control */}
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60] w-96 px-8"
            onPointerDown={handleSliderPointerDown}
          >
            <Slider
              value={[centerRotation]}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
              min={0}
              max={projects.length - 1}
              step={0.01}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}