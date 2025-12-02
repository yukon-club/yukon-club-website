import React from 'react';

function Music() {
  const releases = [
    { title: 'KOUYOU', type: 'EP', year: '2024', label: 'INDEPENDENT' },
    { title: 'ABSENCE', type: 'SINGLE', year: '2021', label: 'FULL SPECTRUM' },
    { title: 'EXHALE', type: 'EP', year: '2019', label: 'YUKON RECORDS' },
    { title: 'STAY', type: 'SINGLE', year: '2018', label: 'YUKON RECORDS' },
    { title: 'ECHOES', type: 'SINGLE', year: '2018', label: 'YUKON RECORDS' },
    { title: 'YUKON CLUB', type: 'EP', year: '2017', label: 'INDEPENDENT' },
  ];

  return (
    <div className="container-minimal pt-8 pb-24">
      
      <div className="mb-8">
         <h2 className="text-xl font-larsseit-medium uppercase underline decoration-2 underline-offset-4">Releases</h2>
      </div>

      {/* Placeholder for future linktree embed */}
      <div className="mb-12 heavy-border-t pt-8">
         {/* Linktree embed will go here later */}
         <div className="w-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300">
            <p className="text-gray-400 text-sm uppercase tracking-widest">Linktree embed coming soon</p>
         </div>
      </div>

      <div className="flex flex-col heavy-border-t">
         {releases.map((release, index) => (
            <div 
               key={index} 
               className="grid grid-cols-12 gap-4 py-4 items-center border-b border-gray-300 hover:bg-gray-100 transition-colors"
            >
               <div className="col-span-6 md:col-span-5 font-bold text-lg">{release.title}</div>
               <div className="col-span-3 md:col-span-2 text-sm">{release.type}</div>
               <div className="col-span-3 md:col-span-2 text-sm">{release.year}</div>
               <div className="col-span-12 md:col-span-3 text-right">
                  <a href="https://open.spotify.com/artist/0ByvroCyJio8uBdV5caf5i" target="_blank" rel="noreferrer" className="font-bold underline hover:text-gray-600 text-sm">
                     LISTEN
                  </a>
               </div>
            </div>
         ))}
      </div>
      
      <div className="heavy-border-b mt-12"></div>
    </div>
  );
}

export default Music;
