import { useState } from "react";

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function ImageWithFallback({ src, alt, className = "", width, height }: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-to-br from-[#e8e4db] to-[#d7e3e4] text-muted ${className}`}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
