import React, { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedData = () => {
      console.log('Video loaded successfully');
    };
    
    const handleError = (e) => {
      console.error('Video error details:', e);
      console.error('Video error code:', video.error?.code);
      console.error('Video error message:', video.error?.message);
      console.error('Video src attempted:', video.src);
    };
    
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    
    // Cleanup
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Get video path - files in public folder are served from root
  // In development: /V1.mp4, in production: /yukon-club-website/V1.mp4
  const videoPath = `${process.env.PUBLIC_URL || ''}/V1.mp4`;

  return (
    <div className="w-full flex flex-col items-center pb-8 md:pb-12">
      <div className="w-full max-w-4xl px-4">
         <div className="aspect-video w-full bg-black overflow-hidden">
            <video 
               ref={videoRef}
               src={videoPath}
               autoPlay
               loop
               muted
               playsInline
               preload="auto"
               className="w-full h-full object-cover"
            >
               Your browser does not support the video tag.
            </video>
         </div>
      </div>
      
      {/* KOUYOU EP Link */}
      <div className="mt-12 md:mt-16 text-center">
         <a 
            href="https://open.spotify.com/artist/0ByvroCyJio8uBdV5caf5i" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm md:text-base font-larsseit-medium uppercase tracking-widest underline hover:text-gray-600 transition-colors"
         >
            KOUYOU EP OUT NOW. LISTEN HERE
         </a>
      </div>
    </div>
  );
}
