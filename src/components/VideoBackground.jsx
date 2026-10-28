import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { MEDIA_CONFIG } from '../config/media';

/**
 * VideoBackground Component
 * 
 * Implements a dual-channel crossfading video player to achieve seamless,
 * stutter-free continuous looping of the wind farm footage.
 * 
 * Standard HTML5 `<video loop>` stutters and jumps at loop boundaries due to seek latency
 * and non-matching endpoints. By alternating between two synchronized video instances
 * with a 1.2-second crossfade window, the transition is smooth and imperceptible.
 */
const VideoBackground = memo(function VideoBackground() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  // 'v1' is active, 'v2' is standby, or crossfading between them
  const [activeChannel, setActiveChannel] = useState(1);
  const [v1Loaded, setV1Loaded] = useState(false);
  const [v2Loaded, setV2Loaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const CROSSFADE_WINDOW = 1.2; // seconds before end to initiate crossfade

  // Initialize playback on mount
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;

    if (v1) {
      v1.muted = true;
      v1.defaultMuted = true;
      v1.playsInline = true;
      const playPromise = v1.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setV1Loaded(true))
          .catch(() => {
            // Autoplay deferred or blocked; poster fallback handles display
          });
      }
    }

    if (v2) {
      v2.muted = true;
      v2.defaultMuted = true;
      v2.playsInline = true;
    }
  }, []);

  // Time update listener on Video 1
  const handleV1TimeUpdate = useCallback(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2 || !v1.duration) return;

    // When V1 approaches end, trigger V2 crossfade in
    if (activeChannel === 1 && v1.currentTime >= v1.duration - CROSSFADE_WINDOW) {
      v2.currentTime = 0;
      const p = v2.play();
      if (p !== undefined) {
        p.then(() => {
          setV2Loaded(true);
          setActiveChannel(2);
        }).catch(() => {});
      } else {
        setActiveChannel(2);
      }
    }
  }, [activeChannel]);

  // Time update listener on Video 2
  const handleV2TimeUpdate = useCallback(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2 || !v2.duration) return;

    // When V2 approaches end, trigger V1 crossfade in
    if (activeChannel === 2 && v2.currentTime >= v2.duration - CROSSFADE_WINDOW) {
      v1.currentTime = 0;
      const p = v1.play();
      if (p !== undefined) {
        p.then(() => {
          setActiveChannel(1);
        }).catch(() => {});
      } else {
        setActiveChannel(1);
      }
    }
  }, [activeChannel]);

  return (
    <div className="global-video-background" aria-hidden="true">
      {!hasError ? (
        <>
          {/* Video Channel 1 */}
          <video
            ref={video1Ref}
            className={`bg-video-element ${activeChannel === 1 ? 'channel-active' : 'channel-standby'} ${
              v1Loaded ? 'loaded' : ''
            }`}
            src={MEDIA_CONFIG.videoSrc}
            poster={MEDIA_CONFIG.posterSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleV1TimeUpdate}
            onCanPlay={() => setV1Loaded(true)}
            onError={() => setHasError(true)}
          >
            <source src={MEDIA_CONFIG.videoSrc} type="video/mp4" />
          </video>

          {/* Video Channel 2 (Seamless Crossfade Buffer) */}
          <video
            ref={video2Ref}
            className={`bg-video-element ${activeChannel === 2 ? 'channel-active' : 'channel-standby'} ${
              v2Loaded ? 'loaded' : ''
            }`}
            src={MEDIA_CONFIG.videoSrc}
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleV2TimeUpdate}
            onCanPlay={() => setV2Loaded(true)}
          >
            <source src={MEDIA_CONFIG.videoSrc} type="video/mp4" />
          </video>
        </>
      ) : (
        <img
          src={MEDIA_CONFIG.posterSrc}
          alt={MEDIA_CONFIG.altText}
          className="bg-video-element loaded channel-active"
        />
      )}

      {/* Atmospheric scrim layer tuned to match the sky and mountain palette */}
      <div className="bg-atmosphere-overlay" />
    </div>
  );
});

export default VideoBackground;
