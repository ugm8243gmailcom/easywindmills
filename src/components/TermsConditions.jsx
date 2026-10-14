import { CREATOR_CONFIG } from '../config/creator';

export default function TermsConditions({ onBackToHome }) {
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
            <span className="breadcrumb-current">Terms and Conditions</span>
          </div>
        </div>

        {/* Legal Document Card */}
        <article className="frosted-panel legal-document-card">
          <div className="legal-header">
            <span className="legal-kicker">USER AGREEMENT</span>
            <h1 className="legal-title">Terms and Conditions</h1>
            <p className="legal-effective">Last updated: October 2026</p>
          </div>

          <div className="legal-body">
            <section className="legal-section">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing and utilizing the EasyWindmill website and its interactive mechanical models, you agree
                to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you
                must discontinue use of the platform.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Educational Purpose and Engineering Disclaimer</h2>
              <p>
                EasyWindmill is developed exclusively for educational, instructional, and research visualization purposes.
                All 3D CAD frames, disassembly sequences, power curves, dimensions, and operational mechanisms reflect
                general engineering principles and should not be used as certified construction blueprints, architectural
                permitting packages, or site-specific manufacturing documents.
              </p>
              <p>
                Commercial wind energy installations require certified structural engineering calculations, local environmental
                assessments, geotechnical soil investigations, and manufacturer-certified documentation.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Intellectual Property and Permitted Use</h2>
              <p>
                The code, software architecture, technical schematics, and interactive presentation interfaces are the
                intellectual property of {CREATOR_CONFIG.name} and the EasyWindmill project contributors.
              </p>
              <p>
                Students, educators, and academic institutions are permitted to reference, study, and demonstrate the
                visualizations for non-commercial educational use provided attribution is maintained.
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Limitation of Liability</h2>
              <p>
                In no event shall the EasyWindmill project, its creator ({CREATOR_CONFIG.name}), or its contributors be liable
                for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use
                the educational materials, simulation data, or specifications provided on this platform.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Contact Information</h2>
              <p>
                For questions regarding these Terms and Conditions, reach out directly:
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
