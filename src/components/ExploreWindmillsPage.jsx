import { useState, useMemo } from 'react';
import { TURBINE_MODELS } from '../data/turbinesData';
import ExploreParts from './ExploreParts';

export default function ExploreWindmillsPage({ onBackToHome }) {
  const [selectedTurbineId, setSelectedTurbineId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedSubPartId, setSelectedSubPartId] = useState(null);

  // Filter & sort logic (purely technical)
  const filteredTurbines = useMemo(() => {
    return TURBINE_MODELS.filter((turbine) => {
      const matchesCategory =
        activeCategory === 'all' || turbine.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        turbine.name.toLowerCase().includes(q) ||
        turbine.subtitle.toLowerCase().includes(q) ||
        turbine.description.toLowerCase().includes(q) ||
        turbine.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'power-desc') {
        return parseFloat(b.specs.ratedPower) - parseFloat(a.specs.ratedPower);
      }
      if (sortBy === 'power-asc') {
        return parseFloat(a.specs.ratedPower) - parseFloat(b.specs.ratedPower);
      }
      if (sortBy === 'rotor-desc') {
        return parseFloat(b.specs.rotorDiameter) - parseFloat(a.specs.rotorDiameter);
      }
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy]);

  const selectedTurbine = useMemo(() => {
    return TURBINE_MODELS.find((t) => t.id === selectedTurbineId) || null;
  }, [selectedTurbineId]);

  const handleSelectTurbine = (turbineId) => {
    setSelectedTurbineId(turbineId);
    setSelectedSubPartId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedTurbineId(null);
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
                <span className="breadcrumb-current">{selectedTurbine.name} (Specifications and Parts)</span>
              </>
            )}
          </div>
        </div>

        {/* ===================================================================
            VIEW 1: CATALOG OF WINDMILL CARDS
           =================================================================== */}
        {!selectedTurbine && (
          <div className="catalog-view">
            {/* Catalog Header */}
            <div className="catalog-header">
              <div className="catalog-eyebrow">
                <span className="eyebrow-dot" />
                <span>COMMERCIAL TURBINE PORTFOLIO</span>
              </div>
              <h1 className="catalog-title">Wind Turbine Specifications and Models</h1>
              <p className="catalog-subtitle">
                Select an industrial wind turbine model to inspect its mechanical architecture, electrical
                subsystems, and component disassembly.
              </p>
            </div>

            {/* Technical Filter Toolbar */}
            <div className="shopping-toolbar">
              {/* Category Filter Tabs */}
              <div className="category-tabs-list" role="tablist" aria-label="Turbine Categories">
                <button
                  type="button"
                  className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  All Models ({TURBINE_MODELS.length})
                </button>
                <button
                  type="button"
                  className={`category-tab ${activeCategory === 'onshore' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('onshore')}
                >
                  Utility Onshore
                </button>
                <button
                  type="button"
                  className={`category-tab ${activeCategory === 'offshore' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('offshore')}
                >
                  Deep-Sea Offshore
                </button>
                <button
                  type="button"
                  className={`category-tab ${activeCategory === 'community' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('community')}
                >
                  Community and Distributed
                </button>
                <button
                  type="button"
                  className={`category-tab ${activeCategory === 'extreme' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('extreme')}
                >
                  Alpine and Cold Climate
                </button>
              </div>

              {/* Search and Sort Controls */}
              <div className="search-sort-group">
                <div className="search-input-box">
                  <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by model, specs, application..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-field"
                    aria-label="Search windmill models"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="clear-search-btn"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="sort-dropdown-box">
                  <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="default">Default Order</option>
                    <option value="power-desc">Rated Power: High to Low</option>
                    <option value="power-asc">Rated Power: Low to High</option>
                    <option value="rotor-desc">Rotor Diameter: Large to Small</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Status Bar */}
            <div className="catalog-status-bar">
              <span className="results-count">
                Displaying <strong>{filteredTurbines.length}</strong> turbine configuration{filteredTurbines.length !== 1 ? 's' : ''}
              </span>
              <span className="catalog-tip">
                Click any model card to inspect subassemblies and internal engineering.
              </span>
            </div>

            {/* Technical Specification Cards Grid */}
            <div className="turbines-shop-grid">
              {filteredTurbines.map((turbine) => {
                return (
                  <article
                    key={turbine.id}
                    className={`turbine-shop-card ${turbine.is3DReady ? 'card-featured' : ''}`}
                    onClick={() => handleSelectTurbine(turbine.id)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectTurbine(turbine.id);
                      }
                    }}
                    aria-label={`Inspect ${turbine.name}`}
                  >
                    {/* Media Preview: Real CAD Frame or Vector Blueprint */}
                    <div className="card-media-wrapper">
                      <img
                        src={turbine.image}
                        alt={`${turbine.name} technical configuration`}
                        className="card-image"
                        loading="lazy"
                      />
                      <div className="card-image-gradient" />

                      {/* Top Technical Badges */}
                      <div className="card-badge-row">
                        <span className={`turbine-ribbon ${turbine.is3DReady ? 'ribbon-3d' : 'ribbon-standard'}`}>
                          {turbine.is3DReady ? '3D Anatomy Explorer' : turbine.badge}
                        </span>
                        <span className="power-tag">{turbine.specs.ratedPower}</span>
                      </div>

                      <div className="card-hover-prompt">
                        <span className="prompt-text">Inspect Internal Parts →</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="card-content">
                      <div className="card-meta-row">
                        <span className="card-category-tag">{turbine.categoryLabel}</span>
                        <span className="card-efficiency-tag">Betz: {turbine.specs.efficiency}</span>
                      </div>

                      <h3 className="card-turbine-title">{turbine.name}</h3>
                      <p className="card-turbine-subtitle">{turbine.subtitle}</p>

                      {/* Technical Specs Matrix */}
                      <div className="card-specs-matrix">
                        <div className="spec-chip">
                          <span className="spec-chip-label">Rated Capacity</span>
                          <span className="spec-chip-value">{turbine.specs.ratedPower}</span>
                        </div>
                        <div className="spec-chip">
                          <span className="spec-chip-label">Rotor Diameter</span>
                          <span className="spec-chip-value">{turbine.specs.rotorDiameter}</span>
                        </div>
                        <div className="spec-chip">
                          <span className="spec-chip-label">Cut-In Speed</span>
                          <span className="spec-chip-value">{turbine.specs.cutInWind}</span>
                        </div>
                        <div className="spec-chip">
                          <span className="spec-chip-label">Hub Height</span>
                          <span className="spec-chip-value">{turbine.specs.hubHeight}</span>
                        </div>
                      </div>

                      {/* Engineering Highlights */}
                      <ul className="card-features-list">
                        {turbine.keyBullets.slice(0, 3).map((bullet, i) => (
                          <li key={i} className="card-feature-item">
                            <span className="feature-bullet-mark">-</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Card Footer */}
                      <div className="card-action-footer">
                        <div className="card-status-label">
                          <span className="status-live-dot" />
                          <span>{turbine.is3DReady ? '50-Frame Disassembly' : 'Schematic Blueprint'}</span>
                        </div>
                        <button
                          type="button"
                          className="card-explore-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectTurbine(turbine.id);
                          }}
                        >
                          <span>Inspect Parts</span>
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
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <h3>No wind turbines matched the current filter</h3>
                <p>Reset the category filter or try another technical parameter.</p>
                <button
                  type="button"
                  className="reset-filters-btn"
                  onClick={() => {
                    setActiveCategory('all');
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
            VIEW 2: INDIVIDUAL WINDMILL PARTS EXPLORATION (DETAIL VIEW)
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
                  aria-label="Return to Windmill Catalog"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Back to Catalog</span>
                </button>

                {/* Model Quick Switcher */}
                <div className="model-quick-switcher" role="tablist" aria-label="Switch turbine model">
                  <span className="switcher-label">Model:</span>
                  {TURBINE_MODELS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`switch-tab-btn ${t.id === selectedTurbine.id ? 'active' : ''}`}
                      onClick={() => handleSelectTurbine(t.id)}
                    >
                      <span>{t.name.replace('EasyWindmill ', '')}</span>
                      {t.is3DReady && <span className="tab-tag-3d">3D</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Turbine Spec Banner */}
              <div className="turbine-hero-banner">
                <div className="banner-info">
                  <div className="banner-badge-row">
                    <span className="banner-cat-tag">{selectedTurbine.categoryLabel}</span>
                    <span className="banner-power-tag">{selectedTurbine.specs.ratedPower}</span>
                    {selectedTurbine.is3DReady && (
                      <span className="banner-3d-tag">3D Disassembly View Active</span>
                    )}
                  </div>
                  <h2 className="banner-title">{selectedTurbine.name}</h2>
                  <p className="banner-desc">{selectedTurbine.description}</p>
                </div>

                <div className="banner-specs-list">
                  <div className="b-spec">
                    <span className="b-spec-k">Rotor</span>
                    <span className="b-spec-v">{selectedTurbine.specs.rotorDiameter}</span>
                  </div>
                  <div className="b-spec">
                    <span className="b-spec-k">Cut-In</span>
                    <span className="b-spec-v">{selectedTurbine.specs.cutInWind}</span>
                  </div>
                  <div className="b-spec">
                    <span className="b-spec-k">Hub Height</span>
                    <span className="b-spec-v">{selectedTurbine.specs.hubHeight}</span>
                  </div>
                  <div className="b-spec">
                    <span className="b-spec-k">Efficiency</span>
                    <span className="b-spec-v">{selectedTurbine.specs.efficiency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ALPHA-3200: 50-Frame Interactive 3D Disassembly Stage */}
            {selectedTurbine.is3DReady ? (
              <div className="embedded-explore-wrapper">
                <ExploreParts />
              </div>
            ) : (
              /* ALTERNATIVE TURBINE: Specialized Component Blueprint Visualizer */
              <div className="subsystem-blueprint-section">
                <div className="blueprint-top-box">
                  <div className="blueprint-notice">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <div>
                      <strong>Subsystem Architecture:</strong> Detailed engineering schematics and subassembly
                      data for the {selectedTurbine.name}.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="launch-3d-flagship-btn"
                    onClick={() => handleSelectTurbine('alpha-3200')}
                  >
                    <span>Inspect Alpha-3200 50-Frame Disassembly Stage</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* Main Visual and Sub-parts Grid */}
                <div className="blueprint-layout-grid">
                  <div className="blueprint-photo-card">
                    <div className="blueprint-img-wrapper">
                      <img
                        src={selectedTurbine.image}
                        alt={selectedTurbine.name}
                        className="blueprint-img"
                      />
                      <div className="blueprint-img-tag">
                        <span>{selectedTurbine.subtitle}</span>
                      </div>
                    </div>

                    <div className="blueprint-bullets-card">
                      <h4 className="bullets-title">Key Architectural Features</h4>
                      <ul className="bullets-list">
                        {selectedTurbine.keyBullets.map((b, i) => (
                          <li key={i} className="bullet-row">
                            <span className="bullet-dot" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="blueprint-parts-column">
                    <div className="parts-column-header">
                      <h3>Mechanical and Electrical Subassemblies</h3>
                      <span>Select an assembly to inspect technical specifications and operational dynamics</span>
                    </div>

                    <div className="subassemblies-list">
                      {selectedTurbine.parts.map((part) => {
                        const isExpanded = selectedSubPartId === part.id;
                        return (
                          <div
                            key={part.id}
                            className={`subassembly-card ${isExpanded ? 'expanded' : ''}`}
                            onClick={() => setSelectedSubPartId(isExpanded ? null : part.id)}
                          >
                            <div className="subassembly-header">
                              <div className="subassembly-num">{part.number}</div>
                              <div className="subassembly-titles">
                                <span className="subassembly-cat">{part.category}</span>
                                <h4 className="subassembly-name">{part.name}</h4>
                                <p className="subassembly-short">{part.shortRole}</p>
                              </div>
                              <span className="expand-indicator-text">
                                {isExpanded ? 'Hide Specs' : 'View Specs'}
                              </span>
                            </div>

                            <p className="subassembly-desc">{part.description}</p>

                            {isExpanded && (
                              <div className="subassembly-deep-dive">
                                <div className="subassembly-specs-grid">
                                  {part.specs.map((s, idx) => (
                                    <div key={idx} className="sub-spec-item">
                                      <span className="sub-spec-k">{s.label}</span>
                                      <span className="sub-spec-v">{s.value}</span>
                                    </div>
                                  ))}
                                </div>

                                <div className="subassembly-mechanism">
                                  <h5>Operational Dynamics</h5>
                                  <p>{part.mechanism}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
