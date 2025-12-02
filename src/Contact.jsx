import React from 'react';

function Contact() {
  return (
    <div className="container-minimal pt-8 pb-24">
      <div className="mb-8">
         <h2 className="text-xl font-larsseit-medium uppercase underline decoration-2 underline-offset-4">Contact</h2>
      </div>

      <div className="flex flex-col heavy-border-t text-center md:text-left">
         <div className="py-8 border-b border-gray-300">
            <h3 className="font-bold text-lg mb-2">BOOKINGS</h3>
            <a href="mailto:Adriaan@fullspectrum.nl" className="text-2xl md:text-4xl font-larsseit-medium hover:underline">
               adriaan@fullspectrum.nl
            </a>
         </div>

         <div className="py-8 border-b border-gray-300">
            <h3 className="font-bold text-lg mb-2">DIRECT</h3>
            <a href="mailto:info@thyukonclub.com" className="text-2xl md:text-4xl font-larsseit-medium hover:underline">
               info@theyukonclub.com
            </a>
         </div>
      </div>
       
      <div className="heavy-border-b mt-8"></div>
    </div>
  );
}

export default Contact;
