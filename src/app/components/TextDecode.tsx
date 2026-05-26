import { useEffect, useState, useRef } from "react";

interface TextDecodeProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const CHARS = "0123456789ABCDEF";

export function TextDecode({ text, delay = 0, duration = 800, className = "" }: TextDecodeProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);
  const hasAnimated = useRef(false);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(startDecode, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    const startDecode = () => {
      setIsDecoding(true);
      let iteration = 0;
      const totalIterations = Math.floor(duration / 40);
      
      const interval = setInterval(() => {
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
          clearInterval(interval);
          setDisplayText(text);
          setIsDecoding(false);
        }

        iteration += 1;
      }, 40);
    };

    return () => observer.disconnect();
  }, [text, delay, duration]);

  return (
    <span ref={nodeRef} className={className} aria-label={text}>
      <span aria-hidden={isDecoding} className={isDecoding ? "font-mono opacity-80" : ""}>
        {displayText}
      </span>
      {/* Hidden static text for SEO and Screen Readers during animation */}
      {isDecoding && <span className="sr-only">{text}</span>}
    </span>
  );
}
