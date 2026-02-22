import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-purple-400/30 py-12 relative overflow-hidden">
      {/* Colorful ambient orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="mb-4" style={{
              background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Joshua Brown</h3>
            <p className="text-muted-foreground">
              I create <span style={{ 
                background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>beautiful, functional digital experiences</span> that help businesses grow and users thrive. 
              Passionate about clean code and thoughtful design.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4" style={{
              background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4" style={{
              background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Connect</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/Joshua-Brown-777"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:scale-110 transition-all"
                style={{ boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)' }}
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/joshua-brown-76bbb4386/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center hover:scale-110 transition-all"
                style={{ boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:joshuagbrown777@gmail.com"
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center hover:scale-110 transition-all"
                style={{ boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)' }}
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <a href="mailto:joshuagbrown777@gmail.com" className="hover:text-primary transition-colors">
                  joshuagbrown777@gmail.com
                </a>
              </p>
              <p className="text-muted-foreground">
                <a href="tel:+447706653835" className="hover:text-primary transition-colors">
                  +44 7706 653835
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} Joshua Brown. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
