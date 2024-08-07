import { useState, useEffect } from "react";
import { useAnimationFrame } from "framer-motion";

const LoadingComponent = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useAnimationFrame((t) => {
    if (ref === null) return;
    const rotate = Math.sin(t / 10000) * 200;
    const y = (1 + Math.sin(t / 1000)) * -50;
    const x = (1 + Math.cos(t / 1000)) * -50;
    ref.style.transform = `rotateX(${rotate}deg) rotateY(${rotate}deg) translate3d(${x}px, ${y}px, 0)`;
  });

  return (
    <div className="container">
      <div className="cube inset-60" ref={setRef}>
        <div className="side front">Loading...</div>
        <div className="side left" />
        <div className="side right" />
        <div className="side top" />
        <div className="side bottom" />
        <div className="side back" />
      </div>
    </div>
  );
};

export default LoadingComponent;
