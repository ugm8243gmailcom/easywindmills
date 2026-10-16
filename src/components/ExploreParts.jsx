import { useState, useRef, useEffect, useCallback } from 'react';
import { WINDMILL_PARTS } from '../data/windmillParts';

const TOTAL_FRAMES = 50;
const FRAME_DURATION = 1000 / 30; // 30 FPS playback (~33.3ms per frame)

export default function ExploreParts() {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const imagesRef = useRef([]);
  const animFrameIdRef = useRef(null);
  const lastTimeRef = useRef(0);

  // States
  const [currentFrame, setCurrentFrame] = useState(1);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);

  // Draw a given frame to the canvas
  const drawFrame = useCallback((frameNum) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const index = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameNum - 1));
    const img = imagesRef.current[index];

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Preload all 50 JPG frames on mount
  useEffect(() => {
    let mounted = true;
    let loadedCounter = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = String(i).padStart(3, '0');
      img.src = `/frames/frame_${pad}.jpg`;

      img.onload = () => {
        if (!mounted) return;
        loadedCounter++;
        setLoadProgress(Math.round((loadedCounter / TOTAL_FRAMES) * 100));

        // Draw initial frame as soon as frame 1 is ready
        if (i === 1) {
          drawFrame(1);
        }

        if (loadedCounter === TOTAL_FRAMES) {
          setIsPreloaded(true);
        }
      };

      img.onerror = () => {
        if (!mounted) return;
        loadedCounter++;
        setLoadProgress(Math.round((loadedCounter / TOTAL_FRAMES) * 100));
        if (loadedCounter === TOTAL_FRAMES) {
          setIsPreloaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      mounted = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  // Redraw when currentFrame changes
  useEffect(() => {
    drawFrame(currentFrame);
  }, [currentFrame, drawFrame]);

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

  // Smooth frame playback animation loop using requestAnimationFrame
  const startPlayback = useCallback((targetEndFrame, direction = 'forward', onFinish) => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }

    // Reset zoom if currently zoomed
    setSelectedPart(null);
    setIsPlaying(true);
    lastTimeRef.current = performance.now();

    const step = (timestamp) => {
      const delta = timestamp - lastTimeRef.current;

      if (delta >= FRAME_DURATION) {
        lastTimeRef.current = timestamp - (delta % FRAME_DURATION);

        setCurrentFrame((prev) => {
          let next;
          if (direction === 'forward') {
            next = prev + 1;
            if (next >= targetEndFrame) {
              setIsPlaying(false);
              if (onFinish) onFinish();
              return targetEndFrame;
            }
          } else {
            next = prev - 1;
            if (next <= targetEndFrame) {
              setIsPlaying(false);
              if (onFinish) onFinish();
              return targetEndFrame;
            }
          }
          return next;
        });
      }

      animFrameIdRef.current = requestAnimationFrame(step);
    };

    animFrameIdRef.current = requestAnimationFrame(step);
  }, []);

  // User triggers "Explore Parts" initial explosion
  const handleExploreClick = () => {
    setHasStarted(true);
    startPlayback(TOTAL_FRAMES, 'forward');
  };

  // Re-collapse back to assembled state
  const handleAssemble = () => {
    setSelectedPart(null);
    startPlayback(1, 'reverse');
  };

  // Re-explode to exploded state
  const handleExplode = () => {
    setSelectedPart(null);
    startPlayback(TOTAL_FRAMES, 'forward');
  };

  // Reset view to overview
  const handleResetView = () => {
    setSelectedPart(null);
  };

  // Select a hotspot / part
  const handleSelectPart = (part) => {
    if (selectedPart?.id === part.id) {
      // Toggle off if already selected
      setSelectedPart(null);
    } else {
      setSelectedPart(part);
    }
  };

  // Cycle to previous / next part while zoomed
  const handlePrevPart = () => {
    if (!selectedPart) return;
    const currentIndex = WINDMILL_PARTS.findIndex((p) => p.id === selectedPart.id);
    const prevIndex = (currentIndex - 1 + WINDMILL_PARTS.length) % WINDMILL_PARTS.length;
    setSelectedPart(WINDMILL_PARTS[prevIndex]);
  };

  const handleNextPart = () => {
    if (!selectedPart) return;
    const currentIndex = WINDMILL_PARTS.findIndex((p) => p.id === selectedPart.id);
    const nextIndex = (currentIndex + 1) % WINDMILL_PARTS.length;
    setSelectedPart(WINDMILL_PARTS[nextIndex]);
  };

  // Hotspots are fully visible when exploded
  const isExploded = currentFrame === TOTAL_FRAMES;
  const isAssembled = currentFrame === 1;
  const showHotspots = isExploded && !isPlaying;

  return (
    <section className="explore-section" id="explore" aria-label="Interactive Wind Turbine Exploration">
      <div className="content-container">
        {/* Section Header */}
        <div className="explore-header">
          <div className="explore-eyebrow">
            <span className="eyebrow-dot" />
            <span>INTERACTIVE COMPONENT INSPECTION</span>
          </div>
          <h2 className="explore-title">Turbine Component Anatomy</h2>
          <p className="explore-subtitle">
            Inspect the internal mechanical, electrical, and structural subsystems of a horizontal-axis wind turbine 
            equipped with a parallel-shaft geared drivetrain and synchronous generator.
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
                  : 'Assembled Turbine: Ready for Inspection'}
              </span>
            </div>

            {/* Quick Part Navigation Buttons (active when exploded) */}
            {isExploded && (
              <div className="stage-part-pills" role="tablist" aria-label="Exploded turbine subassemblies">
                {WINDMILL_PARTS.map((part) => (
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
              {/* HTML5 Canvas for performant frame playback */}
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="explore-canvas"
                aria-label="Wind Turbine Component Anatomy Viewport"
              />

              {/* Hotspots Overlay (Absolute coordinates on top of canvas) */}
              <div
                className={`hotspots-layer ${showHotspots ? 'hotspots-visible' : ''}`}
                aria-hidden={!showHotspots}
              >
                {WINDMILL_PARTS.map((part) => {
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

            {/* INITIAL STATE OVERLAY: Clear Call-to-Action to begin exploration */}
            {!hasStarted && isAssembled && (
              <div className="initial-overlay">
                <div className="initial-overlay-backdrop" />
                <div className="initial-card">
                  <div className="initial-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                    <span>Component Disassembly</span>
                  </div>
                  <h3 className="initial-title">Internal Turbine Mechanics</h3>
                  <p className="initial-description">
                    Separate the turbine into its key aerodynamic, mechanical drivetrain, electrical generation, 
                    and structural subassemblies for detailed technical inspection.
                  </p>

                  <button
                    type="button"
                    className="explore-cta-btn"
                    onClick={handleExploreClick}
                    aria-label="Start Turbine Component Separation"
                  >
                    <span className="cta-icon-wrapper">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="cta-text">Explore Parts</span>
                  </button>

                  {!isPreloaded && (
                    <div className="preload-status-bar">
                      <div className="preload-track">
                        <div
                          className="preload-fill"
                          style={{ width: `${loadProgress}%` }}
                        />
                      </div>
                      <span className="preload-text">Loading technical visual assets ({loadProgress}%)</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SIDE INFORMATION DRAWER (Light Theme, verified data, credible references) */}
            {selectedPart && (
              <aside
                className="part-details-drawer"
                role="dialog"
                aria-label={`Details for ${selectedPart.name}`}
              >
                <div className="drawer-header">
                  <div className="drawer-meta">
                    <span className="drawer-badge">{selectedPart.badge}</span>
                    <span className="drawer-category">{selectedPart.category}</span>
                  </div>
                  <button
                    type="button"
                    className="drawer-close-btn"
                    onClick={() => setSelectedPart(null)}
                    aria-label="Close details panel"
                    title="Close (Esc)"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div className="drawer-body">
                  <div className="drawer-title-group">
                    <div className="drawer-part-number">COMPONENT #{selectedPart.number}</div>
                    <h3 className="drawer-part-name">{selectedPart.name}</h3>
                    <p className="drawer-role-tag">{selectedPart.shortRole}</p>
                  </div>

                  <p className="drawer-description">{selectedPart.description}</p>

                  {/* Role in this specific configuration */}
                  {selectedPart.roleInConfig && (
                    <div className="drawer-context-box">
                      <h4 className="context-title">Role in Geared Synchronous Configuration</h4>
                      <p className="context-text">{selectedPart.roleInConfig}</p>
                    </div>
                  )}

                  {/* Relationship to adjacent components */}
                  {selectedPart.adjacentComponents && (
                    <div className="drawer-context-box">
                      <h4 className="context-title">Adjacent Mechanical Interfaces</h4>
                      <p className="context-text">{selectedPart.adjacentComponents}</p>
                    </div>
                  )}

                  {/* Verified Technical Characteristics Matrix */}
                  <div className="drawer-specs-section">
                    <h4 className="specs-section-title">Technical Design Characteristics</h4>
                    <div className="specs-grid">
                      {selectedPart.specs.map((spec, i) => (
                        <div key={i} className="spec-item">
                          <span className="spec-label">{spec.label}</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Dynamics */}
                  <div className="drawer-mechanism-box">
                    <h4 className="mechanism-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7V12L15 15" strokeLinecap="round" />
                      </svg>
                      Operational Dynamics
                    </h4>
                    <p className="mechanism-text">{selectedPart.mechanism}</p>
                  </div>

                  {/* Verified External Reference Link */}
                  {selectedPart.reference && (
                    <div className="drawer-reference-box">
                      <div className="ref-source-tag">{selectedPart.reference.source}</div>
                      <h4 className="ref-title">{selectedPart.reference.title}</h4>
                      <a
                        href={selectedPart.reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="drawer-reference-link"
                      >
                        <span>{selectedPart.reference.label}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>

                {/* Drawer Footer Controls */}
                <div className="drawer-footer">
                  <div className="drawer-tour-nav">
                    <button
                      type="button"
                      className="tour-btn"
                      onClick={handlePrevPart}
                      aria-label="Inspect previous component"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      className="reset-view-btn"
                      onClick={handleResetView}
                      aria-label="Reset zoom view"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M15 3H21V9M9 21H3V15M21 3L14 10M3 21L10 14" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Overview
                    </button>
                    <button
                      type="button"
                      className="tour-btn"
                      onClick={handleNextPart}
                      aria-label="Inspect next component"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </aside>
            )}
          </div>

          {/* Bottom Interactive Controls Bar (Clean User-Facing Controls, No Frame Scrubbers) */}
          <div className="stage-controls-bar">
            <div className="controls-left">
              <button
                type="button"
                className="control-btn"
                onClick={handleAssemble}
                disabled={isAssembled && !isPlaying}
                aria-label="Assemble turbine"
                title="Assemble Turbine"
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
                aria-label="Explode turbine to separate components"
                title="Explode Components"
              >
                <span>Explode</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="controls-center">
              <div className="state-description-pill">
                <span className="state-dot" />
                <span className="state-text">
                  {isExploded
                    ? 'Subassemblies separated. Select any highlighted component to inspect.'
                    : isPlaying
                    ? 'Animating subassembly separation...'
                    : 'Turbine in fully assembled state. Click Explode to separate components.'}
                </span>
              </div>
            </div>

            <div className="controls-right">
              {selectedPart && (
                <button
                  type="button"
                  className="control-btn reset-btn"
                  onClick={handleResetView}
                  aria-label="Reset zoom to full exploded view"
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
              <h3 className="legend-title">Internal Turbine Assemblies</h3>
              <p className="legend-subtitle">
                Select an assembly below to explode the turbine view and inspect technical specifications.
              </p>
            </div>
          </div>

          <div className="legend-grid">
            {WINDMILL_PARTS.map((part) => (
              <button
                key={part.id}
                type="button"
                className={`legend-card ${selectedPart?.id === part.id ? 'active' : ''}`}
                onClick={() => {
                  if (!isExploded) {
                    startPlayback(TOTAL_FRAMES, 'forward', () => {
                      handleSelectPart(part);
                    });
                  } else {
                    handleSelectPart(part);
                  }
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
                    Inspect assembly
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
