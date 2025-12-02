import React from 'react';
import Hero from './Imageblock';
// import Newsletter from './Newsletter'; // Temporarily hidden - backend not ready yet

function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Hero />
      {/* <Newsletter /> */}
    </main>
  );
}

export default Home;
