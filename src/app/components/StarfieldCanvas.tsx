import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number;
  color: string;
}

const COLORS = ["#EC4899", "#3B82F6", "#FFFFFF", "#F97316", "#10B981"];
const PARTICLE_COUNT = 150;
const CURSOR_RADIUS = 100;

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const active = useRef(false);

  const initParticles = (width: number, height: number) => {
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  };

  const draw = useCallback(() => {
    if (!active.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pts = particles.current;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    // Optimization: Only check interactions if mouse is on screen
    if (mx !== null && my !== null) {
      // Spatial partitioning would be overkill for 150 particles, 
      // but we can at least avoid the nested loop when possible.
      // We only draw lines for particles near the cursor.
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

    for (const p of pts) {
      if (mx !== null && my !== null) {
        const pdx = mx - p.x;
        const pdy = my - p.y;
        const distSq = pdx * pdx + pdy * pdy;
        if (distSq < 40000 && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (200 - dist) / 200 * 0.0006;
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

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!active.current) {
            active.current = true;
            draw();
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
      observer.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none"
      aria-hidden="true"
    />
  );
}
