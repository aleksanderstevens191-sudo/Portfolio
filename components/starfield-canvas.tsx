"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  velocity: number;
  twinkle: number;
  opacity: number;
};

const STAR_COUNT = 180;

function createStar(width: number, height: number): Star {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.7 + 0.35,
    velocity: Math.random() * 0.22 + 0.04,
    twinkle: Math.random() * Math.PI * 2,
    opacity: Math.random() * 0.7 + 0.2,
  };
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pointerX = 0;
    let pointerY = 0;

    const stars = Array.from({ length: STAR_COUNT }, () => createStar(width, height));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / width - 0.5) * 12;
      pointerY = (event.clientY / height - 0.5) * 12;
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.y += star.velocity;
        star.twinkle += 0.015;

        if (star.y > height + 8) {
          star.y = -8;
          star.x = Math.random() * width;
        }

        const shimmer = (Math.sin(star.twinkle + time * 0.00025) + 1) / 2;
        const alpha = Math.min(1, star.opacity * (0.65 + shimmer * 0.6));
        const drawX = star.x + pointerX * star.radius * 0.24;
        const drawY = star.y + pointerY * star.radius * 0.16;

        context.beginPath();
        context.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(205, 226, 255, ${alpha})`;
        context.fill();

        if (star.radius > 1.2) {
          context.beginPath();
          context.arc(drawX, drawY, star.radius * 4.2, 0, Math.PI * 2);
          context.fillStyle = `rgba(120, 172, 255, ${alpha * 0.08})`;
          context.fill();
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw(0);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20 opacity-90"
      aria-hidden="true"
    />
  );
}
