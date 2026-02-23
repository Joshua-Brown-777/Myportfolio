import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { WavyText } from "./WavyText";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const projects = [
  {
    id: "3d-modeling",
    title: "3D Modeling",
    description: "Messing around a bunch with Blender for personal projects and general development. Focusing on low-poly aesthetics and procedural generation.",
    image: "https://i.postimg.cc/Z5Z8YDt3/Valentine.png",
    tags: ["Blender", "3D Art", "Modeling"],
    github: "#",
    showFullImage: false
  },
  {
    id: "catan-group-project",
    title: "Industrialists of Tempra",
    description: "Developing from end designs and implementation for a Catan Inspired, Climate Change focused board game alongside others for a group project.",
    image: "https://i.postimg.cc/5yBZvksZ/tempra.png",
    tags: ["Java", "VSCode"],
    github: "#",
    showFullImage: false
  },
  {
    id: "snake-quiz-game",
    title: "Snake + Quiz Game",
    description: "An application with a retro vibe, created for my Lower Sixth Coursework. Combines classic gameplay with educational elements.",
    image: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnh1cTN0Z3FyZTJodnBiZnUwNWZtejA3a3g2MGtpNzNqcW02MXJ0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QXfFauCUlD7gPpiGrc/giphy.gif",
    tags: ["C#", "Winforms", "Solo Development", "Education - Yr13"],
    github: "#",
    showFullImage: true
  },
  {
    id: "spin-cycle-game",
    title: "Spin Cycle Game",
    description: "Designing and developing a Lua-based game with the LÖVE2D framework, bringing creative ideas to life through engaging UI and immersive player experiences.",
    image: "https://i.postimg.cc/SN42c2ZC/Pulley.png",
    tags: ["Lua", "Love2D", "Visual Studio Code"],
    github: "#",
    showFullImage: false
  }
  
];

export function ProjectList() {
  return (
    <section id="work" className="py-24 bg-black relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-purple-900/10)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="mb-4" style={{ color: 'transparent' }}>
            <WavyText text="Featured Work" large />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A deep dive into the projects I've built, ranging from game development to 3D modeling.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group relative bg-zinc-900/40 backdrop-blur-sm border-2 border-zinc-800 hover:border-purple-500/80 transition-all duration-500 overflow-hidden min-h-[350px]">
                {/* Gradient Border Glow Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/20 transition-all duration-500 pointer-events-none" />
                
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image Section */}
                  <div className={`w-full md:w-1/2 relative aspect-video md:aspect-auto overflow-hidden bg-zinc-950 border-b-2 md:border-b-0 ${index % 2 === 0 ? 'md:border-r-2' : 'md:border-l-2 md:order-last'} border-zinc-800 group-hover:border-purple-500/50 transition-colors duration-500`}>
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                        project.showFullImage ? 'object-contain p-4' : 'object-cover'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link to={`/project/${project.id}`}>
                        <Button variant="secondary" className="gap-2 bg-white text-black hover:bg-zinc-200">
                          View Project <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="bg-purple-950/30 text-purple-300 border border-purple-800/50 text-[10px] uppercase tracking-wider font-semibold px-2"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-zinc-400 text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-zinc-800 group-hover:border-purple-900/50 transition-colors">
                      <Link to={`/project/${project.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-500 hover:opacity-90 text-white border-0">
                          Full Case Study
                        </Button>
                      </Link>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="border-zinc-700 text-zinc-400 hover:text-white hover:border-purple-500">
                          <Github className="w-5 h-5" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
