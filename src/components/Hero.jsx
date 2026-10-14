import { MEDIA_CONFIG } from '../config/media';

export default function Hero({ onExploreWindmills, onLearnMore }) {
  return (
    <section className="hero-viewport" id="home">
      <div className="content-container hero-container">
        {/* Understated introductory header positioned in the calm upper sky area */}
        <div className="hero-header-box">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            <span>CLEAN ENERGY ENGINEERING</span>
          </div>
          <h1 className="hero-headline">{MEDIA_CONFIG.headline}</h1>
          <p className="hero-subline">{MEDIA_CONFIG.subline}</p>

          <div className="hero-actions-group">
            <button
              type="button"
              className="hero-primary-btn"
              onClick={onExploreWindmills}
              aria-label="Explore wind turbine models and 3D internal anatomy"
            >
              <span className="btn-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12V3C13.5 6 13.5 9 12 12Z" fill="currentColor"/>
                  <path d="M12 12L4.2 16.5C6.8 15 9.4 15 12 12Z" fill="currentColor"/>
                  <path d="M12 12L19.8 16.5C17.2 15 14.6 15 12 12Z" fill="currentColor"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
              </span>
              <span>Explore Windmills</span>
              <span className="hero-btn-badge">3D Anatomy</span>
            </button>

            <button
              type="button"
              className="hero-secondary-btn"
              onClick={onLearnMore}
              aria-label="Learn how wind energy works"
            >
              <span>How It Works</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Clear center area allows turbines to rotate freely without obstruction */}
        <div className="hero-open-vista" aria-hidden="true" />

        {/* Subtle, restrained scroll prompt at bottom */}
        <div className="hero-bottom-bar">
          <button 
            type="button" 
            className="scroll-hint-btn" 
            onClick={onLearnMore}
            aria-label="Scroll to understanding wind energy section"
          >
            <span>Scroll to learn wind principles</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
