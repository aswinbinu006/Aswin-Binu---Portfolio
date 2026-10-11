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
          <p>
            &copy; 2026 {name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-ivory/80">
            <a
              href="mailto:aswinbinu006@gmail.com"
              className="flex items-center gap-2 hover:text-gold transition-colors"
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
