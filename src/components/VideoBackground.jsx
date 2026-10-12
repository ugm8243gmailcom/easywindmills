import { useState, useRef, useEffect, memo } from 'react';
import { MEDIA_CONFIG } from '../config/media';

/**
 * VideoBackground Component
 * 
 * Renders the seamless looping wind farm video as a full-viewport background.
 * Uses the seamless crossfaded video asset and an image fallback.
 */
const VideoBackground = memo(function VideoBackground() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted & playsInline for guaranteed autoplay on mobile and modern desktop
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setVideoLoaded(true);
        })
        .catch(() => {
          // Autoplay was blocked or deferred; poster image handles initial paint
        });
    }
  }, []);

  return (
    <div className="global-video-background" aria-hidden="true">
      {!videoError ? (
        <video
          ref={videoRef}
          className={`bg-video-element ${videoLoaded ? 'loaded' : ''}`}
          src={MEDIA_CONFIG.videoSrc}
          poster={MEDIA_CONFIG.posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src={MEDIA_CONFIG.videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          src={MEDIA_CONFIG.posterSrc}
          alt={MEDIA_CONFIG.altText}
          className="bg-video-element loaded"
        />
      )}

      {/* Atmospheric scrim layer tuned to match the sky and mountain palette */}
      <div className="bg-atmosphere-overlay" />
    </div>
  );
});

export default VideoBackground;
