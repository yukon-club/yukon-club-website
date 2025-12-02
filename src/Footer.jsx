import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-12 text-center">
      <div className="text-xs font-bold uppercase tracking-widest space-y-2">
         <p>&copy; YUKON CLUB, 2025. <Link to="/cookie-policy" className="underline">COOKIE POLICY</Link>. <Link to="/privacy-policy" className="underline">PRIVACY POLICY</Link></p>
      </div>
    </footer>
  );
}
