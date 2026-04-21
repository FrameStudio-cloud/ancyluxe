import { useEffect, useState } from "react";
import { PiFlowerLotusThin } from "react-icons/pi";
import shop from "../config/shop";

export default function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2000);
    const doneTimer = setTimeout(() => onDone(), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#FDF6EF] flex flex-col items-center justify-center transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
    >
      {/* Icon */}
      <div className="mb-6 text-6xl animate-bounce">
        <PiFlowerLotusThin color="red"/>
      </div>

      {/* Logo */}
      <h1 className="font-['Cormorant_Garamond'] text-4xl font-light text-gray-800">
        {shop.name} <span className="text-pink-400"></span> {shop.nameAccent}
      </h1>
      <p className="mt-3 text-xs tracking-widest text-gray-400 uppercase">
        Events and Flowers
      </p>

      {/* Loading bar */}
      <div className="mt-10 w-32 h-0.5 bg-pink-100 rounded-full overflow-hidden">
        <div className="h-full bg-pink-400 rounded-full animate-[loading_2s_ease-in-out_forwards]" />
      </div>
    </div>
  );
}
