import React from 'react';

export default function Videos() {
  const videoIds = ['Wx8CAau_gaI', 'JeKwzmyY6MI', 'UVd6lUVFVKA'];

  return (
    <div className="container-minimal pt-8 pb-24">
      
      <div className="mb-8">
         <h2 className="text-xl font-larsseit-medium uppercase underline decoration-2 underline-offset-4">Videos</h2>
      </div>

      <div className="space-y-12">
         {videoIds.map((id, index) => (
            <div key={id} className="w-full">
               <div className="relative aspect-video bg-black border-2 border-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?controls=1&modestbranding=1`}
                    title="YouTube video player"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
               </div>
               <div className="mt-2 flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-bold uppercase">Official Video 0{index + 1}</span>
                  <span className="text-sm">YUKON CLUB</span>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
