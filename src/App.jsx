import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VideoBackground from './components/VideoBackground';
import Hero from './components/Hero';
import ExploreParts from './components/ExploreParts';
import TopicsSection from './components/TopicsSection';
import LearnSection from './components/LearnSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showTransition, setShowTransition] = useState(true);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Synchronize active nav link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      const aboutEl = document.getElementById('about');
      const learnEl = document.getElementById('learn');
      const exploreEl = document.getElementById('explore');
      const topicsEl = document.getElementById('topics');

      if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else if (learnEl && scrollPos >= learnEl.offsetTop) {
        setActiveSection('learn');
      } else if (exploreEl && scrollPos >= exploreEl.offsetTop) {
        setActiveSection('explore');
      } else if (topicsEl && scrollPos >= topicsEl.offsetTop) {
        setActiveSection('topics');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* 1-second Page Transition with white windmill & right-to-left wind animation */}
      {showTransition && (
        <PageTransition onComplete={() => setShowTransition(false)} />
      )}

      {/* Video serves as the continuous background for the entire homepage */}
      <VideoBackground />

      {/* Floating capsule navigation bar */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
        onReplayTransition={() => setShowTransition(true)}
      />

      {/* Content flow positioned directly over the video */}
      <main className="main-content">
        <Hero onExploreClick={() => handleNavigate('explore')} />
        <ExploreParts />
        <TopicsSection />
        <LearnSection />
        <AboutSection />
      </main>

      {/* Footer terminates the page with a solid mountain-night foundation */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
