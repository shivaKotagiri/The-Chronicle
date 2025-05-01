"use client";
import { SparklesCore } from "./ui/sparkles";

function SparklesPreview() {
  return (
    <div className="h-20 w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="text-2xl font-bold text-center text-white relative z-20">
        Chronicle
      </h1>
      <div className="w-full h-10 relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={0.6}
          maxSize={1}
          particleDensity={4000}
          className="w-full h-[50%]"
          particleColor="#FFFFFF"
        />

        <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

export default SparklesPreview;

// export default memo(SparklesPreview);
