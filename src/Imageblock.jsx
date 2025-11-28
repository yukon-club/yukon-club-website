import React, { useRef, useEffect, useState } from "react";
import { Parallax } from "react-parallax";

export default function Hero() {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Force video to play when component mounts
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoaded(true);
          })
          .catch((error) => {
            console.log("Video autoplay failed:", error);
          });
      }
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center pb-8 md:pb-12 lg:pb-16 px-4 overflow-hidden">
      <div className="w-full max-w-5xl">
        <Parallax
          strength={300}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
            <video 
              ref={videoRef}
              src={`${process.env.PUBLIC_URL || ''}/V1.mp4`}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Video error:", e);
              }}
              onLoadedData={() => {
                setIsLoaded(true);
              }}
              style={{
                display: 'block',
                width: '100%',
                height: '100%'
              }}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </Parallax>
        
        {/* KOUYOU EP Link */}
        <div className="text-center mt-12 md:mt-16">
          <a 
            href="https://linktr.ee/yukonclub" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm md:text-base font-larsseit-medium uppercase tracking-wide underline decoration-2 underline-offset-4 hover:text-gray-600 transition-colors"
          >
            KOUYOU EP out now. Listen here
          </a>
        </div>
      </div>
    </div>
  );
}
