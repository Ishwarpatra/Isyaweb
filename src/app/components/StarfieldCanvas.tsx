import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

const COLORS = ["#EC4899", "#3B82F6", "#FFFFFF", "#F97316", "#10B981"];
const DESKTOP_PARTICLE_COUNT = 120;
const MOBILE_PARTICLE_COUNT = 40;
const CURSOR_RADIUS = 100;

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const active = useRef(false);
  const lastFrameTime = useRef<number>(0);
  const isIntersecting = useRef(false);

  const initParticles = (width: number, height: number) => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      particles.current = [];
      return;
    }

    const count = width < 768 ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;

    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  };

  const draw = useCallback((timestamp: number = 0) => {
    if (!active.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Throttle frame rate to ~60fps maximum
    const elapsed = timestamp - lastFrameTime.current;
    if (elapsed < 16) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }
    lastFrameTime.current = timestamp;

    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Draw connections near cursor
      if (mx !== null && my !== null && pts.length > 0) {
        const nearbyIndices: number[] = [];
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          const dx = p.x - mx;
          const dy = p.y - my;
          if (dx * dx + dy * dy < CURSOR_RADIUS * CURSOR_RADIUS) {
            nearbyIndices.push(i);
          }
        }

        if (nearbyIndices.length > 1) {
          for (let i = 0; i < nearbyIndices.length; i++) {
            const p = pts[nearbyIndices[i]];
            const dx = p.x - mx;
            const dy = p.y - my;
            const distToCursorSq = dx * dx + dy * dy;

            for (let j = i + 1; j < nearbyIndices.length; j++) {
              const q = pts[nearbyIndices[j]];
              const ex = q.x - mx;
              const ey = q.y - my;
              const distToCursorSq2 = ex * ex + ey * ey;

              if (distToCursorSq2 < CURSOR_RADIUS * CURSOR_RADIUS) {
                const distToCursor = Math.sqrt(distToCursorSq);
                const alpha = 0.18 * (1 - distToCursor / CURSOR_RADIUS);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(236,72,153,${alpha})`;
                ctx.lineWidth = 0.6;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // Draw and update particles
      for (const p of pts) {
        if (mx !== null && my !== null) {
          const pdx = mx - p.x;
          const pdy = my - p.y;
          const distSq = pdx * pdx + pdy * pdy;
          if (distSq < 40000 && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = ((200 - dist) / 200) * 0.0006;
            p.vx += pdx * force;
            p.vy += pdy * force;
          }
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    } catch (e) {
      console.error("Canvas draw error: ", e);
      active.current = false;
      return;
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };

    resize();
    window.addEventListener("resize", handleResize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouse.current = { x: null, y: null };
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // Page visibility check: pause animation loop when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        active.current = false;
        cancelAnimationFrame(animRef.current);
      } else {
        if (isIntersecting.current && !active.current) {
          active.current = true;
          animRef.current = requestAnimationFrame(draw);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.current = entry.isIntersecting;
        if (entry.isIntersecting && !document.hidden) {
          if (!active.current) {
            active.current = true;
            animRef.current = requestAnimationFrame(draw);
          }
        } else {
          active.current = false;
          cancelAnimationFrame(animRef.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      active.current = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none"
      style={{ willChange: "transform, contents" }}
      aria-hidden="true"
    />
  );
}
