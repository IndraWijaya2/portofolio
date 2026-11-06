"use client";

import React, { useState, useEffect, Suspense, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import * as THREE from "three";

class GlobeErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.warn("Globe 3D WebGL context issue:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-sky-950/60 via-blue-900/40 to-indigo-950/50 border border-sky-400/20 shadow-[0_0_80px_rgba(56,189,248,0.2)] flex items-center justify-center">
          <div className="w-4/5 h-4/5 rounded-full bg-sky-400/10 blur-xl" />
        </div>
      );
    }
    return this.props.children;
  }
}

// Preload tekstur bumi agar langsung diunduh paralel sejak inisialisasi modul
useTexture.preload("/textures/earth.jpg");

function EarthFallbackMesh() {
  return (
    <mesh>
      <sphereGeometry args={[2.0, 32, 32]} />
      <meshStandardMaterial color="#0c1938" roughness={0.7} />
    </mesh>
  );
}

/**
 * Komponen Bumi 3D
 * Ditata dengan rotasi statis sesuai penyesuaian: [0.1, 2.7, -0.2]
 * Gradasi multi-lapisan mikro eksponensial untuk transisi cahaya sehalus sutra.
 */
function EarthMesh() {
  const texture = useTexture("/textures/earth.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  const EARTH_RADIUS = 2.0;

  // Sudut rotasi statis yang sudah disesuaikan
  const EARTH_ROTATION: [number, number, number] = [0.1, 2.7, -0.2];

  return (
    <group rotation={EARTH_ROTATION}>
      {/* Bola Bumi 3D Utama */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.65}
          metalness={0.08}
        />
      </mesh>

      {/* 
        GRADASI ATMOSFER MULTI-LAYER SUPER HALUS (EXPONENTIAL SOFT BLEND)
        Menghilangkan garis tajam di bibir globe (shadow terdalam)
        dengan transisi peluruhan opasitas rapat bertahap.
      */}

      {/* Lapisan 0: Kontak Permukaan Langsung */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS * 1.004, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.09}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Lapisan 1: Pendaran Bibir Dalam */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS * 1.012, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.075}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Lapisan 2: Halo Dalam */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS * 1.025, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Lapisan 3: Halo Tengah */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS * 1.045, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Lapisan 4: Halo Luar */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS * 1.072, 64, 64]} />
        <meshBasicMaterial
          color="#f8fafc"
          transparent
          opacity={0.018}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Lapisan 5: Peluruhan Luar Angkasa (Fading Lembut) */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS * 1.108, 64, 64]} />
        <meshBasicMaterial
          color="#f1f5f9"
          transparent
          opacity={0.007}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function Globe() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Efek naik ke atas saat di-scroll ke bawah (translasi Y negatif terikat scroll)
  const rawY = useTransform(scrollY, (val) => (prefersReducedMotion ? 0 : -val * 0.45));
  const smoothY = useSpring(rawY, { stiffness: 100, damping: 25, mass: 0.8 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="fixed top-16 -right-20 w-[330px] h-[330px] sm:top-auto sm:-bottom-40 sm:-right-32 sm:w-[560px] sm:h-[560px] pointer-events-none z-[1]"
      >
        <div className="w-full h-full rounded-full bg-sky-500/[0.04] blur-3xl" />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ y: smoothY }}
      className="
        pointer-events-none select-none z-[1] overflow-visible
        fixed 
        /* Di HP (< 640px): Posisi kanan atas sejajar Hero agar langsung terlihat */
        top-16 -right-20
        w-[330px] h-[330px] opacity-75
        /* Di Tablet (sm & md): Posisi sudut kanan bawah */
        sm:opacity-85 sm:top-auto sm:-bottom-40 sm:-right-32 sm:w-[560px] sm:h-[560px] sm:max-w-none sm:max-h-none
        md:-bottom-48 md:-right-36 md:w-[680px] md:h-[680px]
        /* Di Desktop (lg, xl, 2xl): Posisi sudut kanan bawah dengan ukuran besar */
        lg:opacity-100 lg:-bottom-56 lg:-right-36 lg:w-[820px] lg:h-[820px]
        xl:-bottom-64 xl:-right-32 xl:w-[980px] xl:h-[980px]
        2xl:-bottom-76 2xl:-right-32 2xl:w-[1100px] 2xl:h-[1100px]
        will-change-transform
      "
    >
      {/* Pendaran kosmik multi-stop yang meluruh halus mengikuti lengkungan bola bumi */}
      <div 
        className="absolute inset-[-18%] rounded-full blur-[130px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.015) 55%, rgba(255,255,255,0.004) 75%, transparent 100%)"
        }}
      />
      <div 
        className="absolute inset-[-6%] rounded-full blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.005) 70%, transparent 100%)"
        }}
      />

      {/* Jarak kamera 6.0 memberikan ruang lega di dalam canvas agar atmosfer 3D tidak terpotong garis tepi */}
      <GlobeErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 6.0], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "default",
          }}
          dpr={[1, 1.5]}
          className="overflow-visible"
        >
          <ambientLight intensity={0.4} color="#111827" />
          <directionalLight
            position={[3.5, 3, 4]}
            intensity={2.6}
            color="#ffffff"
          />
          <directionalLight
            position={[-4, -2, -3]}
            intensity={0.25}
            color="#f1f5f9"
          />

          <Suspense fallback={<EarthFallbackMesh />}>
            <EarthMesh />
          </Suspense>
        </Canvas>
      </GlobeErrorBoundary>
    </motion.div>
  );
}
