import React from 'react';
import { MapPin, Mail } from 'lucide-react';
import { Container } from './Container';

export interface FooterProps {
  name: string;
  location?: string;
}

export const Footer: React.FC<FooterProps> = ({ name, location = "Nagpur, Maharashtra, India" }) => {
  return (
    <footer className="w-full bg-[#070F38] text-ivory border-t border-gold/25 py-8 transition-colors">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-ivory/70">
          <div className="flex items-center gap-3.5">
            <a href="#home" className="hover:opacity-90 transition-opacity flex items-center" aria-label="Aswin Binu logo">
              <img
                src="/logo.webp"
                alt="Aswin Binu logo"
                className="w-10 sm:w-12 h-auto object-contain select-none"
              />
            </a>
            <p>
              &copy; 2026 {name}. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-ivory/80">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=aswinbinu006@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gold transition-colors"
              title="aswinbinu006@gmail.com"
            >
              <Mail className="w-4 h-4 text-gold stroke-[1.75]" />
              <span>aswinbinu006@gmail.com</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold stroke-[2]" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
