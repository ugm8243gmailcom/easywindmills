import { useState, useEffect } from 'react';

export default function Navbar({ activeSection, onNavigate, onReplayTransition }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`floating-nav-wrapper ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-capsule">
        {/* Brand */}
        <a 
          href="#home" 
          className="brand-pill"
          onClick={(e) => { 
            e.preventDefault(); 
            handleNavClick('home'); 
          }}
          aria-label="EasyWindmill Home"
        >
          <span className="brand-turbine-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 12V3C13.5 6 13.5 9 12 12Z" fill="currentColor"/>
              <path d="M12 12L4.2 16.5C6.8 15 9.4 15 12 12Z" fill="currentColor"/>
              <path d="M12 12L19.8 16.5C17.2 15 14.6 15 12 12Z" fill="currentColor"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
          </span>
          <span className="brand-wordmark">EasyWindmill</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav-menu" aria-label="Main Navigation">
          <ul className="nav-pill-list">
            <li>
              <button 
                type="button"
                className={`nav-pill-btn ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
                aria-current={activeSection === 'home' ? 'page' : undefined}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                type="button"
                className={`nav-pill-btn ${activeSection === 'learn' ? 'active' : ''}`}
                onClick={() => handleNavClick('learn')}
              >
                Learn
              </button>
            </li>
            <li>
              <button 
                type="button"
                className={`nav-pill-btn ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About
              </button>
            </li>
            <li>
              <button 
                type="button"
                className={`nav-pill-btn ${activeSection === 'explore' ? 'active' : ''}`}
                onClick={() => handleNavClick('explore')}
                aria-current={activeSection === 'explore' ? 'page' : undefined}
              >
                Explore Parts
                <span className="pill-dot-tag pill-dot-tag--interactive">3D</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Toggle Button */}
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

      {/* Mobile Floating Dropdown Card */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-card">
          <ul className="mobile-card-list">
            <li>
              <button
                type="button"
                className={`mobile-card-item ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`mobile-card-item ${activeSection === 'learn' ? 'active' : ''}`}
                onClick={() => handleNavClick('learn')}
              >
                Learn
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`mobile-card-item ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`mobile-card-item ${activeSection === 'explore' ? 'active' : ''}`}
                onClick={() => handleNavClick('explore')}
              >
                Explore Parts (3D)
                <span className="pill-dot-tag pill-dot-tag--interactive">Interactive</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
