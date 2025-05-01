/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "../../lib/utils";

interface InputProps {
  borderRadius?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  type?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export function Input({
  borderRadius = "1.75rem",
  containerClassName,
  borderClassName,
  duration,
  type = "text",
  placeholder,
  className,
  value,
  onChange,
  ...otherProps
}: InputProps) {
  return (
    <div
      className={cn(
        "relative h-13 w-full overflow-hidden bg-transparent p-[1px]",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-50 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "relative h-full w-full border border-slate-700 bg-gray-950/90 px-4 text-sm text-white antialiased backdrop-blur-lg outline-none placeholder:text-slate-400",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
        {...otherProps}
      />
    </div>
  );
}

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}

export const MovingBorder = ({
  children,
  duration = 1000,
  rx,
  ry,
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const current = pathRef.current as unknown as SVGGeometryElement;
    const length = current?.getTotalLength?.();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => {
    const current = pathRef.current as unknown as SVGGeometryElement;
    if (current?.getPointAtLength) {
      const point = current.getPointAtLength(val);
      return point.x;
    }
    return 0;
  });

  const y = useTransform(progress, (val) => {
    const current = pathRef.current as unknown as SVGGeometryElement;
    if (current?.getPointAtLength) {
      const point = current.getPointAtLength(val);
      return point.y;
    }
    return 0;
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
