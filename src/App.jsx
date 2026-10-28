import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import ThreeWindmillsBackground from './components/ThreeWindmillsBackground';
import Hero from './components/Hero';
import ExploreWindmillsPage from './components/ExploreWindmillsPage';
import AdvancedTurbineTechPage from './components/AdvancedTurbineTechPage';
import StudyMaterialPage from './components/StudyMaterialPage';
import TopicsSection from './components/TopicsSection';
import LearnSection from './components/LearnSection';
import AboutSection from './components/AboutSection';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import { TURBINE_MODELS } from './data/turbinesData';

export default function App() {
  // Routing state: 'home' | 'explore-windmills' | 'advanced-turbine-tech' | 'study-material' | 'privacy' | 'terms'
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('privacy') || hash.includes('privacy')) return 'privacy';
      if (path.includes('terms') || hash.includes('terms')) return 'terms';
      if (path.includes('advanced') || hash.includes('advanced')) return 'advanced-turbine-tech';
      if (path.includes('study') || hash.includes('study')) return 'study-material';
      if (path.includes('explore') || hash.includes('explore')) return 'explore-windmills';
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState('home');
  const [showTransition, setShowTransition] = useState(true);
  const [transitionKey, setTransitionKey] = useState(1);
  const transitionTimerRef = useRef(null);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      let target = 'home';
      if (path.includes('privacy') || hash.includes('privacy')) {
        target = 'privacy';
      } else if (path.includes('terms') || hash.includes('terms')) {
        target = 'terms';
      } else if (path.includes('advanced') || hash.includes('advanced')) {
        target = 'advanced-turbine-tech';
      } else if (path.includes('study') || hash.includes('study')) {
        target = 'study-material';
      } else if (path.includes('explore') || hash.includes('explore')) {
        target = 'explore-windmills';
      }

      if (target !== currentPage) {
        // Trigger uniform transition on browser back/forward navigation
        setTransitionKey((k) => k + 1);
        setShowTransition(true);
        setTimeout(() => {
          setCurrentPage(target);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 450);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [currentPage]);

  // Unified page transition navigator: plays full windmill animation before opening target page
  const navigateWithTransition = useCallback((targetPage, pushPath, inPageTarget = null) => {
    if (currentPage === targetPage) {
      if (inPageTarget) {
        const el = document.getElementById(inPageTarget);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(inPageTarget);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Trigger full 1-second windmill transition page
    setTransitionKey((k) => k + 1);
    setShowTransition(true);

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    // At 450ms (transition screen fully opaque), switch view and reset scroll
    transitionTimerRef.current = setTimeout(() => {
      setCurrentPage(targetPage);
      try {
        if (pushPath) window.history.pushState(null, '', pushPath);
      } catch {
        if (pushPath) window.location.hash = `#${pushPath}`;
      }
      window.scrollTo({ top: 0, behavior: 'instant' });

      if (inPageTarget) {
        setTimeout(() => {
          const el = document.getElementById(inPageTarget);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(inPageTarget);
        }, 100);
      } else {
        setActiveSection(targetPage);
      }
    }, 450);
  }, [currentPage]);

  const handleNavigate = (target) => {
    if (target === 'explore-windmills' || target === 'explore') {
      navigateWithTransition('explore-windmills', '/explore');
      return;
    }

    if (target === 'advanced-turbine-tech' || target === 'advanced') {
      navigateWithTransition('advanced-turbine-tech', '/advanced');
      return;
    }

    if (target === 'study-material' || target === 'study') {
      navigateWithTransition('study-material', '/study');
      return;
    }

    if (target === 'privacy') {
      navigateWithTransition('privacy', '/privacy');
      return;
    }

    if (target === 'terms') {
      navigateWithTransition('terms', '/terms');
      return;
    }

    if (target === 'home') {
      navigateWithTransition('home', '/');
      setActiveSection('home');
      return;
    }

    // In-page section on home (e.g. 'learn', 'about', 'topics')
    if (currentPage !== 'home') {
      navigateWithTransition('home', '/', target);
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(target);
    }
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
      {/* Page Transition with wind & windmill animation for every page navigation */}
      {showTransition && (
        <PageTransition 
          key={transitionKey} 
          onComplete={() => setShowTransition(false)} 
        />
      )}

      {/* WebGL 3D dynamic scenic background (7 organic wind turbines on ridge) */}
      <ThreeWindmillsBackground />

      {/* Transparent Navigation Bar */}
      <Navbar 
        currentPage={currentPage}
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
        onReplayTransition={() => {
          setTransitionKey((k) => k + 1);
          setShowTransition(true);
        }}
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
                        <span>TURBINE CLASSIFICATIONS</span>
                      </div>
                      <h2 className="section-title">Wind Turbine Architecture and Classifications</h2>
                      <p className="teaser-subtitle">
                        Explore core turbine classifications spanning aerodynamic rotor orientation, mechanical drivetrains, generator technologies, and installation environments.
                      </p>
                    </div>

                    <div className="teaser-actions-group">
                      <button
                        type="button"
                        className="view-all-turbines-btn"
                        onClick={() => handleNavigate('explore-windmills')}
                      >
                        <span>Explore Technical Catalogue</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
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
                          <span className="mini-card-power">{turbine.groupName.split(':')[0]}</span>
                          {turbine.isExplosionActive && (
                            <span className="mini-card-badge">3D Disassembly Active</span>
                          )}
                        </div>
                        <div className="mini-card-body">
                          <span className="mini-card-cat">{turbine.categoryLabel}</span>
                          <h4 className="mini-card-title">{turbine.name}</h4>
                          <p className="mini-card-desc">{turbine.subtitle}</p>
                          <div className="mini-card-footer">
                            <span className="mini-card-link">
                              {turbine.isExplosionActive ? 'Inspect 3D disassembly →' : 'View classification details →'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Portal to Advanced Tech & Study Material */}
                  <div className="home-hub-portals">
                    <div 
                      className="hub-portal-card"
                      onClick={() => handleNavigate('advanced-turbine-tech')}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="portal-icon-wrap">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                      </div>
                      <div className="portal-text">
                        <h4>Advanced Turbine Tech</h4>
                        <p>Explore unconventional designs: Counter-rotating VAWTs, Variable-pitch Giromills, Ø-Rotors, and Magnus-effect turbines.</p>
                        <span className="portal-link-text">Inspect unconventional designs →</span>
                      </div>
                    </div>

                    <div 
                      className="hub-portal-card"
                      onClick={() => handleNavigate('study-material')}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="portal-icon-wrap">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      </div>
                      <div className="portal-text">
                        <h4>Academic Study Material</h4>
                        <p>Access peer-reviewed research and review papers across aerodynamics, electromechanics, and grid stability.</p>
                        <span className="portal-link-text">Browse literature compendium →</span>
                      </div>
                    </div>
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

        {currentPage === 'advanced-turbine-tech' && (
          <AdvancedTurbineTechPage 
            onBackToHome={() => handleNavigate('home')}
            onNavigateStudyMaterial={() => handleNavigate('study-material')}
          />
        )}

        {currentPage === 'study-material' && (
          <StudyMaterialPage 
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
