import React from 'react';

export default function Tour() {
  // Upcoming shows - leave empty array if no upcoming shows
  const upcomingDates = [];

  // Past events
  const pastDates = [
    { date: 'JUN 27', city: 'BRAAMT, NL', venue: 'Lago Lago Festival', status: 'PAST', link: null },
    { date: 'NOV 24', city: 'BAARLO, NL', venue: 'Bosburcht Winter', status: 'PAST', link: null },
    { date: 'MAR 9', city: 'AMSTERDAM, NL', venue: 'Paradiso', status: 'PAST', link: null, with: 'Gijs Leijdekkers' },
  ];

  return (
    <div className="container-minimal pt-8 pb-24">
      
      {/* Header Title */}
      <div className="mb-8">
         <h2 className="text-xl font-larsseit-medium uppercase underline decoration-2 underline-offset-4">Tour Dates</h2>
      </div>

      {/* Upcoming Shows */}
      {upcomingDates.length > 0 ? (
        <>
          <div className="mb-4">
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-600">Upcoming</h3>
          </div>
          <div className="flex flex-col heavy-border-t mb-12">
             {upcomingDates.map((show, index) => (
                <div 
                   key={index} 
                   className="grid grid-cols-12 gap-4 py-4 items-center border-b border-gray-300 hover:bg-gray-100 transition-colors"
                >
                   <div className="col-span-2 md:col-span-2 text-sm md:text-base">{show.date}</div>
                   <div className="col-span-3 md:col-span-3 font-bold text-sm md:text-base">{show.city}</div>
                   <div className="col-span-4 md:col-span-5 text-sm md:text-base">
                      {show.venue}
                      {show.with && (
                         <span className="block text-xs text-gray-500 font-normal mt-1">+ {show.with}</span>
                      )}
                   </div>
                   <div className="col-span-3 md:col-span-2 text-right">
                      {show.status === 'SOLD OUT' ? (
                         <span className="font-bold text-sm md:text-base line-through text-gray-500">SOLD OUT</span>
                      ) : (
                         <a href={show.link} className="font-bold text-sm md:text-base underline hover:text-gray-600">
                            {show.status}
                         </a>
                      )}
                   </div>
                </div>
             ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col heavy-border-t mb-12 py-8">
           <div className="mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-600">Upcoming</h3>
           </div>
           <p className="text-gray-500 uppercase tracking-widest text-sm">No upcoming shows announced</p>
        </div>
      )}

      {/* Past Events */}
      {pastDates.length > 0 && (
        <>
          <div className="mb-4">
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-600">Past Events</h3>
          </div>
          <div className="flex flex-col heavy-border-t">
             {pastDates.map((show, index) => (
                <div 
                   key={index} 
                   className="grid grid-cols-12 gap-4 py-4 items-center border-b border-gray-300 opacity-60"
                >
                   <div className="col-span-2 md:col-span-2 text-sm md:text-base text-gray-500">{show.date}</div>
                   <div className="col-span-3 md:col-span-3 font-bold text-sm md:text-base text-gray-500">{show.city}</div>
                   <div className="col-span-4 md:col-span-5 text-sm md:text-base text-gray-500">
                      {show.venue}
                      {show.with && (
                         <span className="block text-xs text-gray-400 font-normal mt-1">+ {show.with}</span>
                      )}
                   </div>
                   <div className="col-span-3 md:col-span-2 text-right">
                      <span className="font-bold text-sm md:text-base text-gray-400 uppercase">{show.status}</span>
                   </div>
                </div>
             ))}
          </div>
        </>
      )}
      
      <div className="heavy-border-b mt-12"></div>
    </div>
  );
}
