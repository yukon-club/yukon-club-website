import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faSpotify,
  faFacebookF,
  faApple,
  faYoutube,
  faSoundcloud
} from '@fortawesome/free-brands-svg-icons';

const socialMediaLinks = [
  { icon: faInstagram, url: "https://www.instagram.com/yukonclub/", label: "Instagram" },
  { icon: faSpotify, url: "https://open.spotify.com/artist/0ByvroCyJio8uBdV5caf5i", label: "Spotify" },
  { icon: faFacebookF, url: "https://www.facebook.com/YukonClubMusic", label: "Facebook" },
  { icon: faYoutube, url: "https://www.youtube.com/@yukonclub4050", label: "YouTube" },
  { icon: faSoundcloud, url: "https://soundcloud.com/yukon-club", label: "SoundCloud" },
  { icon: faApple, url: "https://music.apple.com/us/artist/yukon-club/1480261755", label: "Apple Music" }
];

export default function SocialMediaIcons({ mobile }) {
  return (
    <div className={`flex items-center gap-6 text-black`}>
      {socialMediaLinks.map((link, index) => (
        <a 
          key={index} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={link.label}
          className={`transition-colors hover:text-gray-500 text-xl`}
        >
          <FontAwesomeIcon icon={link.icon} />
        </a>
      ))}
    </div>
  );
}
