"use client";

import React, { useEffect, useRef, useState, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

class StarfieldErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

interface StarGroupProps {
  prefersReducedMotion: boolean;
}

function StarScene({ prefersReducedMotion }: StarGroupProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [prefersReducedMotion]);

  useFrame(() => {
    if (prefersReducedMotion || !groupRef.current) return;

    const targetX = -mouse.current.y * 0.05;
    const targetY = mouse.current.x * 0.05;

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={100}
        depth={60}
        count={1800}
        factor={3.5}
        saturation={0}
        fade
        speed={prefersReducedMotion ? 0 : 0.4}
      />
    </group>
  );
}

export default function Starfield() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      <StarfieldErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 1] }}
          gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          dpr={[1, 1.5]}
        >
          <StarScene prefersReducedMotion={prefersReducedMotion} />
        </Canvas>
      </StarfieldErrorBoundary>
    </div>
  );
}
