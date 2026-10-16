import { useState, useRef, useEffect, useCallback } from 'react';
import { PMSG_PARTS } from '../data/pmsgParts';

export default function ExplorePMSG() {
  const videoRef = useRef(null);
  const stageRef = useRef(null);

  // States
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // When video loads metadata
  const handleLoadedMetadata = () => {
    setVideoLoaded(true);
  };

  // Video time update listener
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    // Check if reached end of explosion
    if (video.duration && video.currentTime >= video.duration - 0.25) {
      setIsExploded(true);
      setIsPlaying(false);
    }
  };

  // User triggers initial disassembly explosion
  const handleExploreClick = () => {
    setHasStarted(true);
    setSelectedPart(null);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay fallback: jump directly to end
            video.currentTime = video.duration || 5;
            setIsExploded(true);
            setIsPlaying(false);
          });
      }
    }
  };

  // Re-assemble back to assembled state
  const handleAssemble = () => {
    setSelectedPart(null);
    setIsExploded(false);
    setIsPlaying(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // Jump to exploded state
  const handleExplode = () => {
    setSelectedPart(null);
    const video = videoRef.current;
    if (video) {
      video.pause();
      if (video.duration) {
        video.currentTime = video.duration - 0.05;
      }
      setIsExploded(true);
      setIsPlaying(false);
    }
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      setSelectedPart(null);
      if (video.duration && video.currentTime >= video.duration - 0.3) {
        video.currentTime = 0;
        setIsExploded(false);
      }
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  // Reset zoom back to overview
  const handleResetView = () => {
    setSelectedPart(null);
  };

  // Select a component / hotspot
  const handleSelectPart = (part) => {
    // If selecting while video is assembled, seek to exploded state first
    if (!isExploded) {
      const video = videoRef.current;
      if (video && video.duration) {
        video.pause();
        video.currentTime = video.duration - 0.05;
      }
      setIsExploded(true);
      setIsPlaying(false);
      setHasStarted(true);
    }

    if (selectedPart?.id === part.id) {
      setSelectedPart(null);
    } else {
      setSelectedPart(part);
    }
  };

  // Cycle to previous / next part
  const handlePrevPart = () => {
    if (!selectedPart) return;
    const currentIndex = PMSG_PARTS.findIndex((p) => p.id === selectedPart.id);
    const prevIndex = (currentIndex - 1 + PMSG_PARTS.length) % PMSG_PARTS.length;
    setSelectedPart(PMSG_PARTS[prevIndex]);
  };

  const handleNextPart = () => {
    if (!selectedPart) return;
    const currentIndex = PMSG_PARTS.findIndex((p) => p.id === selectedPart.id);
    const nextIndex = (currentIndex + 1) % PMSG_PARTS.length;
    setSelectedPart(PMSG_PARTS[nextIndex]);
  };

  // Handle escape key to reset zoom
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedPart) {
        setSelectedPart(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPart]);

  // Hotspots are visible when exploded and not playing
  const showHotspots = isExploded && !isPlaying;

  return (
    <section className="explore-section" id="explore-pmsg" aria-label="Interactive Direct-Drive PMSG Exploration">
      <div className="content-container">
        {/* Section Header */}
        <div className="explore-header">
          <div className="explore-eyebrow">
            <span className="eyebrow-dot" />
            <span>INTERACTIVE COMPONENT INSPECTION</span>
          </div>
          <h2 className="explore-title">Direct-Drive Ring Generator Anatomy</h2>
          <p className="explore-subtitle">
            Inspect the internal electromagnetic, mechanical support, and structural subsystems of a 
            gearless direct-drive permanent-magnet synchronous generator (PMSG).
          </p>
        </div>

        {/* Main Interactive Stage Card */}
        <div className="explore-stage-card" ref={stageRef}>
          {/* Top Status & Quick Subassembly Navigation Bar */}
          <div className="stage-top-bar">
            <div className="stage-status-indicator">
              <span className={`status-pill ${isExploded ? 'status-pill--active' : ''}`}>
                <span className="status-dot" />
                {isExploded
                  ? 'Exploded View: Subassemblies Separated'
                  : isPlaying
                  ? 'Transitioning Subassemblies...'
                  : 'Assembled Generator: Ready for Inspection'}
              </span>
            </div>

            {/* Quick Part Navigation Buttons (active when exploded) */}
            {isExploded && (
              <div className="stage-part-pills" role="tablist" aria-label="Exploded generator subassemblies">
                {PMSG_PARTS.map((part) => (
                  <button
                    key={part.id}
                    type="button"
                    className={`part-pill-btn ${selectedPart?.id === part.id ? 'active' : ''}`}
                    onClick={() => handleSelectPart(part)}
                    onMouseEnter={() => setHoveredPart(part.id)}
                    onMouseLeave={() => setHoveredPart(null)}
                    aria-label={`Inspect ${part.name}`}
                  >
                    <span className="part-pill-num">{part.number}</span>
                    <span className="part-pill-name">{part.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Viewport Box (Maintains 16:9 Aspect Ratio) */}
          <div className="stage-viewport">
            {/* Zoomable Container Layer */}
            <div
              className={`stage-zoom-layer ${selectedPart ? 'is-zoomed' : ''}`}
              style={{
                transformOrigin: selectedPart
                  ? `${selectedPart.zoom.x}% ${selectedPart.zoom.y}%`
                  : '50% 50%',
                transform: selectedPart ? `scale(${selectedPart.zoom.scale})` : 'scale(1)'
              }}
              onClick={(e) => {
                if (selectedPart && e.target === e.currentTarget) {
                  setSelectedPart(null);
                }
              }}
            >
              {/* HTML5 Video for direct-drive PMSG exploded view */}
              <video
                ref={videoRef}
                className="explore-video-element"
                src="/turbines/doughnutshaped-generator.mp4"
                poster="/turbines/pmsg-generator-assembled.jpg"
                playsInline
                muted
                preload="auto"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => {
                  setIsExploded(true);
                  setIsPlaying(false);
                }}
                aria-label="Direct-Drive Permanent-Magnet Synchronous Generator Viewport"
              />

              {/* Hotspots Overlay (Absolute coordinates on top of video) */}
              <div
                className={`hotspots-layer ${showHotspots ? 'hotspots-visible' : ''}`}
                aria-hidden={!showHotspots}
              >
                {PMSG_PARTS.map((part) => {
                  const isSelected = selectedPart?.id === part.id;
                  const isHovered = hoveredPart === part.id;
                  const isDimmed = selectedPart && !isSelected;

                  return (
                    <button
                      key={part.id}
                      type="button"
                      className={`hotspot-btn ${isSelected ? 'hotspot-active' : ''} ${
                        isDimmed ? 'hotspot-dimmed' : ''
                      } ${isHovered ? 'hotspot-hovered' : ''}`}
                      style={{
                        left: `${part.hotspot.x}%`,
                        top: `${part.hotspot.y}%`
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPart(part);
                      }}
                      onMouseEnter={() => setHoveredPart(part.id)}
                      onMouseLeave={() => setHoveredPart(null)}
                      aria-label={`Examine ${part.name}`}
                      tabIndex={showHotspots ? 0 : -1}
                    >
                      {/* Outer pulse indicator */}
                      <span className="hotspot-pulse-ring" aria-hidden="true" />

                      {/* Center Beacon Pin */}
                      <span className="hotspot-beacon">
                        <span className="hotspot-beacon-number">{part.number}</span>
                      </span>

                      {/* Tooltip Label Badge */}
                      <span className="hotspot-label-badge">
                        <span className="label-category">{part.category}</span>
                        <span className="label-name">{part.name}</span>
                        <span className="label-action">Click to inspect</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* INITIAL STATE OVERLAY: Clear Call-to-Action to begin disassembly */}
            {!hasStarted && !isExploded && (
              <div className="initial-overlay">
                <div className="initial-overlay-backdrop" />
                <div className="initial-card">
                  <div className="initial-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                    <span>Direct-Drive PMSG Disassembly</span>
                  </div>
                  <h3 className="initial-title">Permanent-Magnet Ring Generator</h3>
                  <p className="initial-description">
                    Separate the gearless generator into its stationary slotted stator core, form-wound copper coils, 
                    large-diameter main roller bearing, and permanent-magnet rotor rim for detailed engineering inspection.
                  </p>

                  <button
                    type="button"
                    className="explore-cta-btn"
                    onClick={handleExploreClick}
                    aria-label="Start Generator Component Separation"
                  >
                    <span className="cta-icon-wrapper">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="cta-text">Disassemble Generator</span>
                  </button>
                </div>
              </div>
            )}

            {/* SLIDE-OUT COMPONENT INSPECTION DRAWER */}
            {selectedPart && (
              <aside 
                className="part-details-drawer" 
                aria-label={`Technical specifications for ${selectedPart.name}`}
              >
                {/* Drawer Header */}
                <div className="drawer-header">
                  <div className="drawer-meta">
                    <span className="drawer-badge">{selectedPart.badge}</span>
                    <span className="drawer-category">{selectedPart.category}</span>
                  </div>
                  <button
                    type="button"
                    className="drawer-close-btn"
                    onClick={() => setSelectedPart(null)}
                    aria-label="Close component details and return to overview"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Drawer Scrollable Body */}
                <div className="drawer-body">
                  <div className="drawer-title-group">
                    <span className="drawer-part-number">SUBASSEMBLY {selectedPart.number} OF 08</span>
                    <h3 className="drawer-part-name">{selectedPart.name}</h3>
                    <span className="drawer-role-tag">{selectedPart.shortRole}</span>
                  </div>

                  <p className="drawer-description">{selectedPart.description}</p>

                  {/* Role in Energy Conversion */}
                  <div className="drawer-context-box">
                    <h4 className="context-title">ROLE IN ENERGY CONVERSION</h4>
                    <p className="context-text">{selectedPart.systemRole}</p>
                  </div>

                  {/* Physical Construction and Materials */}
                  <div className="drawer-context-box">
                    <h4 className="context-title">CONSTRUCTION AND MATERIALS</h4>
                    <p className="context-text">{selectedPart.construction}</p>
                  </div>

                  {/* Electromagnetic Working Principle */}
                  <div className="drawer-mechanism-box">
                    <div className="mechanism-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>WORKING PRINCIPLE</span>
                    </div>
                    <p className="mechanism-text">{selectedPart.workingPrinciple}</p>
                  </div>

                  {/* Adjacent Subassemblies */}
                  <div className="drawer-context-box">
                    <h4 className="context-title">ADJACENT SUBASSEMBLIES</h4>
                    <p className="context-text">{selectedPart.adjacentComponents}</p>
                  </div>

                  {/* Technical Parameters Table */}
                  <div className="drawer-specs-section">
                    <h4 className="specs-section-title">VERIFIED TECHNICAL PARAMETERS</h4>
                    <div className="specs-grid">
                      {selectedPart.specs.map((spec, idx) => (
                        <div key={idx} className="spec-item">
                          <span className="spec-label">{spec.label}</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified External Reference Box */}
                  <div className="drawer-reference-box">
                    <span className="ref-source-tag">VERIFIED TECHNICAL REFERENCE</span>
                    <h5 className="ref-title">{selectedPart.sourceTitle}</h5>
                    <a
                      href={selectedPart.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="drawer-reference-link"
                    >
                      <span>Learn more at {selectedPart.reference.source}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Drawer Footer Navigation */}
                <div className="drawer-footer-controls">
                  <button
                    type="button"
                    className="drawer-nav-btn"
                    onClick={handlePrevPart}
                    aria-label="Inspect previous subassembly"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    className="drawer-reset-btn"
                    onClick={handleResetView}
                    aria-label="Return to complete exploded view"
                  >
                    Return to Overview
                  </button>

                  <button
                    type="button"
                    className="drawer-nav-btn"
                    onClick={handleNextPart}
                    aria-label="Inspect next subassembly"
                  >
                    <span>Next</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </aside>
            )}
          </div>

          {/* Bottom Interactive Controls Bar */}
          <div className="stage-controls-bar">
            <div className="controls-left">
              <button
                type="button"
                className="control-btn"
                onClick={handleAssemble}
                disabled={!isExploded && !isPlaying}
                aria-label="Assemble generator"
                title="Assemble Generator"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Assemble</span>
              </button>

              <button
                type="button"
                className="control-btn"
                onClick={handleExplode}
                disabled={isExploded && !isPlaying}
                aria-label="Explode generator to separate subassemblies"
                title="Explode Generator"
              >
                <span>Explode</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                className="control-btn"
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Pause animation' : 'Play transition'}
                title={isPlaying ? 'Pause' : 'Play Transition'}
              >
                {isPlaying ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Play Transition</span>
                  </>
                )}
              </button>
            </div>

            <div className="controls-center">
              <div className="state-description-pill">
                <span className="state-dot" />
                <span className="state-text">
                  {isExploded
                    ? 'Subassemblies separated. Select any highlighted component to inspect.'
                    : isPlaying
                    ? 'Animating generator subassembly separation...'
                    : 'Direct-drive ring generator in fully assembled state. Click Explode to separate components.'}
                </span>
              </div>
            </div>

            <div className="controls-right">
              {selectedPart && (
                <button
                  type="button"
                  className="control-btn reset-btn"
                  onClick={handleResetView}
                  aria-label="Reset zoom to full overview"
                >
                  <span>Reset View</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Reference Grid Below Stage */}
        <div className="explore-parts-legend">
          <div className="legend-header">
            <div>
              <h3 className="legend-title">Direct-Drive Generator Subassemblies</h3>
              <p className="legend-subtitle">
                Select an assembly below to focus the generator view and inspect verified engineering specifications.
              </p>
            </div>
          </div>

          <div className="legend-grid">
            {PMSG_PARTS.map((part) => (
              <button
                key={part.id}
                type="button"
                className={`legend-card ${selectedPart?.id === part.id ? 'active' : ''}`}
                onClick={() => {
                  handleSelectPart(part);
                  stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                <div className="legend-card-header">
                  <span className="legend-card-num">{part.number}</span>
                  <span className="legend-card-badge">{part.category}</span>
                </div>
                <h4 className="legend-card-name">{part.name}</h4>
                <p className="legend-card-desc">{part.shortRole}</p>
                <div className="legend-card-footer">
                  <span className="legend-inspect-link">
                    Inspect subassembly
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
