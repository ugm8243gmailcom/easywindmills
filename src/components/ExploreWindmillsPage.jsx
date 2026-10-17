import { useState, useMemo } from 'react';
import { TURBINE_MODELS, CLASSIFICATION_GROUPS } from '../data/turbinesData';
import ExploreParts from './ExploreParts';
import ExplorePMSG from './ExplorePMSG';
import SimulationPanel from './SimulationPanel';

export default function ExploreWindmillsPage({ onBackToHome }) {
  // Active turbine view: null means catalogue list view; when set, shows detail view
  const [selectedTurbineId, setSelectedTurbineId] = useState(null);
  const [activeGroup, setActiveGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inDevModalTurbine, setInDevModalTurbine] = useState(null);

  // Filter logic across authentic classification groups
  const filteredTurbines = useMemo(() => {
    return TURBINE_MODELS.filter((turbine) => {
      const matchesGroup =
        activeGroup === 'all' || turbine.groupId === activeGroup;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        turbine.name.toLowerCase().includes(q) ||
        turbine.subtitle.toLowerCase().includes(q) ||
        turbine.description.toLowerCase().includes(q) ||
        turbine.categoryLabel.toLowerCase().includes(q) ||
        turbine.groupName.toLowerCase().includes(q);

      return matchesGroup && matchesSearch;
    });
  }, [activeGroup, searchQuery]);

  const selectedTurbine = useMemo(() => {
    return TURBINE_MODELS.find((t) => t.id === selectedTurbineId) || null;
  }, [selectedTurbineId]);

  const handleCardClick = (turbine) => {
    if (turbine.isExplosionActive) {
      setSelectedTurbineId(turbine.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setInDevModalTurbine(turbine);
    }
  };

  const handleBackToCatalog = () => {
    setSelectedTurbineId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenActiveExperience = () => {
    setInDevModalTurbine(null);
    setSelectedTurbineId('hawt-geared');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="explore-windmills-page">
      <div className="content-container page-content-wrap">
        {/* Navigation Breadcrumb Bar */}
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
            <button
              type="button"
              className={`breadcrumb-link ${!selectedTurbine ? 'active' : ''}`}
              onClick={handleBackToCatalog}
            >
              Explore Windmills
            </button>
            {selectedTurbine && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{selectedTurbine.name} (Anatomy)</span>
              </>
            )}
          </div>
        </div>

        {/* ===================================================================
            VIEW 1: EDUCATIONAL CATALOGUE OF TURBINE CLASSIFICATIONS
           =================================================================== */}
        {!selectedTurbine && (
          <div className="catalog-view">
            {/* Catalog Header */}
            <div className="catalog-header">
              <div className="catalog-eyebrow">
                <span className="eyebrow-dot" />
                <span>TECHNICAL CLASSIFICATION CATALOGUE</span>
              </div>
              <h1 className="catalog-title">Wind Turbine Classifications and Architecture</h1>
              <p className="catalog-subtitle">
                An educational reference cataloguing wind turbines by aerodynamic rotor orientation, 
                drivetrain configuration, generator technology, and installation environment.
              </p>
            </div>

            {/* Classification Group Filters and Search Toolbar */}
            <div className="shopping-toolbar">
              {/* Group Filter Tabs */}
              <div className="category-tabs-list" role="tablist" aria-label="Classification Groups">
                <button
                  type="button"
                  className={`category-tab ${activeGroup === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveGroup('all')}
                >
                  All Classifications ({TURBINE_MODELS.length})
                </button>
                {CLASSIFICATION_GROUPS.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    className={`category-tab ${activeGroup === group.id ? 'active' : ''}`}
                    onClick={() => setActiveGroup(group.id)}
                  >
                    {group.code}: {group.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Search Control */}
              <div className="search-sort-group">
                <div className="search-input-box">
                  <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by classification, component, principle..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-field"
                    aria-label="Search windmill classifications"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="clear-search-btn"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search query"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Active Group Educational Overview Banner (When a specific group is selected) */}
            {activeGroup !== 'all' && (
              <div className="group-educational-banner">
                {(() => {
                  const currentGroup = CLASSIFICATION_GROUPS.find((g) => g.id === activeGroup);
                  return currentGroup ? (
                    <div>
                      <div className="group-badge-code">{currentGroup.code} Scope</div>
                      <h3 className="group-banner-title">{currentGroup.title}</h3>
                      <p className="group-banner-desc">{currentGroup.description}</p>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            {/* Results Count Status */}
            <div className="catalog-status-bar">
              <span className="results-count">
                Displaying <strong>{filteredTurbines.length}</strong> engineering classification{filteredTurbines.length !== 1 ? 's' : ''}
              </span>
              <span className="catalog-tip">
                Exactly one active 3D component inspection experience is available in this phase.
              </span>
            </div>

            {/* Catalogue Cards Grid */}
            <div className="turbines-shop-grid">
              {filteredTurbines.map((turbine) => {
                return (
                  <article
                    key={turbine.id}
                    className={`turbine-shop-card ${turbine.isExplosionActive ? 'card-featured' : ''}`}
                    onClick={() => handleCardClick(turbine)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(turbine);
                      }
                    }}
                    aria-label={`Examine ${turbine.name}`}
                  >
                    {/* Media Preview: Verified CAD Render or Technical Schematic */}
                    <div className="card-media-wrapper">
                      <img
                        src={turbine.image}
                        alt={`${turbine.name} schematic`}
                        className="card-image"
                        loading="lazy"
                      />
                      <div className="card-image-gradient" />

                      {/* Top Technical Badges */}
                      <div className="card-badge-row">
                        <span className={`turbine-ribbon ${turbine.isExplosionActive ? 'ribbon-3d' : 'ribbon-standard'}`}>
                          {turbine.badge}
                        </span>
                        <span className="group-code-tag">{turbine.groupName.split(':')[0]}</span>
                      </div>

                      <div className="card-hover-prompt">
                        <span className="prompt-text">
                          {turbine.isExplosionActive ? 'Explore Parts →' : 'View Configuration Details →'}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="card-content">
                      <div className="card-meta-row">
                        <span className="card-category-tag">{turbine.categoryLabel}</span>
                        <span className={`card-status-badge ${turbine.isExplosionActive ? 'status-active' : 'status-dev'}`}>
                          {turbine.status}
                        </span>
                      </div>

                      <h3 className="card-turbine-title">{turbine.name}</h3>
                      <p className="card-turbine-subtitle">{turbine.subtitle}</p>

                      <p className="card-factual-desc">{turbine.description}</p>

                      {/* Engineering Principles List */}
                      <ul className="card-features-list">
                        {turbine.keyPoints.slice(0, 3).map((point, i) => (
                          <li key={i} className="card-feature-item">
                            <span className="feature-bullet-mark">-</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Card Footer */}
                      <div className="card-action-footer">
                        <div className="card-status-label">
                          <span className={turbine.isExplosionActive ? 'status-live-dot' : 'status-dev-dot'} />
                          <span>{turbine.isExplosionActive ? 'Interactive 3D Stage' : 'Schematic Reference'}</span>
                        </div>
                        <button
                          type="button"
                          className={`card-explore-btn ${turbine.isExplosionActive ? 'btn-active' : 'btn-dev'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(turbine);
                          }}
                        >
                          <span>Explore Parts</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredTurbines.length === 0 && (
              <div className="catalog-empty-state">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <h3>No classifications matched your search</h3>
                <p>Try searching for rotor, drivetrain, generator, or installation parameters.</p>
                <button
                  type="button"
                  className="reset-filters-btn"
                  onClick={() => {
                    setActiveGroup('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            VIEW 2: ACTIVE TURBINE EXPLORATION (DETAIL VIEW)
           =================================================================== */}
        {selectedTurbine && (
          <div className="turbine-detail-view">
            {/* Detail View Header */}
            <div className="detail-header-panel">
              <div className="detail-header-top">
                <button
                  type="button"
                  className="back-to-catalog-btn"
                  onClick={handleBackToCatalog}
                  aria-label="Return to Windmill Classification Catalogue"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Back to Catalogue</span>
                </button>

                <div className="active-config-tag">
                  <span>Active Inspection Experience</span>
                </div>
              </div>

              {/* Turbine Technical Introduction Banner (Replaces fabricated specification strip) */}
              <div className="turbine-hero-banner">
                <div className="banner-info">
                  <div className="banner-badge-row">
                    <span className="banner-cat-tag">{selectedTurbine.groupName}</span>
                    <span className="banner-3d-tag">3D Disassembly View Active</span>
                  </div>
                  <h2 className="banner-title">{selectedTurbine.name}</h2>
                  <p className="banner-desc">{selectedTurbine.description}</p>
                </div>

                {/* Technical Configuration Overview (Factual engineering parameters) */}
                <div className="banner-config-breakdown">
                  <h4 className="config-box-title">Technical Configuration Summary</h4>
                  <div className="config-grid">
                    <div className="config-item">
                      <span className="config-k">Rotor Architecture</span>
                      <span className="config-v">{selectedTurbine.technicalOverview.rotorArchitecture}</span>
                    </div>
                    <div className="config-item">
                      <span className="config-k">Drivetrain System</span>
                      <span className="config-v">{selectedTurbine.technicalOverview.drivetrainArchitecture}</span>
                    </div>
                    <div className="config-item">
                      <span className="config-k">Generator Machine</span>
                      <span className="config-v">{selectedTurbine.technicalOverview.generatorArchitecture}</span>
                    </div>
                    <div className="config-item">
                      <span className="config-k">Power Conditioning</span>
                      <span className="config-v">{selectedTurbine.technicalOverview.gridInterface}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Disassembly Experience: Geared HAWT or Direct-Drive PMSG */}
            <div className="embedded-explore-wrapper">
              {selectedTurbine.id === 'pmsg-generator' ? (
                <ExplorePMSG />
              ) : (
                <>
                  <ExploreParts />
                  <SimulationPanel />
                </>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            HONEST "IN DEVELOPMENT" MODAL DIALOG FOR NON-ACTIVE CONFIGURATIONS
           =================================================================== */}
        {inDevModalTurbine && (
          <div className="indev-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="indev-title">
            <div className="indev-modal-backdrop" onClick={() => setInDevModalTurbine(null)} />
            <div className="indev-modal-card">
              <div className="indev-header">
                <div className="indev-badge">
                  <span>Classification Reference: {inDevModalTurbine.groupName.split(':')[0]}</span>
                </div>
                <button
                  type="button"
                  className="indev-close-btn"
                  onClick={() => setInDevModalTurbine(null)}
                  aria-label="Close dialog"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="indev-body">
                <h3 id="indev-title" className="indev-title">{inDevModalTurbine.name}</h3>
                <p className="indev-subtitle">{inDevModalTurbine.subtitle}</p>

                <div className="indev-image-wrap">
                  <img src={inDevModalTurbine.image} alt={inDevModalTurbine.name} className="indev-preview-img" />
                </div>

                <div className="indev-status-box">
                  <div className="indev-status-badge">In Development</div>
                  <p className="indev-status-message">
                    The interactive 3D component disassembly for this configuration is currently in development. 
                    EasyWindmill provides verified interactive inspection experiences for both the 
                    <strong>Horizontal-Axis Geared Wind Turbine</strong> and the <strong>Direct-Drive Permanent-Magnet Synchronous Generator (PMSG)</strong>.
                  </p>
                </div>

                <div className="indev-key-points">
                  <h4 className="indev-points-title">Core Engineering Principles</h4>
                  <ul>
                    {inDevModalTurbine.keyPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="indev-footer">
                <button
                  type="button"
                  className="indev-dismiss-btn"
                  onClick={() => setInDevModalTurbine(null)}
                >
                  Close Reference
                </button>
                <button
                  type="button"
                  className="indev-explore-active-btn"
                  onClick={() => {
                    setInDevModalTurbine(null);
                    setSelectedTurbineId('pmsg-generator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Explore Direct-Drive PMSG</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="indev-explore-active-btn"
                  onClick={handleOpenActiveExperience}
                >
                  <span>Explore Geared Turbine</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
