import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

function parseTarget(t: string): { number: number; suffix: string } {
  const match = t.match(/^([\d,]+)(.*)$/);
  if (!match) return { number: 0, suffix: t };
  return { number: parseInt(match[1].replace(/,/g, "")), suffix: match[2] };
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

const HEX = "0123456789";

export function AnimatedCounter({
  target,
  duration = 1800,
  className,
  style,
}: AnimatedCounterProps) {
  const { number: targetNum, suffix } = parseTarget(target);
  const [value, setValue] = useState("000");
  const [locked, setLocked] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          let start: number | null = null;

          // Rapid scramble phase (first 60% of duration)
          const scrambleDuration = duration * 0.6;
          const scrambleInterval = setInterval(() => {
            const digits = String(targetNum).length;
            setValue(
              Array.from({ length: digits }, () =>
                HEX[Math.floor(Math.random() * HEX.length)]
              ).join("")
            );
          }, 50);

          setTimeout(() => {
            clearInterval(scrambleInterval);

            // Count-up phase
            const countStart = performance.now();
            const countDuration = duration * 0.4;

            const tick = (now: number) => {
              if (!start) start = now;
              const p = Math.min((now - countStart) / countDuration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(formatNumber(Math.floor(eased * targetNum)));

              if (p < 1) {
                requestAnimationFrame(tick);
              } else {
                setValue(formatNumber(targetNum));
                setLocked(true);
              }
            };
            requestAnimationFrame(tick);
          }, scrambleDuration);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetNum, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      <span
        style={{
          fontFamily: locked ? "inherit" : "'JetBrains Mono', monospace",
          transition: "font-family 300ms",
        }}
      >
        {value}
      </span>
      {suffix}
    </span>
  );
}
