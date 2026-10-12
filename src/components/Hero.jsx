import { MEDIA_CONFIG } from '../config/media';

export default function Hero({ onExploreClick }) {
  return (
    <section className="hero-viewport" id="home">
      <div className="content-container hero-container">
        {/* Understated introductory header positioned in the calm upper sky area */}
        <div className="hero-header-box">
          <h1 className="hero-headline">{MEDIA_CONFIG.headline}</h1>
          <p className="hero-subline">{MEDIA_CONFIG.subline}</p>
        </div>

        {/* Clear center area allows turbines to rotate freely without obstruction */}
        <div className="hero-open-vista" aria-hidden="true" />

        {/* Subtle, restrained scroll prompt at bottom */}
        <div className="hero-bottom-bar">
          <button 
            type="button" 
            className="scroll-hint-btn" 
            onClick={onExploreClick}
            aria-label="Scroll to understanding wind energy section"
          >
            <span>Explore technology</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
