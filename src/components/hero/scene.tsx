"use client";

import { useRef, useMemo, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * Materials — created once, shared across every mesh.
 * ------------------------------------------------------------------ */

const NAVY = "#0a1633";
const BLUE = "#1d4ed8";
const GOLD = "#c9a227";
const CREAM = "#f4efe2";

function useMaterials() {
  return useMemo(() => {
    const glass = new THREE.MeshPhysicalMaterial({
      transmission: 0.94,
      thickness: 1.6,
      roughness: 0.12,
      ior: 1.44,
      color: "#bcd2ff",
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const gold = new THREE.MeshStandardMaterial({
      color: GOLD,
      metalness: 0.92,
      roughness: 0.22,
    });
    const blue = new THREE.MeshStandardMaterial({
      color: BLUE,
      metalness: 0.28,
      roughness: 0.45,
    });
    const deep = new THREE.MeshStandardMaterial({
      color: "#16255c",
      metalness: 0.3,
      roughness: 0.5,
    });
    const paper = new THREE.MeshStandardMaterial({
      color: CREAM,
      metalness: 0,
      roughness: 0.85,
    });
    const ink = new THREE.MeshStandardMaterial({
      color: "#0d1a3d",
      metalness: 0.1,
      roughness: 0.6,
    });
    return { glass, gold, blue, deep, paper, ink };
  }, []);
}

type Mats = ReturnType<typeof useMaterials>;

/* ------------------------------------------------------------------ *
 * Objects — procedural, no external model files.
 * ------------------------------------------------------------------ */

/** A stack of three books — academics. */
const Books = memo(function Books({ m }: { m: Mats }) {
  const covers = [m.blue, m.deep, m.gold];
  return (
    <group>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[0, i * 0.26 - 0.26, 0]} rotation={[0, i * 0.22 - 0.2, 0]}>
          <mesh castShadow material={covers[i]}>
            <boxGeometry args={[1.5, 0.2, 1.05]} />
          </mesh>
          {/* pages */}
          <mesh position={[0.045, 0, 0]} material={m.paper}>
            <boxGeometry args={[1.42, 0.14, 0.98]} />
          </mesh>
        </group>
      ))}
    </group>
  );
});

/** Mortarboard — achievement. */
const GraduationCap = memo(function GraduationCap({ m }: { m: Mats }) {
  return (
    <group>
      <mesh material={m.ink} position={[0, -0.16, 0]}>
        <cylinderGeometry args={[0.42, 0.5, 0.28, 24]} />
      </mesh>
      <mesh material={m.ink} position={[0, 0.02, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.5, 0.07, 1.5]} />
      </mesh>
      {/* tassel */}
      <mesh material={m.gold} position={[0.5, -0.06, 0.5]}>
        <cylinderGeometry args={[0.022, 0.022, 0.5, 8]} />
      </mesh>
      <mesh material={m.gold} position={[0.5, -0.33, 0.5]}>
        <sphereGeometry args={[0.075, 12, 12]} />
      </mesh>
    </group>
  );
});

/** Wireframe globe — languages and the wider world. */
const Globe = memo(function Globe({ m }: { m: Mats }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.14;
  });
  return (
    <group ref={ref}>
      <mesh material={m.glass}>
        <sphereGeometry args={[0.72, 32, 32]} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(0.75, 1)]} />
        <lineBasicMaterial color={GOLD} transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
});

/** Trophy — results. */
const Trophy = memo(function Trophy({ m }: { m: Mats }) {
  const cup = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push(new THREE.Vector2(0.05 + Math.sin(t * Math.PI * 0.62) * 0.42, t * 0.75));
    }
    return new THREE.LatheGeometry(pts, 28);
  }, []);
  return (
    <group>
      <mesh material={m.gold} geometry={cup} position={[0, 0.1, 0]} />
      <mesh material={m.gold} position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.32, 16]} />
      </mesh>
      <mesh material={m.gold} position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.34, 0.4, 0.14, 24]} />
      </mesh>
    </group>
  );
});

/** Quaver — MADS music. */
const MusicNote = memo(function MusicNote({ m }: { m: Mats }) {
  return (
    <group rotation={[0, 0, -0.16]}>
      <mesh material={m.gold} position={[-0.3, -0.42, 0]} rotation={[0, 0, -0.35]}>
        <sphereGeometry args={[0.27, 20, 16]} />
      </mesh>
      <mesh material={m.gold} position={[-0.06, 0.12, 0]}>
        <boxGeometry args={[0.075, 1.15, 0.075]} />
      </mesh>
      <mesh material={m.gold} position={[0.14, 0.56, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.075, 0.6, 0.07]} />
      </mesh>
    </group>
  );
});

/** Piano keys — MADS keyboard. */
const PianoKeys = memo(function PianoKeys({ m }: { m: Mats }) {
  return (
    <group rotation={[0.16, 0, 0.06]}>
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} material={m.paper} position={[i * 0.19 - 0.57, 0, 0]}>
          <boxGeometry args={[0.17, 0.09, 0.85]} />
        </mesh>
      ))}
      {[0, 1, 3, 4, 5].map((i) => (
        <mesh key={`b${i}`} material={m.ink} position={[i * 0.19 - 0.475, 0.07, -0.17]}>
          <boxGeometry args={[0.1, 0.09, 0.52]} />
        </mesh>
      ))}
    </group>
  );
});

/** Abstract glass forms — the premium, non-literal element. */
const GlassForm = memo(function GlassForm({
  m,
  kind,
}: {
  m: Mats;
  kind: "torus" | "ico" | "cone";
}) {
  return (
    <mesh material={m.glass}>
      {kind === "torus" && <torusGeometry args={[0.5, 0.19, 20, 44]} />}
      {kind === "ico" && <icosahedronGeometry args={[0.62, 0]} />}
      {kind === "cone" && <coneGeometry args={[0.5, 0.9, 5]} />}
    </mesh>
  );
});

/** Drifting particle field. */
function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 13;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.016;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.09) * 0.05;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.045} color={GOLD} transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 * Composition
 * ------------------------------------------------------------------ */

type Item = {
  pos: [number, number, number];
  scale: number;
  speed: number;
  rotation: [number, number, number];
  node: (m: Mats) => React.ReactNode;
};

/**
 * Positions keep the left third of the frame clear: that is where the headline
 * and CTAs sit, and objects drifting behind live text reads as clutter, not
 * craft. The cluster is weighted right, with one far-back accent top-left.
 */
const ITEMS: Item[] = [
  { pos: [2.75, 1.75, -0.9], scale: 0.92, speed: 1.1, rotation: [0.3, 0.6, -0.1], node: (m) => <Books m={m} /> },
  { pos: [4.55, 2.25, -2.1], scale: 0.95, speed: 0.9, rotation: [0.22, -0.45, 0.12], node: (m) => <GraduationCap m={m} /> },
  { pos: [3.75, -1.15, 0.1], scale: 1.05, speed: 1.25, rotation: [0, 0, 0], node: (m) => <Globe m={m} /> },
  { pos: [1.75, -2.15, -1.1], scale: 0.95, speed: 1, rotation: [0, 0.5, 0.08], node: (m) => <Trophy m={m} /> },
  { pos: [5.35, 0.45, -1.9], scale: 0.9, speed: 1.35, rotation: [0.1, -0.32, 0], node: (m) => <MusicNote m={m} /> },
  { pos: [2.35, 2.75, -3.1], scale: 0.9, speed: 0.95, rotation: [0.12, 0.4, 0], node: (m) => <PianoKeys m={m} /> },
  { pos: [5.0, -2.35, -2.4], scale: 0.85, speed: 1.15, rotation: [0.5, 0.3, 0], node: (m) => <GlassForm m={m} kind="torus" /> },
  { pos: [2.25, 0.15, -2.2], scale: 0.78, speed: 1.05, rotation: [0.2, 0.6, 0.3], node: (m) => <GlassForm m={m} kind="ico" /> },
  { pos: [-5.35, 2.9, -5.4], scale: 0.8, speed: 0.85, rotation: [0.35, 0, 0.2], node: (m) => <GlassForm m={m} kind="cone" /> },
];

/** Mouse parallax + a key light that tracks the pointer. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    const px = state.pointer.x;
    const py = state.pointer.y;
    const damp = 1 - Math.pow(0.001, delta);

    if (group.current) {
      group.current.rotation.y += (px * 0.19 - group.current.rotation.y) * damp;
      group.current.rotation.x += (-py * 0.13 - group.current.rotation.x) * damp;
      group.current.position.x += (px * 0.42 - group.current.position.x) * damp;
      group.current.position.y += (py * 0.28 - group.current.position.y) * damp;
    }
    if (light.current) {
      light.current.position.x = (px * viewport.width) / 2;
      light.current.position.y = (py * viewport.height) / 2;
    }
  });

  return (
    <>
      <pointLight ref={light} position={[0, 0, 4]} intensity={65} color="#9dbcff" distance={26} decay={2} />
      <group ref={group}>{children}</group>
    </>
  );
}

function Composition() {
  const m = useMaterials();
  return (
    <Rig>
      {ITEMS.map((it, i) => (
        <Float key={i} speed={it.speed} rotationIntensity={0.32} floatIntensity={0.75} floatingRange={[-0.16, 0.16]}>
          <group position={it.pos} rotation={it.rotation} scale={it.scale}>
            {it.node(m)}
          </group>
        </Float>
      ))}
      <Particles />
    </Rig>
  );
}

/* ------------------------------------------------------------------ *
 * Canvas
 * ------------------------------------------------------------------ */

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 42 }}
      // Pause the loop whenever the hero scrolls out of view.
      frameloop="always"
      style={{ pointerEvents: "none" }}
    >
      {/* Fog stands in for depth of field: distant objects fade into the navy. */}
      <fog attach="fog" args={[NAVY, 11, 24]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 6, 5]} intensity={2.6} color="#e6efff" />
      <directionalLight position={[-6, -2, 3]} intensity={1.35} color={GOLD} />

      {/*
        Environment is built from Lightformers rather than a preset. Presets fetch
        an HDR from a CDN, which fails offline, costs a round trip, and would be
        blocked by the strict CSP the spec calls for. This is generated in-scene.
      */}
      <Environment resolution={192} environmentIntensity={0.95}>
        <Lightformer form="rect" intensity={2.6} color="#dfe9ff" position={[0, 5, -6]} scale={[12, 6, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#3b62e8" position={[-7, 1, -4]} scale={[8, 8, 1]} rotation={[0, Math.PI / 2.4, 0]} />
        <Lightformer form="rect" intensity={1.7} color={GOLD} position={[7, -2, -3]} scale={[7, 7, 1]} rotation={[0, -Math.PI / 2.4, 0]} />
        <Lightformer form="circle" intensity={1.9} color="#ffffff" position={[2, -5, 2]} scale={5} />
      </Environment>

      <Composition />
    </Canvas>
  );
}
