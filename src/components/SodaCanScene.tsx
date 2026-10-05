"use client";

import { useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { Flavor } from "./SceneWrapper";

export default function SodaCanScene({ flavor }: { flavor: Flavor }) {
  const canRef = useRef<THREE.Group>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const scroll = useScroll();

  const { scene } = useGLTF("/soda_can.glb");

  // Load the texture for the red can
  const redTexture = useTexture("/red_label.jpg");
  redTexture.flipY = false;
  redTexture.colorSpace = THREE.SRGBColorSpace;

  // Clone the scene so we don't mutate the cached original
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Flavor colors
  const colors = useMemo(() => ({
    red: new THREE.Color("#ffffff"), // white so the red texture shows correctly
    green: new THREE.Color("#22c55e"),
    orange: new THREE.Color("#f97316"),
  }), []);

  const targetColor = colors[flavor];

  // Set initial material properties and update on flavor change
  useLayoutEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.metalness = 0.9;
          mat.roughness = 0.15;
          // Clone material to avoid modifying the cached GLTF material
          mesh.material = mat.clone(); 
          
          const newMat = mesh.material as THREE.MeshStandardMaterial;
          if (flavor === "red") {
            newMat.map = redTexture;
          } else {
            newMat.map = null;
          }
          newMat.needsUpdate = true;
          newMat.color.copy(targetColor);
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clonedScene, flavor, redTexture]);

  useFrame((state) => {
    const offset = scroll.offset; // 0 to 1

    // 1. Background color transition
    const bgColor = new THREE.Color().lerpColors(
      new THREE.Color("#f8fafc"), // slate-50
      new THREE.Color("#020617"), // slate-950
      offset
    );
    state.scene.background = bgColor;

    // 2. Animate material color smoothly
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.lerp(targetColor, 0.1);
      }
    });

    // 3. Scroll-based animation for Can
    if (canRef.current) {
      // Move left to give space for right-aligned text on Page 2
      const xPos = THREE.MathUtils.lerp(0, -1.5, offset);
      // Move down slightly
      const yPos = THREE.MathUtils.lerp(0, -0.5, offset);
      // Move forward slightly on Z
      const zPos = THREE.MathUtils.lerp(0, 1.5, offset);
      
      canRef.current.position.set(xPos, yPos, zPos);

      // Spin 360 degrees on Y, tilt on X
      const rotY = THREE.MathUtils.lerp(0, Math.PI * 2, offset);
      const rotX = THREE.MathUtils.lerp(0, 0.25, offset);
      
      // Floating effect combined with scroll rotation
      const time = state.clock.getElapsedTime();
      const floatY = Math.sin(time * 2) * 0.1;
      
      canRef.current.rotation.set(rotX, rotY, 0);
      canRef.current.position.y += floatY * (1 - offset); // less float when scrolled down
    }

    // 4. Lighting animation
    if (spotlightRef.current) {
      // Low intensity to high intensity
      spotlightRef.current.intensity = THREE.MathUtils.lerp(20, 150, offset);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight 
        ref={spotlightRef}
        position={[0, 5, 5]} 
        angle={0.6} 
        penumbra={0.8} 
        intensity={20} 
        castShadow 
      />
      <group ref={canRef} dispose={null}>
        <primitive object={clonedScene} scale={1.2} position={[0, -0.8, 0]} />
      </group>
    </>
  );
}

useGLTF.preload("/soda_can.glb");
useTexture.preload("/red_label.jpg");
