import { useEffect, useRef, useState } from 'react';
import { vid, poster as posterUrl, LOCAL_MEDIA } from '../media';

interface Props {
  videoId: string;
  /** Still shown before the video loads, and instead of it for reduced-motion users. */
  fallbackImage?: string;
  className?: string;
  style?: React.CSSProperties;
}

// A muted, looping background video. Loads only once it is near the screen,
// and respects the visitor's reduced-motion setting.
export function VideoLoop({ videoId, fallbackImage, className, style }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (visible && ref.current) {
      ref.current.load();
      ref.current.play().catch(() => {});
    }
  }, [visible]);

  const posterSrc = fallbackImage ?? posterUrl(videoId);

  if (reduceMotion || LOCAL_MEDIA) {
    return <img src={posterSrc} alt="" className={className} style={{ objectFit: 'cover', ...style }} />;
  }

  return (
    <video
      ref={ref}
      className={className}
      style={{ objectFit: 'cover', ...style }}
      poster={posterSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      {visible && <source src={vid(videoId)} type="video/mp4" />}
    </video>
  );
}
