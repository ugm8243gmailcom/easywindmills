import { useState, useRef, useEffect, memo } from 'react';
import { MEDIA_CONFIG } from '../config/media';

// Memoized to ensure the video does not restart simply because a parent component rerenders
const VideoSection = memo(function VideoSection() {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      // Ensure autoplay starts quietly and safely across modern browsers
      videoEl.play().catch(() => {
        // Autoplay may be restricted; fallback gracefully without throwing
      });
    }
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="content-container">
        {/* Understated introductory header */}
        <div className="hero-header">
          <h1 className="hero-headline">{MEDIA_CONFIG.headline}</h1>
          <p className="hero-subline">{MEDIA_CONFIG.subline}</p>
        </div>

        {/* Video presentation */}
        <div className="video-container">
          {!videoError ? (
            <video
              ref={videoRef}
              className="wind-video"
              src={MEDIA_CONFIG.videoSrc}
              poster={MEDIA_CONFIG.posterSrc}
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoError(true)}
              aria-label={MEDIA_CONFIG.altText}
            >
              <track kind="captions" />
              {/* Fallback image inside video element */}
              <img
                src={MEDIA_CONFIG.posterSrc}
                alt={MEDIA_CONFIG.altText}
                className="video-fallback-img"
              />
            </video>
          ) : (
            <img
              src={MEDIA_CONFIG.posterSrc}
              alt={MEDIA_CONFIG.altText}
              className="video-fallback-img"
            />
          )}
        </div>
      </div>
    </section>
  );
});

export default VideoSection;
