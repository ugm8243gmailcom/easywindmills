import { useState, useEffect } from 'react';

/**
 * PageTransition Component
 * 
 * Displays a light-blue screen with a centered white windmill.
 * Wind streams animate from right to left, turning the windmill blades,
 * and the entire transition screen slides smoothly towards the left.
 * Total duration: ~1 second.
 */
export default function PageTransition({ onComplete }) {
  const [phase, setPhase] = useState('active'); // 'active' -> 'exiting' -> 'done'

  useEffect(() => {
    // Stage 1: Wind rushes in and turns windmill (0 to 600ms)
    // Stage 2: Slide entire transition page off to the left (600ms to 1050ms)
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 620);

    const completeTimer = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 1050);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div 
      className={`page-transition-overlay ${phase === 'exiting' ? 'slide-left' : ''}`}
      aria-label="Loading animation"
      role="status"
    >
      <div className="transition-content">
        {/* Wind lines streaming from right to left */}
        <div className="wind-streams-container" aria-hidden="true">
          <div className="wind-gust wind-gust-1" />
          <div className="wind-gust wind-gust-2" />
          <div className="wind-gust wind-gust-3" />
        </div>

        {/* Central White Windmill */}
        <div className="transition-windmill" aria-hidden="true">
          {/* Rotating Blades */}
          <div className="windmill-rotor">
            <svg 
              className="windmill-blades-svg" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Blade 1 (0 deg) */}
              <path 
                d="M50 50 C48 35, 47 15, 50 4 C53 15, 52 35, 50 50 Z" 
                fill="#ffffff" 
              />
              {/* Blade 2 (120 deg) */}
              <path 
                d="M50 50 C38 58, 20 68, 10 74 C21 78, 39 70, 50 50 Z" 
                fill="#ffffff" 
              />
              {/* Blade 3 (240 deg) */}
              <path 
                d="M50 50 C62 58, 80 68, 90 74 C79 78, 61 70, 50 50 Z" 
                fill="#ffffff" 
              />
              {/* Center Hub */}
              <circle cx="50" cy="50" r="4.5" fill="#ffffff" />
              <circle cx="50" cy="50" r="2.5" fill="#e8f3fa" />
            </svg>
          </div>

          {/* Windmill Tower Mast */}
          <svg 
            className="windmill-tower-svg" 
            viewBox="0 0 40 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tapered tower */}
            <path 
              d="M18 0 L22 0 L25 120 L15 120 Z" 
              fill="#ffffff" 
            />
            {/* Base platform */}
            <rect x="12" y="116" width="16" height="4" rx="2" fill="#ffffff" />
          </svg>
        </div>
      </div>
    </div>
  );
}
