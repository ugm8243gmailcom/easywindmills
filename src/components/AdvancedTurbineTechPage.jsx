import { useState } from 'react';
import { ADVANCED_TURBINE_CATEGORIES } from '../data/advancedTurbinesData';
import AdvancedTurbineSchematic from './AdvancedTurbineSchematic';

export default function AdvancedTurbineTechPage({ onBackToHome, onNavigateStudyMaterial }) {
  const [activeTurbineId, setActiveTurbineId] = useState('counter-rotating-vawt');

  const activeTurbine =
    ADVANCED_TURBINE_CATEGORIES.find((t) => t.id === activeTurbineId) ||
    ADVANCED_TURBINE_CATEGORIES[0];

  return (
    <div className="advanced-turbine-page">
      <div className="content-container page-content-wrap">
        {/* Header */}
        <header className="catalog-header advanced-header">
          <div className="catalog-eyebrow">
            <span className="eyebrow-dot" />
            <span>FRONTIER AERODYNAMICS & UNCONVENTIONAL DESIGNS</span>
          </div>
          <h1 className="catalog-title">Advanced Turbine Tech: Unconventional Systems</h1>
          <p className="catalog-subtitle">
            An in-depth mechanical and aerodynamic reference cataloguing pioneering vertical-axis and horizontal-axis 
            configurations engineered to solve wake swirl, low-starting torque, extreme tower root bending moments, 
            and high-altitude boundary layer harvesting.
          </p>
        </header>

        {/* Technology Selector Tabs */}
        <div className="advanced-tabs-container" role="tablist" aria-label="Unconventional Turbine Architectures">
          {ADVANCED_TURBINE_CATEGORIES.map((turbine) => (
            <button
              key={turbine.id}
              type="button"
              className={`advanced-nav-tab ${activeTurbineId === turbine.id ? 'active' : ''}`}
              onClick={() => setActiveTurbineId(turbine.id)}
            >
              <span className="tab-family-label">{turbine.family}</span>
              <span className="tab-title-text">{turbine.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Active Technology Deep Dive Stage */}
        <main className="advanced-tech-stage">
          {/* Top Classification Banner */}
          <div className="tech-banner-card">
            <div className="tech-badge-row">
              <span className="tech-family-pill">{activeTurbine.family}</span>
              <span className="tech-status-badge">{activeTurbine.badge}</span>
            </div>

            <h2 className="tech-display-title">{activeTurbine.title}</h2>

            <div className="tech-dual-columns">
              <div className="concept-callout-box">
                <div className="box-eyebrow">DESIGN CONCEPT</div>
                <p className="box-body-text">{activeTurbine.concept}</p>
              </div>

              <div className="problem-callout-box">
                <div className="box-eyebrow">CORE PROBLEM SOLVED</div>
                <p className="box-body-text">{activeTurbine.coreProblemSolved}</p>
              </div>
            </div>
          </div>

          {/* Interactive Technical Schematic & Engineering Blueprint */}
          <div className="tech-schematic-wrapper">
            <div className="schematic-header-bar">
              <div className="schematic-title-group">
                <span className="schematic-pulse-dot" />
                <h3 className="schematic-title">Engineering CAD Blueprint: {activeTurbine.shortTitle}</h3>
              </div>
              <span className="schematic-cad-tag">Vector Schematic Blueprint</span>
            </div>

            <div className="schematic-canvas-box">
              <AdvancedTurbineSchematic type={activeTurbine.diagramType} />
            </div>

            <div className="schematic-caption-footer">
              <span className="caption-text">
                Technical schematic diagram detailing aerodynamic streamline vectors, mechanical drive paths, 
                and structural forces for the {activeTurbine.title} configuration.
              </span>
            </div>
          </div>

          {/* Physics, Fluid Dynamics & Mechanical Principles */}
          <section className="tech-principles-section" aria-label="Working Principles">
            <h3 className="principles-section-title">
              Aerodynamic Physics & Operational Mechanics
            </h3>

            <div className="principles-list">
              {activeTurbine.physicsAndOperation.map((item, idx) => {
                const [heading, ...rest] = item.split(': ');
                return (
                  <div key={idx} className="principle-card">
                    <div className="principle-num-circle">0{idx + 1}</div>
                    <div className="principle-text-wrap">
                      <h4 className="principle-heading">{heading}</h4>
                      <p className="principle-description">{rest.join(': ')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Technical Specifications Grid */}
          <section className="tech-specs-card" aria-label="Technical Parameters">
            <h3 className="specs-card-title">Technical Design Characteristics Matrix</h3>
            <div className="specs-card-grid">
              {activeTurbine.technicalSpecs.map((spec, index) => (
                <div key={index} className="specs-card-item">
                  <span className="specs-card-label">{spec.label}</span>
                  <span className="specs-card-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Real-World Deployments & Field Prototypes */}
          {activeTurbine.realImplementations && activeTurbine.realImplementations.length > 0 && (
            <section className="tech-implementations-section" aria-label="Real-World Implementations">
              <div className="implementations-section-header">
                <div className="schematic-title-group">
                  <span className="schematic-pulse-dot" />
                  <h3 className="section-title-text">Real-World Deployments & Field Prototypes</h3>
                </div>
                <span className="implementations-count-tag">
                  {activeTurbine.realImplementations.length} Field Implementations
                </span>
              </div>

              <div className="implementations-grid">
                {activeTurbine.realImplementations.map((item) => (
                  <article key={item.id} className="implementation-card">
                    <div className="implementation-image-wrap">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="implementation-img" 
                        loading="lazy" 
                      />
                      <div className="implementation-badge-overlay">
                        <span className="impl-status-pill">{item.status}</span>
                      </div>
                    </div>
                    <div className="implementation-body">
                      <h4 className="implementation-title">{item.title}</h4>
                      <div className="implementation-meta">
                        <div className="impl-meta-row">
                          <span className="impl-meta-label">Developer:</span>
                          <span className="impl-meta-val">{item.developer}</span>
                        </div>
                        <div className="impl-meta-row">
                          <span className="impl-meta-label">Location:</span>
                          <span className="impl-meta-val">{item.location}</span>
                        </div>
                        <div className="impl-meta-row">
                          <span className="impl-meta-label">Specs:</span>
                          <span className="impl-meta-val-specs">{item.specs}</span>
                        </div>
                      </div>
                      <p className="implementation-desc">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Reference Callout */}
          <div className="tech-footer-callout">
            <div className="callout-content">
              <h4>Want to inspect academic papers on unconventional wind systems?</h4>
              <p>Explore peer-reviewed research papers and review literature covering DAWTs, Magnus turbines, and floating VAWTs.</p>
            </div>
            {onNavigateStudyMaterial && (
              <button
                type="button"
                className="goto-study-btn"
                onClick={onNavigateStudyMaterial}
              >
                <span>View Study Material Papers</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
