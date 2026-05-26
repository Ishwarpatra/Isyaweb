import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  target: string | number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ target, duration = 2000, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const nodeRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    const animate = () => {
      const targetStr = String(target);
      const targetNum = parseInt(targetStr.replace(/,/g, ""), 10);
      const suffix = targetStr.replace(/[0-9,]/g, "");
      
      if (isNaN(targetNum)) {
        setDisplayValue(targetStr);
        return;
      }

      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentCount = Math.floor(progress * targetNum);
        
        setDisplayValue(
          currentCount.toLocaleString() + suffix
        );

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={nodeRef} className={className} aria-live="polite">
      {displayValue}
    </span>
  );
}
