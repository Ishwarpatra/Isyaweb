import { useEffect, useRef, useState } from "react";

const HEX_CHARS = "0123456789ABCDEF";
const DECODE_DURATION = 700;
const TICK_INTERVAL = 40;

function randomHex(len: number) {
  return Array.from({ length: len }, () =>
    HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]
  ).join("");
}

interface TextDecodeProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export function TextDecode({ text, className, style, delay = 0 }: TextDecodeProps) {
  const [displayed, setDisplayed] = useState(() => randomHex(text.length));
  const [done, setDone] = useState(false);
  const startTime = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTime.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - (startTime.current ?? 0);
        const progress = Math.min(elapsed / DECODE_DURATION, 1);
        const lockedChars = Math.floor(progress * text.length);

        setDisplayed(
          text.slice(0, lockedChars) +
          randomHex(text.length - lockedChars)
        );

        if (progress >= 1) {
          setDisplayed(text);
          setDone(true);
          clearInterval(timerRef.current!);
        }
      }, TICK_INTERVAL);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, delay]);

  return (
    <span
      className={className}
      style={{
        ...style,
        fontFamily: done ? "inherit" : "'JetBrains Mono', monospace",
        letterSpacing: done ? "inherit" : "0.02em",
        transition: "font-family 200ms ease",
      }}
    >
      {displayed}
    </span>
  );
}
