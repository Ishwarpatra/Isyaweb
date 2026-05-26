import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number;
  color: string;
}

const COLORS = ["#EC4899", "#3B82F6", "#FFFFFF", "#F97316", "#10B981"];

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const active = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn 150 particles
    particles.current = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      if (!active.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Draw constellation lines for nearby pairs near cursor
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const dx = p.x - mx;
        const dy = p.y - my;
        const distToCursor = Math.sqrt(dx * dx + dy * dy);

        if (distToCursor < 100) {
          for (let j = i + 1; j < pts.length; j++) {
            const q = pts[j];
            const ex = q.x - mx;
            const ey = q.y - my;
            if (Math.sqrt(ex * ex + ey * ey) < 100) {
              const alpha = 0.18 * (1 - distToCursor / 100);
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

      // Update + draw particles
      for (const p of pts) {
        // Subtle parallax pull toward cursor
        const pdx = mx - p.x;
        const pdy = my - p.y;
        const dist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.0006;
          p.vx += pdx * force;
          p.vy += pdy * force;
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    // Only animate when in viewport
    const observer = new IntersectionObserver(
      ([entry]) => { active.current = entry.isIntersecting; if (active.current) draw(); },
      { threshold: 0 }
    );
    observer.observe(canvas);

    draw();

    return () => {
      active.current = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
