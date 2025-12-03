import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'idle', 'sending', 'success', 'error'
  const [message, setMessage] = useState('');

  // Cloudflare Worker endpoint
  const WORKER_URL = 'https://yc-mailing.yukonclubofficial.workers.dev/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      // Call Cloudflare Worker API
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (response.ok && data.ok === true) {
        // Success: clear input and show success message
        setEmail('');
        setStatus('success');
        setMessage("You're in. Thanks for joining the club ♡");
      } else {
        // Error response from server
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      // Network error or fetch failed (including CORS errors)
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-12 md:pt-16 pb-24">
      <div className="text-center mb-8">
         {/* The requested playful text */}
         <h2 className="text-xl font-larsseit-medium uppercase underline decoration-2 underline-offset-4 mb-2">
            Join the Club
         </h2>
         <p className="text-xs uppercase tracking-widest text-gray-600">
            Mailing List
         </p>
      </div>

      <form 
        id="yc-mailing-form"
        onSubmit={handleSubmit} 
        className="flex flex-col items-center"
      >
        <div className="w-full relative border-b-2 border-black">
           <input
             id="yc-email"
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
          className="mt-6 px-8 py-3 border-2 border-black bg-transparent text-black text-sm uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Adding...' : 'Sign Up'}
        </button>

        {/* Message element for feedback */}
        {message && (
          <p 
            id="yc-message"
            className={`mt-4 text-sm font-bold uppercase ${
              status === 'success' 
                ? 'text-green-700 animate-pulse' 
                : 'text-red-700'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Newsletter;
