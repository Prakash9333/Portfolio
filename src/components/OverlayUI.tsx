"use client";

import { Flavor } from "./SceneWrapper";

interface OverlayUIProps {
  flavor: Flavor;
  setFlavor: (flavor: Flavor) => void;
}

export default function OverlayUI({ flavor, setFlavor }: OverlayUIProps) {
  return (
    <div className="w-full pointer-events-none">
      {/* Page 1 - Hero Section */}
      <section className="w-screen h-screen flex flex-col justify-between items-center py-20 px-8">
        <div className="text-center mt-10">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase drop-shadow-sm">
            Refresh <br /> Your Senses
          </h1>
          <p className="mt-4 text-xl text-slate-700 font-medium">
            Experience the next level of hydration.
          </p>
        </div>

        {/* Flavor Picker */}
        <div className="pointer-events-auto flex gap-4 p-4 rounded-3xl bg-white/30 backdrop-blur-md border border-white/40 shadow-xl mb-10">
          <button
            onClick={() => setFlavor("red")}
            className={`w-12 h-12 rounded-full transition-transform ${
              flavor === "red" ? "scale-110 ring-4 ring-red-400" : "hover:scale-110"
            }`}
            style={{ backgroundColor: "#ef4444" }}
            aria-label="Cherry Flavor"
          />
          <button
            onClick={() => setFlavor("green")}
            className={`w-12 h-12 rounded-full transition-transform ${
              flavor === "green" ? "scale-110 ring-4 ring-green-400" : "hover:scale-110"
            }`}
            style={{ backgroundColor: "#22c55e" }}
            aria-label="Lime Flavor"
          />
          <button
            onClick={() => setFlavor("orange")}
            className={`w-12 h-12 rounded-full transition-transform ${
              flavor === "orange" ? "scale-110 ring-4 ring-orange-400" : "hover:scale-110"
            }`}
            style={{ backgroundColor: "#f97316" }}
            aria-label="Orange Flavor"
          />
        </div>
      </section>

      {/* Page 2 - Details Section */}
      <section className="w-screen h-screen flex flex-col justify-center items-end px-12 md:px-32">
        <div className="max-w-md text-right">
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 mb-6">
            Pure Taste. <br /> Zero Limits.
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Crafted with natural ingredients and a perfect balance of carbonation. 
            Elevate your everyday moments with our signature flavors.
          </p>
          <button className="pointer-events-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors shadow-2xl">
            Pre-order Now
          </button>
        </div>
      </section>
    </div>
  );
}
