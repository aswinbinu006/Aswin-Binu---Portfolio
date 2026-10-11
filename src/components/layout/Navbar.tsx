import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export interface NavLink {
  id: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'academics', label: 'Academics' },
  { id: 'contact', label: 'Contact' },
];

export interface NavbarProps {
  activeId: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeId }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-ivory/95 backdrop-blur-md border-b border-gold-border transition-colors animate-fadeIn shadow-[0_1px_3px_rgba(10,20,69,0.04)]">
      {/* Skip link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-navy focus:text-ivory focus:rounded-md focus:shadow-md"
      >
        Skip to content
      </a>

      <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 h-20 flex items-center justify-between">
        {/* Approved Handwritten AB Signature Logo */}
        <a
          href="#home"
          className="flex items-center hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded"
          aria-label="Aswin Binu logo"
        >
          <img
            src="/logo.webp"
            alt="Aswin Binu logo"
            width={1774}
            height={887}
            className="w-[50px] sm:w-[56px] md:w-[62px] h-auto object-contain select-none"
            loading="eager"
            decoding="sync"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-3" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded group',
                  isActive
                    ? 'text-navy font-semibold'
                    : 'text-midnight/75 hover:text-navy hover:bg-warm/30'
                )}
              >
                <span>{link.label}</span>
                {/* Active indicator with center dot matching mockup */}
                {isActive ? (
                  <span className="absolute bottom-0 left-2 right-2 flex items-center justify-center pointer-events-none">
                    <span className="w-full h-[1.5px] bg-gold" />
                    <span className="absolute w-2 h-2 rounded-full bg-gold" />
                  </span>
                ) : (
                  <span
                    className="absolute bottom-0 left-2.5 right-2.5 h-[1.5px] bg-gold/40 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-200"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold/70 text-navy font-medium text-sm hover:border-gold hover:bg-warm/60 transition-all duration-200"
          >
            <span>Let's Connect</span>
            <span className="text-base leading-none">→</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg text-navy border border-gold-border/60 bg-card hover:bg-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy active:scale-95"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 stroke-[1.5]" />
          ) : (
            <Menu className="w-5 h-5 stroke-[1.5]" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          ref={menuPanelRef}
          className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-[#E8E0D2] border-b border-gold-border z-50 overflow-y-auto px-6 py-6 flex flex-col justify-between shadow-2xl animate-fadeIn"
        >
          <div>
            <nav className="flex flex-col space-y-2 pt-2" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={handleNavClick}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'flex items-center justify-between py-3.5 px-4 text-base sm:text-lg font-medium rounded-xl transition-all',
                      isActive
                        ? 'border-l-4 border-gold text-navy bg-warm/60 font-semibold pl-4'
                        : 'border-l-4 border-transparent text-midnight/80 hover:text-navy hover:bg-warm/30'
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-gold-border/40 mt-6 pb-2">
            <Button
              variant="primary"
              href="#contact"
              onClick={handleNavClick}
              className="w-full text-base py-3"
            >
              Let's Connect
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
