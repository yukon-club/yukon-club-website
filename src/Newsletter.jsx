import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-24 pt-12 md:pt-16">
      <div className="text-center mb-8">
         {/* The requested playful text */}
         <h2 className="text-xl font-larsseit-medium uppercase underline decoration-2 underline-offset-4 mb-2">
            Join the Club
         </h2>
         <p className="text-xs uppercase tracking-widest text-gray-600">
            Mailing List
         </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="w-full relative border-b-2 border-black">
           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="EMAIL ADDRESS"
             className="w-full py-3 bg-transparent text-center text-lg uppercase placeholder-gray-400 focus:outline-none font-larsseit-medium"
             required
           />
        </div>
        
        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-6 px-8 py-3 border-2 border-black bg-transparent text-black text-sm uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          {status === 'sending' ? 'Adding...' : 'Sign Up'}
        </button>

        {status === 'success' && (
          <p className="mt-4 text-sm font-bold uppercase text-green-700 animate-pulse">
             You're in.
          </p>
        )}
      </form>
    </div>
  );
};

export default Newsletter;
