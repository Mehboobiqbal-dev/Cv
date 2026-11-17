import { useEffect, useRef } from "react";

// Interactive dot grid behind the hero. Dots breathe in a slow wave and swell away from the mouse.
// Cheap by design: one canvas, ~1,500 dots, device-pixel-ratio capped at 2, the loop stops while the
// hero is off screen or the tab is hidden, and "reduce motion" visitors get one still frame.
// Colour comes from the canvas's own CSS `color`, so it follows the light/dark theme.
const GAP = 26;
const REACH = 170;

const DotField = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    // Animated only with a mouse: phones and tablets get one still frame (saves CPU and battery).
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    let colour = "148,163,184";
    let colourCheck = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const readColour = () => {
      const match = getComputedStyle(canvas).color.match(/\d+/g);
      if (match) colour = match.slice(0, 3).join(",");
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      const t = time / 1000;
      if (++colourCheck % 30 === 1) readColour();
      // ease the light toward the pointer so it trails a little
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      ctx.clearRect(0, 0, width, height);
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const wave = Math.sin(x * 0.011 + t * 0.9) * Math.cos(y * 0.013 + t * 0.7);
          let px = x;
          let py = y;
          let alpha = 0.16 + wave * 0.08;
          let r = 1.05;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < REACH) {
            const f = (1 - d / REACH) ** 2;
            px += (dx / (d || 1)) * f * 16;
            py += (dy / (d || 1)) * f * 16;
            alpha += f * 0.75;
            r += f * 1.6;
          }
          ctx.fillStyle = `rgba(${colour},${Math.min(alpha, 0.95)})`;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, 6.2832);
          ctx.fill();
        }
      }
    };

    const loop = (time) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = event.clientX - rect.left;
      mouse.ty = event.clientY - rect.top;
      if (mouse.x < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    readColour();
    draw(0);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas aria-hidden="true" className={`pointer-events-none ${className}`} ref={canvasRef} />;
};

export default DotField;
