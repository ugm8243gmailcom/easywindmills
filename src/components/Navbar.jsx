import { useState, useEffect } from 'react';

export default function Navbar({ currentPage, activeSection, onNavigate, onReplayTransition }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  const isExploreActive = currentPage === 'explore-windmills';
  const isHomeActive = currentPage === 'home' && (!activeSection || activeSection === 'home');

  return (
    <header className={`transparent-nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand */}
        <a 
          href="#home" 
          className="nav-brand"
          onClick={(e) => { 
            e.preventDefault(); 
            handleNavClick('home'); 
          }}
          aria-label="EasyWindmill Home"
        >
          <span className="brand-turbine-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 12V3C13.5 6 13.5 9 12 12Z" fill="currentColor"/>
              <path d="M12 12L4.2 16.5C6.8 15 9.4 15 12 12Z" fill="currentColor"/>
              <path d="M12 12L19.8 16.5C17.2 15 14.6 15 12 12Z" fill="currentColor"/>
              <circle cx="12" cy="12" r="2.2" fill="currentColor"/>
            </svg>
          </span>
          <span className="brand-wordmark">
            Easy<span className="brand-accent">Windmill</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-menu" aria-label="Main Navigation">
          <ul className="nav-links-list">
            <li>
              <button 
                type="button"
                className={`nav-link-btn ${isHomeActive ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
                aria-current={isHomeActive ? 'page' : undefined}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                type="button"
                className={`nav-link-btn ${currentPage === 'explore-windmills' ? 'active' : ''}`}
                onClick={() => handleNavClick('explore-windmills')}
                aria-current={currentPage === 'explore-windmills' ? 'page' : undefined}
              >
                Explore Windmills
                <span className="nav-badge-tag">3D Catalog</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                className={`nav-link-btn ${currentPage === 'advanced-turbine-tech' ? 'active' : ''}`}
                onClick={() => handleNavClick('advanced-turbine-tech')}
                aria-current={currentPage === 'advanced-turbine-tech' ? 'page' : undefined}
              >
                Advanced Turbine Tech
              </button>
            </li>
            <li>
              <button 
                type="button"
                className={`nav-link-btn ${currentPage === 'study-material' ? 'active' : ''}`}
                onClick={() => handleNavClick('study-material')}
                aria-current={currentPage === 'study-material' ? 'page' : undefined}
              >
                Study Material
              </button>
            </li>
            <li>
              <button 
                type="button"
                className={`nav-link-btn ${currentPage === 'home' && activeSection === 'learn' ? 'active' : ''}`}
                onClick={() => handleNavClick('learn')}
              >
                Learn
              </button>
            </li>
            <li>
              <button 
                type="button"
                className={`nav-link-btn ${currentPage === 'home' && activeSection === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Actions: Mobile Toggle Button */}
        <div className="nav-right-actions">
          {/* Mobile Menu Toggle Button */}
          <button 
            type="button"
            className={`mobile-burger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="burger-line line-1" />
            <span className="burger-line line-2" />
          </button>
        </div>
      </div>

      {/* Mobile Floating Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-transparent-menu">
          <ul className="mobile-menu-list">
            <li>
              <button
                type="button"
                className={`mobile-menu-btn ${isHomeActive ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`mobile-menu-btn ${currentPage === 'explore-windmills' ? 'active' : ''}`}
                onClick={() => handleNavClick('explore-windmills')}
              >
                <span>Explore Windmills</span>
                <span className="nav-badge-tag">3D Catalog</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`mobile-menu-btn ${currentPage === 'advanced-turbine-tech' ? 'active' : ''}`}
                onClick={() => handleNavClick('advanced-turbine-tech')}
              >
                <span>Advanced Turbine Tech</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`mobile-menu-btn ${currentPage === 'study-material' ? 'active' : ''}`}
                onClick={() => handleNavClick('study-material')}
              >
                <span>Study Material</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`mobile-menu-btn ${currentPage === 'home' && activeSection === 'learn' ? 'active' : ''}`}
                onClick={() => handleNavClick('learn')}
              >
                Learn Mechanics
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`mobile-menu-btn ${currentPage === 'home' && activeSection === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About and Creator
              </button>
            </li>
            <li>
              <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => handleNavClick('privacy')}
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => handleNavClick('terms')}
              >
                Terms and Conditions
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
