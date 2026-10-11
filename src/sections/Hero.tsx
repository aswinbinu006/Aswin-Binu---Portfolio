import React from 'react';
import { FileText, Linkedin, Github, Mail } from 'lucide-react';
import { siteConfig } from '../data/site';
import { Container } from '../components/layout/Container';
import { Chip } from '../components/ui/Chip';
import { isValidUrl } from '../lib/url';

export const Hero: React.FC = () => {
  const hasResume = isValidUrl(siteConfig.resumeUrl) || siteConfig.resumeUrl === '#resume';
  const hasLinkedIn = isValidUrl(siteConfig.linkedinUrl);
  const hasGithub = isValidUrl(siteConfig.githubUrl);
  const hasEmail = Boolean(siteConfig.email);

  return (
    <section id="home" className="relative pt-6 sm:pt-10 md:pt-14 lg:pt-16 pb-12 sm:pb-16 md:pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Headline, Bio & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 md:space-y-7">
            {/* 1. Status Chip */}
            <div className="animate-fadeUp" style={{ animationDelay: '100ms' }}>
              <Chip label={siteConfig.statusChip} tone="status" dot />
            </div>

            {/* 2. Role Label */}
            <div className="overflow-hidden">
              <div
                className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-gold-text font-semibold animate-maskReveal"
                style={{ animationDelay: '200ms' }}
              >
                {siteConfig.role}
              </div>
            </div>

            {/* 3. Name Heading */}
            <div className="overflow-hidden">
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[88px] font-heading font-bold text-navy tracking-tight leading-[1.04] animate-maskReveal"
                style={{ animationDelay: '300ms' }}
              >
                {siteConfig.name}
                <span
                  className="text-gold inline-block animate-fadeIn"
                  style={{ animationDelay: '550ms' }}
                >
                  .
                </span>
              </h1>
            </div>

            {/* 4. Tagline */}
            <p
              className="text-lg md:text-xl lg:text-[22px] text-midnight/90 font-normal leading-relaxed max-w-2xl animate-fadeUp"
              style={{ animationDelay: '420ms' }}
            >
              {siteConfig.tagline}
            </p>

            {/* 5. Primary and Secondary Action Buttons */}
            <div
              className="flex flex-wrap items-center gap-4 pt-1 animate-fadeUp"
              style={{ animationDelay: '540ms' }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-midnight text-ivory hover:bg-navy transition-all duration-200 text-base font-medium shadow-sm hover:shadow active:scale-[0.98]"
              >
                <span>View Projects</span>
                <span className="text-lg leading-none">→</span>
              </a>

              <a
                href={hasResume ? siteConfig.resumeUrl : "#contact"}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-midnight/60 hover:border-navy text-midnight hover:text-navy hover:bg-warm/40 transition-all duration-200 text-base font-medium active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 stroke-[1.75]" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* 6. Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {hasLinkedIn && (
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full border border-gold-border/60 flex items-center justify-center text-midnight hover:text-navy hover:border-gold hover:bg-warm/50 transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5 fill-current stroke-none" />
                </a>
              )}
              {hasGithub && (
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-full border border-gold-border/60 flex items-center justify-center text-midnight hover:text-navy hover:border-gold hover:bg-warm/50 transition-all duration-200"
                >
                  <Github className="w-5 h-5 fill-current stroke-none" />
                </a>
              )}
              {hasEmail && (
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                  className="w-10 h-10 rounded-full border border-gold-border/60 flex items-center justify-center text-midnight hover:text-navy hover:border-gold hover:bg-warm/50 transition-all duration-200"
                >
                  <Mail className="w-5 h-5 stroke-[1.75]" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Portrait Framed with 4 Gold Corner Brackets */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative p-3 sm:p-4 w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[470px]">
              {/* 4 Gold Framing Corner Brackets */}
              <span className="absolute top-0 left-0 w-7 h-7 sm:w-9 sm:h-9 border-t-2 border-l-2 border-gold rounded-tl-sm pointer-events-none" />
              <span className="absolute top-0 right-0 w-7 h-7 sm:w-9 sm:h-9 border-t-2 border-r-2 border-gold rounded-tr-sm pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-7 h-7 sm:w-9 sm:h-9 border-b-2 border-l-2 border-gold rounded-bl-sm pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-7 h-7 sm:w-9 sm:h-9 border-b-2 border-r-2 border-gold rounded-br-sm pointer-events-none" />

              {/* Portrait Container with Rounded Corners */}
              <div className="relative overflow-hidden rounded-[26px] sm:rounded-[32px] shadow-lg border border-gold-border/50 aspect-[4/5] bg-warm/30">
                <picture>
                  <source srcSet="/assets/portrait.webp" type="image/webp" />
                  <img
                    src="/assets/portrait.png"
                    alt="Aswin Binu portrait"
                    width={512}
                    height={643}
                    className="w-full h-full object-cover select-none transform hover:scale-[1.02] transition-transform duration-500"
                    loading="eager"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Scroll Indicator */}
        <div className="hidden sm:flex flex-col items-center justify-center pt-10 lg:pt-14 animate-fadeIn">
          <a
            href="#about"
            className="flex flex-col items-center group cursor-pointer"
            aria-label="Scroll to About section"
          >
            <div className="w-[1.5px] h-7 bg-gold/70 group-hover:bg-gold transition-colors mb-2" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-gold-text font-semibold group-hover:text-navy transition-colors">
              SCROLL
            </span>
            <span className="text-gold-text group-hover:text-navy transition-colors text-xs mt-0.5 animate-bounce">
              ↓
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
};
