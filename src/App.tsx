import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ProjectList } from "./components/ProjectList";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ProjectDetail } from "./components/ProjectDetail";
import { LoadingScreen } from "./components/LoadingScreen";
import { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Delay scroll to allow animation to complete
      const timer = setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
        }
      }, 450); // Slightly longer than the 400ms animation
      
      return () => clearTimeout(timer);
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location]);

  return null;
}

function HomePage() {
  return (
    <>
      <Header />
      <motion.div 
        className="min-h-screen"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <main>
          <Hero />
          <About />
          <ProjectList />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}

function ProjectPage() {
  return (
    <>
      <Header />
      <motion.div 
        className="min-h-screen"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <ProjectDetail />
        <Footer />
      </motion.div>
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading - wait for initial content to be ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading screen for 2 seconds minimum

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div key="content">
            <ScrollToSection />
            <AnimatedRoutes />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}
