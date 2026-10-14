import { CREATOR_CONFIG } from '../config/creator';

export default function AboutSection() {
  return (
    <section className="over-video-section" id="about" aria-label="About EasyWindmill and Creator">
      <div className="content-container">
        <div className="about-grid">
          {/* Project Mission Panel */}
          <div className="frosted-panel about-mission-panel">
            <div className="section-eyebrow">
              <span className="eyebrow-dot" />
              <span>PROJECT INITIATIVE</span>
            </div>
            <h2 className="section-title">About EasyWindmill</h2>
            <div className="about-body">
              <p>
                <strong>EasyWindmill</strong> is an educational initiative dedicated to making wind turbine technology
                straightforward, grounded in real engineering principles, and visually understandable.
              </p>
              <p>
                From aerodynamic lift on composite rotor blades to electromagnetic induction and active yaw orientation,
                the platform helps students and clean energy observers explore how wind kinetic energy is converted into usable electricity.
              </p>
              <div className="about-highlights-grid">
                <div className="about-highlight-box">
                  <div className="highlight-icon-wrap" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h4>Real Engineering</h4>
                  <p>Based on commercial multi-megawatt turbine specifications.</p>
                </div>
                <div className="about-highlight-box">
                  <div className="highlight-icon-wrap" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <h4>Interactive Anatomy</h4>
                  <p>Inspect exploded 3D assemblies and mechanical subsystems.</p>
                </div>
                <div className="about-highlight-box">
                  <div className="highlight-icon-wrap" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                      <path d="M2 17L12 22L22 17" />
                      <path d="M2 12L12 17L22 12" />
                    </svg>
                  </div>
                  <h4>Educational Focus</h4>
                  <p>Open technical reference for students and renewable energy advocates.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Creator Showcase Card */}
          <div className="frosted-panel creator-showcase-panel">
            <div className="creator-header">
              <div className="creator-avatar-wrap">
                <div className="creator-avatar">
                  <span className="creator-initials">{CREATOR_CONFIG.name.charAt(0)}</span>
                </div>
              </div>
              <div className="creator-title-group">
                <span className="creator-badge">Project Creator and Lead</span>
                <h3 className="creator-name">{CREATOR_CONFIG.name}</h3>
                <p className="creator-role">{CREATOR_CONFIG.role}</p>
              </div>
            </div>

            <p className="creator-bio">{CREATOR_CONFIG.bio}</p>

            <div className="creator-tags">
              {CREATOR_CONFIG.badges.map((b, i) => (
                <span key={i} className="creator-tag-badge">{b}</span>
              ))}
            </div>

            <div className="creator-contact-box">
              <h4 className="contact-box-title">Public Contact and Collaboration</h4>
              <div className="contact-links-list">
                {CREATOR_CONFIG.email && (
                  <a
                    href={CREATOR_CONFIG.links.email}
                    className="creator-link-item"
                    title={`Email ${CREATOR_CONFIG.name}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 6L12 13L2 6" />
                    </svg>
                    <span>{CREATOR_CONFIG.email}</span>
                  </a>
                )}
                {CREATOR_CONFIG.links.github && (
                  <a
                    href={CREATOR_CONFIG.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="creator-link-item"
                    title="GitHub Profile"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>Developer Portfolio and Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
