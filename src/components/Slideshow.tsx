import React, { useEffect, useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SlideshowProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  imgClassName?: string;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

export function Slideshow({ images, autoPlay = false, interval = 4000, className, imgClassName, initialIndex = 0, onIndexChange }: SlideshowProps) {
  const [index, setIndex] = useState(initialIndex);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [forceMinHeight, setForceMinHeight] = useState<string | null>(null);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoPlay, interval, images.length]);

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  // notify parent when index changes
  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // If the parent/container doesn't provide a height, ensure slideshow is visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // check computed height; if zero, apply a sensible min-height
    const rect = el.getBoundingClientRect();
    if (rect.height === 0) {
      // default to Tailwind's h-96 (24rem) so images are visible
      setForceMinHeight('24rem');
    }
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className ?? ''}`} style={forceMinHeight ? { minHeight: forceMinHeight } : undefined}>
      <div className="w-full h-full">
        <ImageWithFallback
          src={images[index]}
          alt={`slide-${index}`}
          className={`w-full h-full object-cover ${imgClassName ?? ''}`}
          style={{ display: 'block' }}
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60"
          >
            ‹
          </button>

          <button
            aria-label="Next"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60"
          >
            ›
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Slideshow;
