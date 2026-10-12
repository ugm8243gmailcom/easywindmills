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
  const [playbackDirection, setPlaybackDirection] = useState('forward'); // 'forward' | 'reverse'
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
    setPlaybackDirection(direction);
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

  // Stop any active animation
  const pausePlayback = useCallback(() => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // User triggers "Explore Parts" initial explosion
  const handleExploreClick = () => {
    setHasStarted(true);
    startPlayback(TOTAL_FRAMES, 'forward');
  };

  // Re-collapse back to frame 1
  const handleCollapse = () => {
    setSelectedPart(null);
    startPlayback(1, 'reverse');
  };

  // Re-explode to frame 50
  const handleExplode = () => {
    setSelectedPart(null);
    startPlayback(TOTAL_FRAMES, 'forward');
  };

  // Toggle play/pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      if (currentFrame >= TOTAL_FRAMES) {
        // If at end, rewind and play again, or reverse
        startPlayback(1, 'reverse');
      } else {
        startPlayback(TOTAL_FRAMES, 'forward');
      }
    }
  };

  // Scrub slider change
  const handleScrubChange = (e) => {
    pausePlayback();
    setSelectedPart(null);
    const frame = parseInt(e.target.value, 10);
    setCurrentFrame(frame);
    if (frame > 1) {
      setHasStarted(true);
    }
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

  // Hotspots are fully visible when currentFrame === 50
  const isExploded = currentFrame === TOTAL_FRAMES;
  const showHotspots = isExploded && !isPlaying;

  return (
    <section className="explore-section" id="explore" aria-label="Interactive Windmill Exploration">
      <div className="content-container">
        {/* Section Header */}
        <div className="explore-header">
          <div className="explore-eyebrow">
            <span className="eyebrow-dot" />
            <span>INTERACTIVE 3D ANATOMY</span>
          </div>
          <h2 className="explore-title">Explore Windmill Parts</h2>
          <p className="explore-subtitle">
            Witness the internal engineering of a multi-megawatt wind turbine. Scrub through the 50-frame 
            explosion sequence or click key separated components to inspect their mechanical role.
          </p>
        </div>

        {/* Main Interactive Stage Card */}
        <div className="explore-stage-card" ref={stageRef}>
          {/* Top Status & Quick Pill Bar */}
          <div className="stage-top-bar">
            <div className="stage-status-indicator">
              <span className={`status-pill ${isExploded ? 'status-pill--active' : ''}`}>
                <span className="status-dot" />
                {isExploded
                  ? 'Exploded View • Hotspots Active'
                  : isPlaying
                  ? `Expanding Components... Frame ${currentFrame}/${TOTAL_FRAMES}`
                  : `Frame ${currentFrame} of ${TOTAL_FRAMES} (Scrub to 50)`}
              </span>
            </div>

            {/* Quick Part Pills (active when exploded) */}
            {isExploded && (
              <div className="stage-part-pills" role="tablist" aria-label="Exploded turbine components">
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
            {/* Zoomable Container Layer - Uses smooth CSS transition: transform 0.5s ease */}
            <div
              className={`stage-zoom-layer ${selectedPart ? 'is-zoomed' : ''}`}
              style={{
                transformOrigin: selectedPart
                  ? `${selectedPart.zoom.x}% ${selectedPart.zoom.y}%`
                  : '50% 50%',
                transform: selectedPart ? `scale(${selectedPart.zoom.scale})` : 'scale(1)'
              }}
              onClick={(e) => {
                // If clicked on empty stage while zoomed, reset zoom
                if (selectedPart && e.target === e.currentTarget) {
                  setSelectedPart(null);
                }
              }}
            >
              {/* HTML5 Canvas for performant frame scrubbing */}
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="explore-canvas"
                aria-label="3D Windmill Explosion Animation Frame"
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
                      {/* Outer animated radar pulse ring */}
                      <span className="hotspot-pulse-ring" aria-hidden="true" />
                      <span className="hotspot-pulse-ring-2" aria-hidden="true" />

                      {/* Center Beacon Pin */}
                      <span className="hotspot-beacon">
                        <span className="hotspot-beacon-core" />
                        <span className="hotspot-beacon-number">{part.number}</span>
                      </span>

                      {/* Tooltip Label Badge (Scales in on hover or select) */}
                      <span className="hotspot-label-badge">
                        <span className="label-category">{part.category}</span>
                        <span className="label-name">{part.name}</span>
                        <span className="label-action">Click to zoom in →</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* INITIAL STATE OVERLAY: "Explore Parts" CTA */}
            {!hasStarted && currentFrame === 1 && (
              <div className="initial-overlay">
                <div className="initial-overlay-backdrop" />
                <div className="initial-card">
                  <div className="initial-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Full Turbine Disassembly</span>
                  </div>
                  <h3 className="initial-title">Internal Turbine Mechanics</h3>
                  <p className="initial-description">
                    Click below to trigger the 50-frame exploded view sequence and interact with the
                    separated rotor, shaft, generator, yaw drive, and nacelle housing.
                  </p>

                  <button
                    type="button"
                    className="explore-cta-btn"
                    onClick={handleExploreClick}
                    aria-label="Start Turbine Explosion Animation"
                  >
                    <span className="cta-icon-wrapper">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M5 3L19 12L5 21V3Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="cta-text">Explore Parts</span>
                    <span className="cta-badge">50 Frames</span>
                  </button>

                  {!isPreloaded && (
                    <div className="preload-status-bar">
                      <div className="preload-track">
                        <div
                          className="preload-fill"
                          style={{ width: `${loadProgress}%` }}
                        />
                      </div>
                      <span className="preload-text">Preloading 3D frames ({loadProgress}%)</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DESCRIPTIVE MODAL / SIDE-PANEL (Zoom & Describe State) */}
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
                    aria-label="Close details and reset view"
                    title="Reset View (Esc)"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
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

                  {/* Technical Specifications Matrix */}
                  <div className="drawer-specs-section">
                    <h4 className="specs-section-title">Technical Specifications</h4>
                    <div className="specs-grid">
                      {selectedPart.specs.map((spec, i) => (
                        <div key={i} className="spec-item">
                          <span className="spec-label">{spec.label}</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Mechanism */}
                  <div className="drawer-mechanism-box">
                    <h4 className="mechanism-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      Operational Dynamics
                    </h4>
                    <p className="mechanism-text">{selectedPart.mechanism}</p>
                  </div>
                </div>

                {/* Drawer Footer Controls */}
                <div className="drawer-footer">
                  <div className="drawer-tour-nav">
                    <button
                      type="button"
                      className="tour-btn"
                      onClick={handlePrevPart}
                      aria-label="Previous component"
                      title="Inspect Previous Part"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      className="reset-view-btn"
                      onClick={() => setSelectedPart(null)}
                      aria-label="Reset view to fully exploded overview"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M15 3H21V9M9 21H3V15M21 3L14 10M3 21L10 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Reset View
                    </button>
                    <button
                      type="button"
                      className="tour-btn"
                      onClick={handleNextPart}
                      aria-label="Next component"
                      title="Inspect Next Part"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </aside>
            )}
          </div>

          {/* Bottom Interactive Playback & Scrubber Controls */}
          <div className="stage-controls-bar">
            {/* Play / Pause / Replay Buttons */}
            <div className="controls-left">
              <button
                type="button"
                className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Pause frame sequence' : 'Play explosion sequence'}
                title={isPlaying ? 'Pause' : 'Play / Rewind'}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4L19 12L6 20V4Z" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                className="control-btn"
                onClick={handleCollapse}
                disabled={currentFrame === 1 && !isPlaying}
                aria-label="Assemble turbine back to frame 1"
                title="Assemble Turbine (Frame 1)"
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
                disabled={currentFrame === TOTAL_FRAMES && !isPlaying}
                aria-label="Explode turbine to frame 50"
                title="Explode Turbine (Frame 50)"
              >
                <span>Explode</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Interactive Timeline Scrubber Slider */}
            <div className="controls-center">
              <span className="scrub-label scrub-label-start">Frame 1</span>
              <div className="scrub-slider-wrapper">
                <input
                  type="range"
                  min="1"
                  max={TOTAL_FRAMES}
                  value={currentFrame}
                  onChange={handleScrubChange}
                  className="scrub-slider"
                  aria-label="Scrub through 50 explosion frames"
                />
                <div
                  className="scrub-fill-bar"
                  style={{ width: `${((currentFrame - 1) / (TOTAL_FRAMES - 1)) * 100}%` }}
                />
              </div>
              <span className="scrub-label scrub-label-end">Frame 50 (Hotspots)</span>
            </div>

            {/* Frame Counter Indicator */}
            <div className="controls-right">
              <span className="frame-counter-pill">
                <span className="counter-current">{String(currentFrame).padStart(2, '0')}</span>
                <span className="counter-divider">/</span>
                <span className="counter-total">{TOTAL_FRAMES}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Reference Grid Below Stage */}
        <div className="explore-parts-legend">
          <div className="legend-header">
            <h3 className="legend-title">Internal Turbine Assemblies</h3>
            <span className="legend-note">Click any assembly below to automatically explode & zoom</span>
          </div>

          <div className="legend-grid">
            {WINDMILL_PARTS.map((part) => (
              <button
                key={part.id}
                type="button"
                className={`legend-card ${selectedPart?.id === part.id ? 'active' : ''}`}
                onClick={() => {
                  if (currentFrame !== TOTAL_FRAMES) {
                    startPlayback(TOTAL_FRAMES, 'forward', () => {
                      handleSelectPart(part);
                    });
                  } else {
                    handleSelectPart(part);
                  }
                  // Smoothly scroll stage into view if needed
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
                    Inspect component
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
