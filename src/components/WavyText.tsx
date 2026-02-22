interface WavyTextProps {
  text: string;
  className?: string;
  large?: boolean;
}

export function WavyText({ text, className = "", large = false }: WavyTextProps) {
  // Generate wave keyframes - creates a smooth sine wave cycle
  const waveSteps = 72;
  const generateWaveKeyframes = () => {
    let keyframes = '';
    for (let i = 0; i <= waveSteps; i++) {
      const percentage = (i / waveSteps) * 100;
      const radians = (i / waveSteps) * Math.PI * 2;

      const offsetY = Math.sin(radians) * 8;
      const rotation = Math.sin(radians) * 2;

      keyframes += `${percentage.toFixed(2)}% { transform: translateY(${offsetY}px) rotate(${rotation}deg); }\n`;
    }
    return keyframes;
  };

  const characters = text.split('');
  const textLength = characters.length;

  return (
    <>
      <style>{`
        @keyframes wave-vertical-title {
          ${generateWaveKeyframes()}
        }
        
        .wavy-letter-gradient {
          display: inline-block;
          animation: wave-vertical-title 4s ease-in-out infinite;
          transform-origin: center bottom;
          background: linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      
      <span 
        className={className}
        style={{ 
          fontSize: large ? '3.5rem' : undefined,
          display: 'inline',
        }}
      >
        {characters.map((char, index) => {
          const delaySeconds = index * 0.1;
          // Calculate the background position for this letter to show the correct part of the gradient
          const backgroundPosition = `${(index / Math.max(textLength - 1, 1)) * 100}% 0`;
          const backgroundSize = `${textLength * 100}% 100%`;
          
          return (
            <span
              key={index}
              className="wavy-letter-gradient"
              style={{ 
                animationDelay: `${delaySeconds}s`,
                backgroundPosition,
                backgroundSize,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </span>
    </>
  );
}
