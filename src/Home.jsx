import React from 'react';
import Hero from './Imageblock';
import Newsletter from './Newsletter';

function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Hero />
      <Newsletter />
    </main>
  );
}

export default Home;
