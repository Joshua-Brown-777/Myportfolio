import { ImageWithFallback } from "./figma/ImageWithFallback";
import { WavyText } from "./WavyText";

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black via-indigo-950/40 to-black relative overflow-hidden">
      {/* Colorful accent orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-600/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-pink-600/12 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6" style={{ color: 'transparent' }}><WavyText text="About Me" large /></h2>
            <p className="text-muted-foreground mb-4">
              I'm a <span style={{ 
                background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>passionate designer and developer</span> with over 5 years of experience creating 
              digital products that make a difference. My expertise spans from crafting intuitive 
              user interfaces to building robust web applications.
            </p>
            <p className="text-muted-foreground mb-4">
              I believe in the power of <span style={{ 
                background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>good design</span> to solve complex problems and create 
              delightful user experiences. When I'm not coding or designing, you can find me 
              exploring new technologies and contributing to open-source projects.
            </p>
            <p className="text-muted-foreground">
              Let's work together to <span style={{ 
                background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>bring your ideas to life!</span>
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted border-2 border-purple-400/40"
              style={{ boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)' }}
            >
              <ImageWithFallback
                src="https://i.postimg.cc/m2GcszCr/spiral.jpg"
                alt="Creative workspace"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/12 to-pink-600/12 -z-10 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
