"use client";
import { SparklesCore } from "./ui/sparkles";

function SparklesPreview() {
  return (
    <div className="h-12 sm:h-16 md:h-20 w-24 sm:w-32 md:w-40 bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white relative z-20">
        The Chronicle
      </h1>
      <div className="w-full h-8 sm:h-10 relative">
        <div className="absolute inset-x-4 sm:inset-x-8 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[1px] sm:h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-4 sm:inset-x-8 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-12 sm:inset-x-24 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[2px] sm:h-[3px] md:h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-12 sm:inset-x-24 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={2000}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(100px_80px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

export default SparklesPreview;
