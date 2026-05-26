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
const CURSOR_RADIUS_SQ = CURSOR_RADIUS * CURSOR_RADIUS;

// Pre-allocated reusable array — ZERO GC pressure per frame.
// We reset its length to 0 each frame instead of allocating a new [].
const nearbyParticles: Particle[] = [];

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const active = useRef(false);
  const isIntersecting = useRef(false);

  // Cache the matchMedia object so we can add a change listener (not just a one-off .matches check)
  const reducedMotionMQ = useRef<MediaQueryList | null>(null);

  const initParticles = (width: number, height: number) => {
    const count = width < 768 ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;
    const prefersReducedMotion = reducedMotionMQ.current?.matches ?? false;

    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.15,
      vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  };

  const draw = useCallback((timestamp: number = 0) => {
    if (!active.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = reducedMotionMQ.current?.matches ?? false;

    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rectWidth = canvas.width / dpr;
      const rectHeight = canvas.height / dpr;

      ctx.clearRect(0, 0, rectWidth, rectHeight);

      const pts = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Draw connections near cursor using Spatial Hash Grid
      if (!prefersReducedMotion && mx !== null && my !== null && pts.length > 0) {
        const grid: { [key: string]: Particle[] } = {};
        const cellSize = CURSOR_RADIUS;

        for (const p of pts) {
          const cellX = Math.floor(p.x / cellSize);
          const cellY = Math.floor(p.y / cellSize);
          const key = `${cellX},${cellY}`;
          if (!grid[key]) grid[key] = [];
          grid[key].push(p);
        }

        const cellX = Math.floor(mx / cellSize);
        const cellY = Math.floor(my / cellSize);

        // Reuse the pre-allocated array — no heap allocation on hot path
        nearbyParticles.length = 0;

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const key = `${cellX + dx},${cellY + dy}`;
            const cellParticles = grid[key];
            if (cellParticles) {
              for (const p of cellParticles) {
                const pdx = p.x - mx;
                const pdy = p.y - my;
                if (pdx * pdx + pdy * pdy < CURSOR_RADIUS_SQ) {
                  nearbyParticles.push(p);
                }
              }
            }
          }
        }

        if (nearbyParticles.length > 1) {
          for (let i = 0; i < nearbyParticles.length; i++) {
            const p = nearbyParticles[i];
            const dx = p.x - mx;
            const dy = p.y - my;
            const distToCursorSq = dx * dx + dy * dy;

            for (let j = i + 1; j < nearbyParticles.length; j++) {
              const q = nearbyParticles[j];
              const ex = q.x - mx;
              const ey = q.y - my;
              const distToCursorSq2 = ex * ex + ey * ey;

              if (distToCursorSq2 < CURSOR_RADIUS_SQ) {
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
        if (!prefersReducedMotion && mx !== null && my !== null) {
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

        if (!prefersReducedMotion) {
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = rectWidth;
          if (p.x > rectWidth) p.x = 0;
          if (p.y < 0) p.y = rectHeight;
          if (p.y > rectHeight) p.y = 0;
        }

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

    if (prefersReducedMotion) {
      active.current = false;
      return;
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up the media query object ONCE and keep a ref — lets us listen for live changes
    reducedMotionMQ.current = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // User just turned on reduced-motion: kill the loop, draw one static frame
        active.current = false;
        cancelAnimationFrame(animRef.current);
        // Re-init particles with zero velocity, then draw one frame
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        initParticles(w, h);
        active.current = true;
        draw();
        active.current = false;
      } else if (isIntersecting.current && !document.hidden) {
        // User just turned off reduced-motion: resume the loop
        active.current = true;
        animRef.current = requestAnimationFrame(draw);
      }
    };

    reducedMotionMQ.current.addEventListener("change", handleReducedMotionChange);

    const prefersReducedMotion = reducedMotionMQ.current.matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      // Guard against 0-width: canvas may be hidden (display:none parent)
      // Use getBoundingClientRect which returns 0 only if truly invisible,
      // and fall back to window dimensions only when genuinely full-bleed.
      const rect = canvas.getBoundingClientRect();
      const rectWidth = rect.width > 0 ? rect.width : (canvas.offsetWidth > 0 ? canvas.offsetWidth : window.innerWidth);
      const rectHeight = rect.height > 0 ? rect.height : (canvas.offsetHeight > 0 ? canvas.offsetHeight : window.innerHeight);

      canvas.width = rectWidth * dpr;
      canvas.height = rectHeight * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      initParticles(rectWidth, rectHeight);

      if (prefersReducedMotion) {
        active.current = true;
        draw();
        active.current = false;
      }
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    let prevWidth = window.innerWidth;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        // Skip trivial height-only changes (iOS address bar show/hide)
        if (Math.abs(newWidth - prevWidth) > 50) {
          prevWidth = newWidth;
          resize();
        } else if (Math.abs(canvas.getBoundingClientRect().height - canvas.height / (window.devicePixelRatio || 1)) > 50) {
          resize();
        }
      }, 150);
    };

    // Initial render: defer by one rAF to guarantee the DOM has painted and
    // `getBoundingClientRect()` returns real dimensions (not 0).
    requestAnimationFrame(() => {
      resize();
      if (!prefersReducedMotion && isIntersecting.current && !document.hidden) {
        active.current = true;
        animRef.current = requestAnimationFrame(draw);
      }
    });

    window.addEventListener("resize", handleResize);

    // Mouse events
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouse.current = { x: null, y: null };
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mouse.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mouse.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      }
    };
    const onTouchEnd = () => {
      mouse.current = { x: null, y: null };
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });

    // Pause animation loop when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        active.current = false;
        cancelAnimationFrame(animRef.current);
      } else {
        const preferReduced = reducedMotionMQ.current?.matches ?? false;
        if (isIntersecting.current && !active.current && !preferReduced) {
          active.current = true;
          animRef.current = requestAnimationFrame(draw);
        } else if (isIntersecting.current && preferReduced) {
          active.current = true;
          draw();
          active.current = false;
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.current = entry.isIntersecting;
        const preferReduced = reducedMotionMQ.current?.matches ?? false;
        if (entry.isIntersecting && !document.hidden) {
          if (!active.current && !preferReduced) {
            active.current = true;
            animRef.current = requestAnimationFrame(draw);
          } else if (preferReduced) {
            active.current = true;
            draw();
            active.current = false;
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
      clearTimeout(resizeTimeout);
      reducedMotionMQ.current?.removeEventListener("change", handleReducedMotionChange);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
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
