import { useEffect, useState, useRef } from "react";

interface TextDecodeProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const CHARS = "0123456789ABCDEF";

export function TextDecode({ text, delay = 0, duration = 800, className = "" }: TextDecodeProps) {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);
  const hasAnimated = useRef(false);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsDecoding(false);
      return;
    }

    const startDecode = () => {
      // Use requestAnimationFrame to ensure the component is actually painted in the DOM
      rafRef.current = requestAnimationFrame(() => {
        setIsDecoding(true);
        let iteration = 0;
        const totalIterations = Math.floor(duration / 40);

        intervalRef.current = setInterval(() => {
          setDisplayText((prev) =>
            text
              .split("")
              .map((char, index) => {
                if (index < (iteration / totalIterations) * text.length) {
                  return text[index];
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join("")
          );

          if (iteration >= totalIterations) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setDisplayText(text);
            setIsDecoding(false);
          }

          iteration += 1;
        }, 40);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Apply safety delay
          setTimeout(startDecode, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mounted, text, delay, duration]);

  return (
    <span ref={nodeRef} className={className} aria-live="off">
      {!mounted ? text : displayText}
    </span>
  );
}
