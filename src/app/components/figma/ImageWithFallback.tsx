import React, { useState, useEffect } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackWidth?: number;
}

export function ImageWithFallback({
  src,
  alt,
  style,
  className = "",
  loading = "lazy",
  fallbackWidth,
  onLoad,
  onError,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setDidError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setDidError(true);
    if (onError) onError(e);
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  // Optimize Unsplash URLs
  let optimizedSrc = src;
  let srcSet: string | undefined = undefined;

  if (src && src.includes("images.unsplash.com")) {
    const getUrl = (w: number) => {
      try {
        const parsed = new URL(src);
        parsed.searchParams.set("w", String(w));
        parsed.searchParams.set("auto", "format");
        parsed.searchParams.set("q", "80");
        return parsed.toString();
      } catch (e) {
        return src;
      }
    };

    optimizedSrc = getUrl(fallbackWidth || 800);
    srcSet = `${getUrl(320)} 320w, ${getUrl(640)} 640w, ${getUrl(960)} 960w, ${getUrl(1280)} 1280w`;
  }

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-950 text-center align-middle ${className}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full min-h-[150px] border border-white/5 rounded-xl">
          <img src={ERROR_IMG_SRC} alt="Error loading image" className="opacity-30" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950/40">
      {/* Pulse skeleton screen */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-gray-900/50 via-pink-500/5 to-gray-900/50" />
      )}
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={srcSet ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined}
        alt={alt}
        loading={loading}
        className={`transition-all duration-700 ease-out ${className} ${
          isLoaded 
            ? "opacity-100 scale-100 blur-none" 
            : "opacity-0 scale-[1.03] blur-md pointer-events-none"
        }`}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </div>
  );
}
