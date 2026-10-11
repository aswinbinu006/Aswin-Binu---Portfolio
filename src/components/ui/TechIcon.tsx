import React from 'react';

export interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-9 h-9' }) => {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  switch (normalized) {
    case 'python':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M11.9 1.5c-3.1 0-5.4 1.4-5.4 3.9v2.8h5.5v.8H3.8c-2.4 0-4.3 2.1-4.3 5 0 2.9 1.9 4.9 4.3 4.9h2v-2.7c0-2.8 2.3-5 5-5h5.5V8.4c0-2.4-2.2-6.9-4.4-6.9zm-2.8 2.1c.7 0 1.2.5 1.2 1.2 0 .7-.5 1.2-1.2 1.2-.7 0-1.2-.5-1.2-1.2 0-.7.5-1.2 1.2-1.2z"
            fill="#3776AB"
          />
          <path
            d="M12.1 22.5c3.1 0 5.4-1.4 5.4-3.9v-2.8H12v-.8h8.2c2.4 0 4.3-2.1 4.3-5 0-2.9-1.9-4.9-4.3-4.9h-2v2.7c0 2.8-2.3 5-5 5H7.7v2.8c0 2.4 2.2 6.9 4.4 6.9zm2.8-2.1c-.7 0-1.2-.5-1.2-1.2 0-.7.5-1.2 1.2-1.2.7 0 1.2.5 1.2 1.2 0 .7-.5 1.2-1.2 1.2z"
            fill="#FFD43B"
          />
        </svg>
      );

    case 'cpp':
    case 'c':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2z" fill="#00599C" />
          <path d="M14.5 10.5h-5a2.5 2.5 0 000 5h5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 12h2m-1-1v2m3-1h2m-1-1v2" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'javascript':
    case 'js':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M7 13.5v4.5c0 1.5-.8 2-2 2-1 0-1.5-.5-1.8-1.2" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15 14c-1.5-.8-3.5-.5-3.5 1.2 0 1.5 2 2 3.5 2.8 1.5.8 1.5 2.5 0 3-1.8.6-3.5-.2-4-1.5" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M5 9h6m-3 0v10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M19 12c-1.5-.8-3.5-.5-3.5 1.2 0 1.5 2 2 3.5 2.8 1.5.8 1.5 2.5 0 3-1.8.6-3.5-.2-4-1.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'java':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M6 18c3 1 9 1 12 0-3-1-9-1-12 0z" fill="#E76F00" />
          <path d="M7 15c2.5.8 7.5.8 10 0-2.5-.8-7.5-.8-10 0z" fill="#E76F00" />
          <path d="M11 6c-2 3-1 5 1 7-2-2-2-4 0-6z" fill="#5382A1" />
          <path d="M14 4c-3 3-1 6 1 8-2-3-1-5 0-8z" fill="#E76F00" />
        </svg>
      );

    case 'scikitlearn':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="9" cy="12" r="7" fill="#F89939" />
          <circle cx="15" cy="12" r="7" fill="#3499CD" opacity="0.85" />
          <text x="12" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">learn</text>
        </svg>
      );

    case 'tensorflow':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2l8 4.6v9.2L12 21 4 15.8V6.6L12 2z" fill="#FF6F00" />
          <path d="M12 5.5l5 2.8v5.6L12 11V5.5z" fill="#FFA800" />
          <path d="M12 11l-5 2.9v5.6l5-2.8V11z" fill="#E65100" />
        </svg>
      );

    case 'keras':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#D00000" />
          <path d="M6 5v14m0-7l7-7m-4 7l7 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'xgboost':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#0A7EBA" />
          <text x="12" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">XGB</text>
        </svg>
      );

    case 'openai':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M21 11.5a4.8 4.8 0 00-.4-2.7 5.1 5.1 0 00-3.6-2.5 5 5 0 00-2.3-2.7 5.1 5.1 0 00-4.3-.2 5 5 0 00-2.2 1.6 5.1 5.1 0 00-2.5 3.6 5 5 0 00-2 2.9 5.1 5.1 0 00.7 4.2 5 5 0 002.3 2.7 5.1 5.1 0 004.3.2 5 5 0 002.2-1.6 5.1 5.1 0 002.5-3.6 5 5 0 002-2.9c.2-.5.3-1.1.3-1.6z"
            stroke="#10A37F"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'react':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );

    case 'nextjs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="11" fill="#000000" />
          <path d="M7 6v12m0-12l10 12m-3-12v6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'tailwindcss':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M6 13c1.5-2 3.5-3 6-3 3.5 0 4.5 2.5 6 3 1.5.5 3-.5 4-2-1.5 2-3.5 3-6 3-3.5 0-4.5-2.5-6-3-1.5-.5-3 .5-4 2zm-4 5c1.5-2 3.5-3 6-3 3.5 0 4.5 2.5 6 3 1.5.5 3-.5 4-2-1.5 2-3.5 3-6 3-3.5 0-4.5-2.5-6-3-1.5-.5-3 .5-4 2z"
            fill="#06B6D4"
          />
        </svg>
      );

    case 'html':
    case 'html5':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M3 2l2 18 7 2 7-2 2-18H3z" fill="#E34F26" />
          <path d="M12 20.2l5.4-1.5L18.8 4H12v16.2z" fill="#EF652A" />
          <path d="M12 7.8h4.5l-.3 3.4H12v2.8h3.9l-.4 4.5L12 19.4v-2.8l2.2-.6.2-2.2H8.6l-.2-2.5h3.6V7.8z" fill="#FFFFFF" />
        </svg>
      );

    case 'css':
    case 'css3':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M3 2l2 18 7 2 7-2 2-18H3z" fill="#1572B6" />
          <path d="M12 20.2l5.4-1.5L18.8 4H12v16.2z" fill="#33A9DC" />
          <path d="M12 7.8h4.5l-.3 3.4H12v2.8h3.9l-.4 4.5L12 19.4v-2.8l2.2-.6.2-2.2H8.6l-.2-2.5h3.6V7.8z" fill="#FFFFFF" />
        </svg>
      );

    case 'numpy':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2z" fill="#4DABCF" />
          <path d="M8 8v8l8-8v8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'pandas':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="5" y="4" width="3" height="16" rx="1.5" fill="#150458" />
          <rect x="10.5" y="8" width="3" height="12" rx="1.5" fill="#E70488" />
          <rect x="16" y="11" width="3" height="9" rx="1.5" fill="#00A3E0" />
        </svg>
      );

    case 'matplotlib':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" stroke="#11557C" strokeWidth="2" />
          <path d="M5 15l4-6 4 4 6-8" stroke="#E24A33" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'seaborn':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" fill="#4C72B0" />
          <path d="M6 14c2-4 4-6 6-6s4 2 6 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'recharts':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="4" y="14" width="3" height="7" rx="1" fill="#22B5BF" />
          <rect x="9" y="10" width="3" height="11" rx="1" fill="#22B5BF" />
          <rect x="14" y="6" width="3" height="15" rx="1" fill="#22B5BF" />
          <rect x="19" y="3" width="3" height="18" rx="1" fill="#22B5BF" />
        </svg>
      );

    case 'postgresql':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2C7 2 4 5 4 9c0 3 2 5.5 5 6.5V20l3-2 3 2v-4.5c3-1 5-3.5 5-6.5 0-4-3-7-8-7z"
            fill="#336791"
          />
        </svg>
      );

    case 'firebase':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M4 17l7-13 3 6-10 7z" fill="#FFA000" />
          <path d="M14 10l-3-6 9 13-6-7z" fill="#F57C00" />
          <path d="M4 17l8 5 8-5-8-15-8 15z" fill="#FFCA28" />
        </svg>
      );

    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M13 2L3 14h8l-2 8 12-12h-8z" fill="#3ECF8E" />
        </svg>
      );

    case 'googlecloud':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M19.3 10a5 5 0 00-9.2-2 4 4 0 00-5.1 4.5A4 4 0 006 19h13a4 4 0 00.3-9z" fill="#4285F4" />
          <circle cx="8" cy="15" r="2" fill="#EA4335" />
          <circle cx="16" cy="15" r="2" fill="#34A853" />
        </svg>
      );

    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2L2 20h20L12 2z" fill="#000000" />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#F05032" />
          <path d="M7 12l5-5 5 5-5 5-5-5z" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="11" fill="#181717" />
          <path
            d="M12 5a7 7 0 00-2.2 13.6c.3.1.5-.2.5-.4v-1.4c-2 .4-2.4-.8-2.4-.8-.3-.8-.8-1-8-1-.6-.4.1-.4.1-.4.7.1 1.1.7 1.1.7.6 1.1 1.7.8 2.1.6.1-.5.3-.8.5-1-1.6-.2-3.3-.8-3.3-3.6 0-.8.3-1.4.8-2-.1-.2-.3-.9.1-1.9 0 0 .6-.2 2 .7a7 7 0 013.7 0c1.4-.9 2-.7 2-.7.4 1 .2 1.7.1 1.9.5.6.8 1.2.8 2 0 2.8-1.7 3.4-3.3 3.6.3.3.6.8.6 1.6v2.4c0 .2.2.5.5.4A7 7 0 0012 5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'vscode':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M18 2l-9 8-4-3-2 1v12l2 1 4-3 9 8 3-1.5V3.5L18 2z" fill="#007ACC" />
        </svg>
      );

    case 'docker':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M2 13c1 0 2 .5 3 .5 1.5 0 2.5-.5 4-.5s2.5.5 4 .5c1.5 0 2.5-.5 4-.5 1 0 2 .5 3 .5 1-2 2-5-1-7-1-1-3-1-4 0v-1h-9v3H4c-2 2-2 4-2 5z"
            fill="#2496ED"
          />
        </svg>
      );

    case 'figma':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="4" y="2" width="8" height="7" rx="3.5" fill="#F24E1E" />
          <rect x="12" y="2" width="8" height="7" rx="3.5" fill="#FF7262" />
          <rect x="4" y="9" width="8" height="7" rx="3.5" fill="#A259FF" />
          <circle cx="16" cy="12.5" r="3.5" fill="#1ABCFE" />
          <rect x="4" y="16" width="8" height="7" rx="3.5" fill="#0ACF83" />
        </svg>
      );

    default:
      return (
        <div className="w-9 h-9 rounded-full bg-warm/50 border border-gold-border flex items-center justify-center font-bold text-xs text-navy">
          {name.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};
