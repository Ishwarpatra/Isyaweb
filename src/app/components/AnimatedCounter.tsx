import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ target, suffix = "", duration = 2000, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const nodeRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayValue(target.toLocaleString() + suffix);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.15 }
    );

    let timer: ReturnType<typeof setTimeout>;
    if (nodeRef.current) {
      timer = setTimeout(() => {
        if (nodeRef.current) {
          observer.observe(nodeRef.current);
        }
      }, 300);
    }

    const animate = () => {
      let startTimestamp: number | null = null;

      const easeOutQuad = (x: number): number => {
        return 1 - (1 - x) * (1 - x);
      };

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progressRaw = Math.min(elapsed / duration, 1);
        const progress = easeOutQuad(progressRaw);
        
        const currentCount = Math.floor(progress * target);
        
        setDisplayValue(
          currentCount.toLocaleString() + suffix
        );

        if (progressRaw < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayValue(target.toLocaleString() + suffix);
        }
      };

      window.requestAnimationFrame(step);
    };

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [target, suffix, duration]);

  return (
    <span ref={nodeRef} className={className} aria-live="polite">
      {displayValue}
    </span>
  );
}
