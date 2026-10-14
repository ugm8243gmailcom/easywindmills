import { CREATOR_CONFIG } from '../config/creator';

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="content-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-brand-title-wrap">
              <span className="footer-brand-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12V3C13.5 6 13.5 9 12 12Z" fill="currentColor"/>
                  <path d="M12 12L4.2 16.5C6.8 15 9.4 15 12 12Z" fill="currentColor"/>
                  <path d="M12 12L19.8 16.5C17.2 15 14.6 15 12 12Z" fill="currentColor"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
              </span>
              <h3 className="footer-title">EasyWindmill</h3>
            </div>
            <p className="footer-desc">
              An interactive educational platform dedicated to clear, accessible explanations of modern wind turbine engineering and clean power generation.
            </p>
            <p className="footer-creator-line">
              Created and developed by <strong className="creator-highlight">{CREATOR_CONFIG.name}</strong>. Open educational initiative.
            </p>
          </div>

          <div className="footer-columns-group">
            <div className="footer-col">
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-nav" aria-label="Navigation links">
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => onNavigate('home')}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => onNavigate('explore-windmills')}
                  >
                    Turbine Catalog
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => onNavigate('learn')}
                  >
                    Turbine Mechanics
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => onNavigate('about')}
                  >
                    About Project
                  </button>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Legal and Privacy</h4>
              <ul className="footer-nav" aria-label="Legal links">
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => onNavigate('privacy')}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => onNavigate('terms')}
                  >
                    Terms and Conditions
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EasyWindmill. Designed and developed by {CREATOR_CONFIG.name}.</p>
          <div className="footer-bottom-links">
            <button
              type="button"
              className="footer-bottom-link"
              onClick={() => onNavigate('privacy')}
            >
              Privacy Policy
            </button>
            <span className="footer-dot-divider">/</span>
            <button
              type="button"
              className="footer-bottom-link"
              onClick={() => onNavigate('terms')}
            >
              Terms and Conditions
            </button>
            <span className="footer-dot-divider">/</span>
            <span className="footer-status-indicator">
              <span className="footer-status-dot" />
              CAD Model Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
