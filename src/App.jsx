import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VideoBackground from './components/VideoBackground';
import Hero from './components/Hero';
import ExploreWindmillsPage from './components/ExploreWindmillsPage';
import TopicsSection from './components/TopicsSection';
import LearnSection from './components/LearnSection';
import AboutSection from './components/AboutSection';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import { TURBINE_MODELS } from './data/turbinesData';

export default function App() {
  // Routing state: 'home' | 'explore-windmills' | 'privacy' | 'terms'
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('privacy') || hash.includes('privacy')) return 'privacy';
      if (path.includes('terms') || hash.includes('terms')) return 'terms';
      if (path.includes('explore') || hash.includes('explore')) return 'explore-windmills';
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState('home');
  const [showTransition, setShowTransition] = useState(true);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('privacy') || hash.includes('privacy')) {
        setCurrentPage('privacy');
      } else if (path.includes('terms') || hash.includes('terms')) {
        setCurrentPage('terms');
      } else if (path.includes('explore') || hash.includes('explore')) {
        setCurrentPage('explore-windmills');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleNavigate = (target) => {
    if (target === 'explore-windmills' || target === 'explore') {
      setCurrentPage('explore-windmills');
      try {
        window.history.pushState(null, '', '/explore');
      } catch {
        window.location.hash = '#/explore';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'privacy') {
      setCurrentPage('privacy');
      try {
        window.history.pushState(null, '', '/privacy');
      } catch {
        window.location.hash = '#/privacy';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'terms') {
      setCurrentPage('terms');
      try {
        window.history.pushState(null, '', '/terms');
      } catch {
        window.location.hash = '#/terms';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'home') {
      setCurrentPage('home');
      try {
        window.history.pushState(null, '', '/');
      } catch {
        window.location.hash = '';
      }
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // In-page section on home (e.g. 'learn', 'about', 'topics')
    if (currentPage !== 'home') {
      setCurrentPage('home');
      try {
        window.history.pushState(null, '', '/');
      } catch {
        window.location.hash = '';
      }
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveSection(target);
  };

  // Synchronize active nav link based on scroll position when on home page
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      const aboutEl = document.getElementById('about');
      const learnEl = document.getElementById('learn');
      const topicsEl = document.getElementById('topics');

      if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else if (learnEl && scrollPos >= learnEl.offsetTop) {
        setActiveSection('learn');
      } else if (topicsEl && scrollPos >= topicsEl.offsetTop) {
        setActiveSection('topics');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <div className={`app-container page-${currentPage}`}>
      {/* 1-second Page Transition with white windmill animation */}
      {showTransition && (
        <PageTransition onComplete={() => setShowTransition(false)} />
      )}

      {/* Video continuous scenic background */}
      <VideoBackground />

      {/* Transparent Navigation Bar */}
      <Navbar 
        currentPage={currentPage}
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
        onReplayTransition={() => setShowTransition(true)}
      />

      {/* Content flow */}
      <main className="main-content">
        {currentPage === 'home' && (
          <>
            <Hero 
              onExploreWindmills={() => handleNavigate('explore-windmills')} 
              onLearnMore={() => handleNavigate('topics')}
            />

            {/* Featured Windmills Preview Teaser on Home */}
            <section className="over-video-section home-turbines-teaser" id="featured-models">
              <div className="content-container">
                <div className="frosted-panel teaser-panel">
                  <div className="teaser-header-row">
                    <div>
                      <div className="section-eyebrow">
                        <span className="eyebrow-dot" />
                        <span>TURBINE SELECTION</span>
                      </div>
                      <h2 className="section-title">Commercial Wind Turbine Models</h2>
                      <p className="teaser-subtitle">
                        From 3.2 MW onshore turbines with 50-frame exploded 3D disassembly to 8.0 MW deep-sea offshore models.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="view-all-turbines-btn"
                      onClick={() => handleNavigate('explore-windmills')}
                    >
                      <span>Explore Turbine Catalog</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Clean Technical Previews */}
                  <div className="teaser-cards-grid">
                    {TURBINE_MODELS.slice(0, 3).map((turbine) => (
                      <div
                        key={turbine.id}
                        className="teaser-mini-card"
                        onClick={() => handleNavigate('explore-windmills')}
                        role="button"
                        tabIndex={0}
                        aria-label={`Inspect ${turbine.name}`}
                      >
                        <div className="mini-card-thumb-wrap">
                          <img
                            src={turbine.image}
                            alt={turbine.name}
                            className="mini-card-thumb"
                            loading="lazy"
                          />
                          <span className="mini-card-power">{turbine.specs.ratedPower}</span>
                          {turbine.is3DReady && (
                            <span className="mini-card-badge">3D Disassembly</span>
                          )}
                        </div>
                        <div className="mini-card-body">
                          <span className="mini-card-cat">{turbine.categoryLabel}</span>
                          <h4 className="mini-card-title">{turbine.name}</h4>
                          <p className="mini-card-desc">{turbine.subtitle}</p>
                          <div className="mini-card-footer">
                            <span className="mini-card-link">Inspect parts and mechanics →</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <TopicsSection />
            <LearnSection />
            <AboutSection />
          </>
        )}

        {currentPage === 'explore-windmills' && (
          <ExploreWindmillsPage 
            onBackToHome={() => handleNavigate('home')} 
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicy 
            onBackToHome={() => handleNavigate('home')} 
          />
        )}

        {currentPage === 'terms' && (
          <TermsConditions 
            onBackToHome={() => handleNavigate('home')} 
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
