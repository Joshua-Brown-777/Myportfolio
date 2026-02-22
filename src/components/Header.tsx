import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

// CSS Class Constants - Semantic Naming
const styles = {
  headerContainer: "fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-purple-400/30",
  contentWrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  navBar: "flex justify-between items-center h-16",
  logoButton: "cursor-pointer",
  logoText: "text-muted-foreground text-xl italic",
  logoCapital: "text-2xl",
  desktopNav: "hidden md:flex items-center gap-8",
  navLink: "text-muted-foreground hover:text-primary transition-colors relative pb-1",
  navLinkActive: "text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary",
  mobileMenuToggle: "md:hidden p-2 text-foreground",
  menuIcon: "w-6 h-6",
  mobileNavContainer: "md:hidden py-4 border-t border-border",
  mobileNavList: "flex flex-col gap-4",
  mobileNavLink: "text-muted-foreground hover:text-primary transition-colors text-left",
  mobileNavLinkActive: "text-primary",
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const sections = ["hero", "about", "projects", "skills", "contact"];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-80px 0px -50% 0px",
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.navBar}>
          <div className={styles.logoButton} onClick={() => scrollToSection("hero")}>
            <span className={styles.logoText} style={{ letterSpacing: '0.05em' }}>
              <span className={styles.logoCapital} style={{ background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: '700' }}>J</span>oshua <span className={styles.logoCapital} style={{ background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: '700' }}>B</span>rown
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <button
              onClick={() => scrollToSection("about")}
              className={`${styles.navLink} ${activeSection === "about" ? styles.navLinkActive : ""}`}
            >
              About Me!
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`${styles.navLink} ${activeSection === "projects" ? styles.navLinkActive : ""}`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`${styles.navLink} ${activeSection === "skills" ? styles.navLinkActive : ""}`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`${styles.navLink} ${activeSection === "contact" ? styles.navLinkActive : ""}`}
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuToggle}
          >
            {mobileMenuOpen ? (
              <X className={styles.menuIcon} />
            ) : (
              <Menu className={styles.menuIcon} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className={styles.mobileNavContainer}>
            <div className={styles.mobileNavList}>
              <button
                onClick={() => scrollToSection("about")}
                className={`${styles.mobileNavLink} ${activeSection === "about" ? styles.mobileNavLinkActive : ""}`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className={`${styles.mobileNavLink} ${activeSection === "projects" ? styles.mobileNavLinkActive : ""}`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className={`${styles.mobileNavLink} ${activeSection === "skills" ? styles.mobileNavLinkActive : ""}`}
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`${styles.mobileNavLink} ${activeSection === "contact" ? styles.mobileNavLinkActive : ""}`}
              >
                Contact
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
