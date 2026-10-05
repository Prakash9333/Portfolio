"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Environment, ContactShadows, Scroll } from "@react-three/drei";
import { Suspense, useState } from "react";
import SodaCanScene from "./SodaCanScene";
import OverlayUI from "./OverlayUI";

export type Flavor = "red" | "green" | "orange";

export default function SceneWrapper() {
  const [flavor, setFlavor] = useState<Flavor>("red");

  return (
    <div className="w-full h-full relative">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={2} damping={0.25}>
            <SodaCanScene flavor={flavor} />
            <Environment preset="city" />
            <ContactShadows position={[0, -0.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />

            <Scroll html style={{ width: "100%" }}>
              <OverlayUI flavor={flavor} setFlavor={setFlavor} />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
