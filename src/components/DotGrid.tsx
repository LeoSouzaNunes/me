import { useEffect, useRef, useCallback } from "react";

const DOT_RADIUS = 1.5;
const COLLISION_RADIUS = 6;
const GRID_SPACING = 44;
const BASE_ALPHA = 0.18;
const HOVER_ALPHA = 0.40;
const HOVER_RADIUS = 120;
const REPEL_STRENGTH = 12;
const GRAVITY = 0.25;
const BOUNCE_DAMPING = 0.2;
const FRICTION = 0.85;
const RETURN_SPEED = 0.08;
const SPREAD_FORCE = 0.4;
const SLEEP_THRESHOLD = 0.1;
const CELL_SIZE = COLLISION_RADIUS * 2;

interface Dot {
  gridX: number;
  gridY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface DotGridProps {
  readonly gravity?: boolean;
  readonly floorOffset?: number;
}

export function DotGrid({ gravity = false, floorOffset = 0 }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = useRef(false);
  const dotsRef = useRef<Dot[]>([]);
  const gravityRef = useRef(gravity);
  const floorOffsetRef = useRef(floorOffset);
  const initializedRef = useRef(false);

  gravityRef.current = gravity;
  floorOffsetRef.current = floorOffset;

  const buildGrid = useCallback((width: number, height: number) => {
    const dots: Dot[] = [];
    const offsetX = (width % GRID_SPACING) / 2;
    const offsetY = (height % GRID_SPACING) / 2;

    for (let x = offsetX; x <= width; x += GRID_SPACING) {
      for (let y = offsetY; y <= height; y += GRID_SPACING) {
        dots.push({ gridX: x, gridY: y, x, y, vx: 0, vy: 0 });
      }
    }
    dotsRef.current = dots;
    initializedRef.current = true;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    if (!initializedRef.current) {
      buildGrid(width, height);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    const mouse = mouseRef.current;
    const isGravity = gravityRef.current;
    const floor = height - floorOffsetRef.current - DOT_RADIUS;
    const dots = dotsRef.current;

    if (isGravity) {
      /* Build spatial hash for collision detection */
      const grid = new Map<string, Dot[]>();
      for (const dot of dots) {
        const cx = Math.floor(dot.x / CELL_SIZE);
        const cy = Math.floor(dot.y / CELL_SIZE);
        const key = `${cx},${cy}`;
        const cell = grid.get(key);
        if (cell) {
          cell.push(dot);
        } else {
          grid.set(key, [dot]);
        }
      }

      /* Apply gravity and movement */
      for (const dot of dots) {
        dot.vy += GRAVITY;
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.vx *= FRICTION;
        dot.vy *= FRICTION;

        /* Floor collision */
        if (dot.y >= floor) {
          dot.y = floor;
          if (Math.abs(dot.vy) > 1) {
            dot.vx += (Math.random() - 0.5) * 0.8;
          }
          dot.vy = -dot.vy * BOUNCE_DAMPING;
        }

        /* Wall collision */
        if (dot.x < DOT_RADIUS) {
          dot.x = DOT_RADIUS;
          dot.vx = Math.abs(dot.vx) * BOUNCE_DAMPING;
        } else if (dot.x > width - DOT_RADIUS) {
          dot.x = width - DOT_RADIUS;
          dot.vx = -Math.abs(dot.vx) * BOUNCE_DAMPING;
        }

        /* Sleep: kill tiny velocities so dots settle */
        if (Math.abs(dot.vx) < SLEEP_THRESHOLD) dot.vx = 0;
        if (Math.abs(dot.vy) < SLEEP_THRESHOLD) dot.vy = 0;
      }

      /* Resolve dot-dot collisions — position only, no velocity injection */
      for (const dot of dots) {
        const cx = Math.floor(dot.x / CELL_SIZE);
        const cy = Math.floor(dot.y / CELL_SIZE);

        for (let nx = cx - 1; nx <= cx + 1; nx++) {
          for (let ny = cy - 1; ny <= cy + 1; ny++) {
            const neighbors = grid.get(`${nx},${ny}`);
            if (!neighbors) continue;

            for (const other of neighbors) {
              if (other === dot) continue;
              const dx = dot.x - other.x;
              const dy = dot.y - other.y;
              const distSq = dx * dx + dy * dy;
              const minDist = COLLISION_RADIUS * 2;

              if (distSq < minDist * minDist && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const overlap = (minDist - dist) / 2;
                const ux = dx / dist;
                const uy = dy / dist;

                /* Push apart — position correction only */
                dot.x += ux * overlap * SPREAD_FORCE;
                dot.y += uy * overlap * SPREAD_FORCE;
                other.x -= ux * overlap * SPREAD_FORCE;
                other.y -= uy * overlap * SPREAD_FORCE;
              }
            }
          }
        }

        if (dot.y > floor) dot.y = floor;
      }
    } else {
      for (const dot of dots) {
        const dx = dot.gridX - dot.x;
        const dy = dot.gridY - dot.y;
        dot.x += dx * RETURN_SPEED;
        dot.y += dy * RETURN_SPEED;
        dot.vx = 0;
        dot.vy = 0;

        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          dot.x = dot.gridX;
          dot.y = dot.gridY;
        }
      }
    }

    /* Draw */
    for (const dot of dots) {
      let alpha = BASE_ALPHA;
      let drawX = dot.x;
      let drawY = dot.y;

      if (mouse && !prefersReducedMotion.current) {
        const ddx = dot.x - mouse.x;
        const ddy = dot.y - mouse.y;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);

        if (dist < HOVER_RADIUS && dist > 0) {
          const ratio = 1 - dist / HOVER_RADIUS;
          alpha = BASE_ALPHA + (HOVER_ALPHA - BASE_ALPHA) * ratio * ratio;

          const repel = REPEL_STRENGTH * ratio * ratio;
          drawX += (ddx / dist) * repel;
          drawY += (ddy / dist) * repel;
        }
      }

      ctx.beginPath();
      ctx.arc(drawX, drawY, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    rafRef.current = requestAnimationFrame(draw);
  }, [buildGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      buildGrid(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [draw, buildGrid]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
