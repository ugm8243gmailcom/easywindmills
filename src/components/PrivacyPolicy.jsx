import { CREATOR_CONFIG } from '../config/creator';

export default function PrivacyPolicy({ onBackToHome }) {
  return (
    <div className="legal-page">
      <div className="content-container legal-container">
        {/* Navigation Breadcrumb */}
        <div className="page-breadcrumbs-bar">
          <button
            type="button"
            className="back-btn back-btn--home"
            onClick={onBackToHome}
            aria-label="Return to EasyWindmill Home Page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back to Home</span>
          </button>

          <div className="breadcrumb-trail">
            <button type="button" className="breadcrumb-link" onClick={onBackToHome}>Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Privacy Policy</span>
          </div>
        </div>

        {/* Legal Document Card */}
        <article className="frosted-panel legal-document-card">
          <div className="legal-header">
            <span className="legal-kicker">LEGAL COMPLIANCE</span>
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-effective">Last updated: October 2026</p>
          </div>

          <div className="legal-body">
            <section className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                EasyWindmill is an open educational platform created by {CREATOR_CONFIG.name} to demonstrate
                industrial wind turbine engineering, aerodynamic principles, and mechanical power conversion.
                We value your privacy and are committed to full transparency regarding data handling.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Information Collection</h2>
              <p>
                EasyWindmill does not require user registration, account creation, or payment credentials.
                We do not collect personal identifiers such as names, postal addresses, or financial information.
              </p>
              <p>
                If you choose to contact the project lead via email ({CREATOR_CONFIG.email}), your email address
                and correspondence will only be used to respond directly to your technical inquiry or feedback.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Analytics and Tracking</h2>
              <p>
                This website does not employ third-party advertising trackers, cross-site tracking pixels, or data
                broker analytics scripts. Local browser memory may temporarily cache 3D explosion animation frames
                to provide smooth 30 FPS playback during your active session.
              </p>
            </section>

            <section className="legal-section">
              <h2>4. External Links and Media</h2>
              <p>
                The platform may contain links to external engineering references, GitHub repositories, or technical
                documentation. EasyWindmill has no control over the privacy practices or content of third-party websites.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Contact Information</h2>
              <p>
                For questions regarding this Privacy Policy or the educational contents of the platform, contact:
              </p>
              <p className="legal-contact-line">
                Project Lead: {CREATOR_CONFIG.name}<br />
                Email: <a href={`mailto:${CREATOR_CONFIG.email}`}>{CREATOR_CONFIG.email}</a>
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
