import { Code2, Palette, Smartphone, Database, Globe, Rocket } from "lucide-react";
import { WavyText } from "./WavyText";
import { useState } from "react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Developing responsive and visually engaging user interfaces with a strong focus on performance and accessibility. Experienced in building interactive WinForms applications and crafting modern web interfaces using JavaScript, HTML, and CSS.",
    technologies: ["WinForms", "JavaScript", "HTML", "CSS", "React"]
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Designing and maintaining robust backend systems with a focus on scalability and data integrity. Skilled in managing SQL databases using PHPMyAdmin and developing backend logic and APIs in Java.",
    technologies: ["PHPMyAdmin", "Java", "SQL"]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive, user-centered designs that balance aesthetics with usability. Experienced in prototyping and collaborating with stakeholders to refine design solutions using Figma, Office 365, and Google Workspace.",
    technologies: ["Figma", "Office 365", "Google Workspace", "User Feedback"]
  }
];

export function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black via-purple-950/40 to-black relative overflow-hidden">
      {/* Colorful accent orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <style>{`
        @keyframes iconShake {
          0%, 100% { transform: rotate(0deg) scale(1.1); }
          10% { transform: rotate(-3deg) scale(1.1); }
          20% { transform: rotate(3deg) scale(1.1); }
          30% { transform: rotate(-3deg) scale(1.1); }
          40% { transform: rotate(3deg) scale(1.1); }
          50% { transform: rotate(0deg) scale(1.1); }
          60% { transform: rotate(-2deg) scale(1.1); }
          70% { transform: rotate(2deg) scale(1.1); }
          80% { transform: rotate(0deg) scale(1.1); }
        }
        
        .icon-shake {
          animation: iconShake 1.2s ease-in-out;
        }
        
        .icon-container {
          transition: all 0.5s ease;
        }
        
        .icon-container.hovered {
          transform: scale(1.15);
          background: linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%) !important;
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.5);
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="mb-4" style={{ color: 'transparent' }}><WavyText text="Skills & Expertise" large /></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of skills developed through years of hands-on experience and continuous learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                className="p-6 rounded-lg transition-all bg-black/50 backdrop-blur-sm"
                style={{
                  border: isHovered ? '2px solid rgba(224, 164, 255, 0.6)' : '2px solid rgba(181, 101, 255, 0.3)',
                  transition: 'all 0.4s ease',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: isHovered ? '0 12px 28px rgba(168, 85, 247, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`icon-container w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isHovered ? 'hovered' : ''}`}
                  style={{
                    background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)'
                  }}
                >
                  <Icon 
                    className={`w-6 h-6 text-white ${isHovered ? 'icon-shake' : ''}`}
                    style={{ transition: 'all 0.5s ease' }}
                  />
                </div>
                <h3 className="mb-2" style={{
                  background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>{skill.title}</h3>
                <p className="text-muted-foreground mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
