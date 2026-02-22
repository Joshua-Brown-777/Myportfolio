import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { WavyText } from "./WavyText";
import { YouTubePlayer } from "./YouTubePlayer";

const projects = [
  {
    id: "snake-quiz-game",
    title: "Snake + Quiz Game",
    description: "An application with a retro vibe, created for my Lower Sixth Coursework",
    image: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnh1cTN0Z3FyZTJodnBiZnUwNWZtejA3a3g2MGtpNzNqcW02MXJ0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QXfFauCUlD7gPpiGrc/giphy.gif",
    tags: ["C#", "Winforms", "Solo Development", "Education - Yr13"],
    github: "#",
    showFullImage: true,
    longDescription: "As part of my Software Systems Development (SSD) A Level, I was asked to create a game using the C# language, with the Winforms Framework, it included the following features:",
    features: [
      "User Authentication System: Implemented secure registration and login functionality with persistent user data storage, allowing multiple players to maintain individual profiles and track their progress",
      "Progressive Game Mechanics: Developed a dynamic difficulty system where Snake gameplay performance directly unlocks quiz hints, creating a unique hybrid gaming experience that rewards player skill with knowledge-based advantages",
      "Multi-Tier Leaderboard System: Built a comprehensive scoring infrastructure with difficulty-based rankings and persistent data storage, displaying top performers across four distinct difficulty levels while maintaining individual player statistics"
    ],
    technologies: "C# for backend, Winforms for front end, Google Docs for documentation",
    challenges: "Describe the main challenges you faced during development and how you overcame them.",
    outcome: "Describe the results and impact of the project."
  },
  {
    id: "mobile-fitness-app",
    title: "Spin Cycle Game",
    description: "Designing and developing a Lua-based game with the LÖVE2D framework, bringing creative ideas to life through engaging UI and immersive player experiences.",
    image: "https://img.youtube.com/vi/NH0NghaJhNU/maxresdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/NH0NghaJhNU",
    tags: ["Lua", "Love2D", "Visual Studio Code"],
    github: "#",
    showFullImage: false,
    longDescription: "Add detailed information about your mobile fitness app here. Explain your design decisions, technical architecture, and user experience considerations.",
    features: [
      "Feature 1: Describe a key feature",
      "Feature 2: Describe another feature",
      "Feature 3: Describe yet another feature"
    ],
    technologies: "React Native, TypeScript, Firebase for authentication and real-time database, React Navigation",
    challenges: "Describe the main challenges you faced during development and how you overcame them.",
    outcome: "Describe the results and impact of the project."
  },
  {
    id: "project-management-dashboard",
    title: "Project Management Dashboard",
    description: "Comprehensive dashboard for managing projects, teams, and tasks with real-time collaboration features.",
    image: "https://images.unsplash.com/photo-1758598497485-300d809e55ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MTY1MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Vue.js", "GraphQL", "PostgreSQL"],
    github: "#",
    showFullImage: false,
    longDescription: "Add detailed information about your project management dashboard here. Discuss the user needs you addressed and the technical solutions you implemented.",
    features: [
      "Feature 1: Describe a key feature",
      "Feature 2: Describe another feature",
      "Feature 3: Describe yet another feature"
    ],
    technologies: "Vue.js, GraphQL, Apollo Client, PostgreSQL, Tailwind CSS",
    challenges: "Describe the main challenges you faced during development and how you overcame them.",
    outcome: "Describe the results and impact of the project."
  }
];

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);

  // Scroll to top when the component mounts or projectId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Project not found</h2>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/#projects">
          <Button variant="outline" className="mb-10 text-base">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Projects
          </Button>
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="mb-6"><WavyText text={project.title} large /></h1>
          <p className="text-muted-foreground mb-8 text-lg">{project.description}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-base px-4 py-1.5">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="text-base">
              <ExternalLink className="w-5 h-5 mr-2" />
              Live Demo
            </Button>
            <Button variant="outline" className="text-base">
              <Github className="w-5 h-5 mr-2" />
              View Code
            </Button>
          </div>
        </div>

        {/* Project Image/Video */}
        <div className="flex justify-center mb-12">
          <div className="overflow-hidden rounded-lg bg-accent max-w-2xl w-full">
            {project.videoEmbed ? (
              <div className="aspect-video">
                <YouTubePlayer
                  videoId="NH0NghaJhNU"
                  className="w-full h-full"
                  autoplay={true}
                  loop={true}
                  muted={true}
                  controls={false}
                />
              </div>
            ) : (
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-auto h-auto max-w-full"
              />
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-16">
          {/* Overview */}
          <section>
            <h2 className="mb-6">Overview</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{project.longDescription}</p>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="mb-6">Key Features</h2>
            <ul className="space-y-4 text-muted-foreground text-lg">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-3 text-xl">•</span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technologies Used */}
          <section>
            <h2 className="mb-6">Technologies Used</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{project.technologies}</p>
          </section>

          {/* Challenges & Solutions */}
          <section>
            <h2 className="mb-6">Challenges & Solutions</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{project.challenges}</p>
          </section>

          {/* Outcome */}
          <section>
            <h2 className="mb-6">Outcome</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{project.outcome}</p>
          </section>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-16 pt-12 border-t border-border">
          <Link to="/#projects">
            <Button variant="outline" className="text-base">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
