import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import profilePhoto from "figma:asset/09142753af3c50c3fde69963cadf02da5a592784.png";
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Create wavy text effect
  const text = "Hello! Welcome to my Portfolio!";
  const repeatedText = (text + " • ").repeat(15); // Repeat to fill screen width
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [letterColors, setLetterColors] = useState<string[]>([]);

  // Calculate color based on viewport position
  const getColorFromPosition = (xPos: number, viewportWidth: number): string => {
    const relativePos = xPos / viewportWidth;
    
    if (relativePos < 0) {
      return '#EC4899'; // Pink for off-screen left
    } else if (relativePos > 1) {
      return '#3B82F6'; // Blue for off-screen right
    } else if (relativePos < 0.5) {
      // Interpolate between pink and purple (0 to 0.5)
      const t = relativePos * 2;
      return interpolateColor('#EC4899', '#9333EA', t);
    } else {
      // Interpolate between purple and blue (0.5 to 1)
      const t = (relativePos - 0.5) * 2;
      return interpolateColor('#9333EA', '#3B82F6', t);
    }
  };

  // Helper function to interpolate between two hex colors
  const interpolateColor = (color1: string, color2: string, t: number): string => {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  useEffect(() => {
    const updateColors = () => {
      if (!containerRef.current) return;
      
      const letters = containerRef.current.querySelectorAll('.wave-letter');
      const viewportWidth = window.innerWidth;
      const newColors: string[] = [];
      
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const color = getColorFromPosition(centerX, viewportWidth);
        newColors.push(color);
      });
      
      setLetterColors(newColors);
    };

    updateColors();
    const interval = setInterval(updateColors, 50); // Update every 50ms for smooth color transitions

    return () => clearInterval(interval);
  }, []);
  
  // Generate wave keyframes - creates a smooth sine wave cycle
  const waveSteps = 72; // Number of keyframe steps for smooth animation
  const generateWaveKeyframes = () => {
    let keyframes = '';
    for (let i = 0; i <= waveSteps; i++) {
      const percentage = (i / waveSteps) * 100;
      const radians = (i / waveSteps) * Math.PI * 2; // One full cycle

      // Vertical amplitude
      const offsetY = Math.sin(radians) * 25; // amplitude of 25px

      // Gentle rotation synced to the same wave
      const rotation = Math.sin(radians) * 4; // ±4 degrees of tilt

      keyframes += `${percentage.toFixed(2)}% { transform: translateY(${offsetY}px) rotate(${rotation}deg); }\n`;
    }
    return keyframes;
  };
  
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950/60 to-black pt-16 pb-32 relative overflow-hidden">
      {/* Colorful accent orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
      {/* Full-width wavy text - top */}
      <div className="w-full overflow-hidden py-12 mt-6 mb-8 relative z-10">
        <style>{`
          @keyframes scroll-horizontal {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          @keyframes scroll-horizontal-reverse {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(0);
            }
          }
          
          /* Each letter moves vertically + rotates slightly for a soft wave lean */
          @keyframes wave-vertical {
            ${generateWaveKeyframes()}
          }
          
          .scrolling-wave {
            animation: scroll-horizontal 60s linear infinite;
          }
          
          .scrolling-wave-reverse {
            animation: scroll-horizontal-reverse 60s linear infinite;
          }
          
          .wave-letter {
            display: inline-block;
            animation: wave-vertical 30s linear infinite;
            transform-origin: center bottom;
          }
        `}</style>

        {/* Text Row */}
        <div
          ref={containerRef}
          className="flex whitespace-nowrap text-4xl sm:text-5xl lg:text-6xl tracking-wide scrolling-wave"
          style={{ 
            flexShrink: 0, 
            fontWeight: 500,
          }}
        >
          {repeatedText.split('').map((char, index) => {
            const delaySeconds = -(index * 1);
            return (
              <span
                key={index}
                className="wave-letter"
                style={{ 
                  animationDelay: `${delaySeconds}s`,
                  color: letterColors[index] || '#EC4899'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}

          {/* Duplicate for seamless loop */}
          {repeatedText.split('').map((char, index) => {
            const delaySeconds = -(index * 1);
            const colorIndex = index + repeatedText.length;
            return (
              <span
                key={`duplicate-${index}`}
                className="wave-letter"
                style={{ 
                  animationDelay: `${delaySeconds}s`,
                  color: letterColors[colorIndex] || '#EC4899'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 px-8 sm:px-12 lg:px-0">
          {/* Text content */}
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-foreground mb-10 text-5xl sm:text-6xl lg:text-7xl leading-tight relative" style={{ fontWeight: 600 }}>
              Hi! I'm <span style={{
                background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }} className="relative inline-block">Joshua</span>
              {/* Arrow pointing to image - desktop only */}
              <svg 
                className="hidden lg:block absolute -top-8 -right-24 w-96 h-32"
                viewBox="-180 0 430 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible', filter: 'drop-shadow(0 0 8px rgba(224, 164, 255, 0.4))' }}
              >
                {/* Main curved arrow line with loop-de-loop */}
              <path 
                d="
                M -124 43 Q 30 5 100 54 C 128 70 112 118 53 90 Q 9 59 90 39 Q 190 24 223 79 M 241 103 L 237 69 M 241 103 L 212 91"
                stroke="#E0A4FF"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              </svg>
              ,  <br />
              I design & develop with <span style={{
                background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>intent</span>.
            </h1>
            <p className="text-muted-foreground max-w-3xl mb-12 text-xl sm:text-2xl leading-relaxed" style={{ fontWeight: 500 }}>
              I create beautiful, functional digital experiences that help businesses grow and users thrive. 
              Passionate about clean code and thoughtful design.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button size="lg" onClick={scrollToContact} className="text-lg px-8 py-6">
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("projects");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-lg px-8 py-6"
              >
                View My Work
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-shrink-0 relative">
            {/* Curved text around the image */}
            <svg 
              className="absolute -inset-8 sm:-inset-12 lg:-inset-16 w-[calc(100%+4rem)] sm:w-[calc(100%+6rem)] lg:w-[calc(100%+8rem)] h-[calc(100%+4rem)] sm:h-[calc(100%+6rem)] lg:h-[calc(100%+8rem)] pointer-events-none z-20"
              viewBox="0 0 400 400"
              style={{ filter: 'drop-shadow(0 0 6px rgba(224, 164, 255, 0.5))' }}
            >
              <defs>
                <path
                  id="circlePath1"
                  d="M 200, 200 m -180, 0 a 180,180 0 1,1 360,0 a 180,180 0 1,1 -360,0"
                />
                {/* Reverse path for bottom text to be readable */}
                <path
                  id="circlePathReverse"
                  d="M 200, 200 m 180, 0 a 180,180 0 0,0 -360,0 a 180,180 0 0,0 360,0"
                />
              </defs>
              {/* "Joshua Brown" at the bottom, readable */}
              <text fill="#E0A4FF" fontSize="26" fontWeight="600" letterSpacing="2" fontFamily="Poppins, sans-serif">
                <textPath href="#circlePathReverse" startOffset="57%">
                  Joshua Brown
                </textPath>
              </text>
              {/* "- BSc Computer Science Student (QUB)" starting from top going around */}
              <text fill="#E0A4FF" fontSize="22" fontWeight="500" letterSpacing="2" fontFamily="Poppins, sans-serif">
                <textPath href="#circlePath1" startOffset="20%">
                  BSc Computer Science Student (QUB)
                </textPath>
              </text>
            </svg>

            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary relative z-10"
              style={{ boxShadow: '0 0 30px rgba(224, 164, 255, 0.4), 0 0 60px rgba(224, 164, 255, 0.2)' }}
            >
              <img 
                src={profilePhoto} 
                alt="Joshua - Portfolio Photo" 
                className="w-full h-full object-cover"
                style={{ objectPosition: '60% 50%' }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 to-blue-600/15 rounded-full blur-2xl -z-10 scale-110"></div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-10 animate-bounce text-center">
          <ArrowDown className="w-8 h-8 mx-auto text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
