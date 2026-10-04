import React from 'react';

interface TechIconProps {
  type: string;
  className?: string;
}

export default function TechIcon({ type, className = 'w-5 h-5' }: TechIconProps) {
  switch (type) {
    case 'python':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M11.922 2c-5.184 0-4.86 2.247-4.86 2.247l.006 2.327h4.945v.7H5.064S2 6.918 2 12.132c0 5.216 2.668 5.063 2.668 5.063h1.593v-2.234s-.086-2.668 2.62-2.668h4.508s2.513.04 2.513-2.457V4.457S16.42 2 11.922 2zm-2.7 1.625a.872.872 0 0 1 .872.871.872.872 0 0 1-.872.872.872.872 0 0 1-.871-.872.872.872 0 0 1 .871-.871z"
            fill="#387EB8"
          />
          <path
            d="M12.078 22c5.184 0 4.86-2.247 4.86-2.247l-.006-2.327h-4.945v-.7h6.949S22 17.082 22 11.868c0-5.216-2.668-5.063-2.668-5.063h-1.593v2.234s.086 2.668-2.62 2.668H10.61s-2.513-.04-2.513 2.457v5.378S7.58 22 12.078 22zm2.7-1.625a.872.872 0 0 1-.872-.871.872.872 0 0 1 .872-.872.872.872 0 0 1 .871.872.872.872 0 0 1-.871.871z"
            fill="#FFE052"
          />
        </svg>
      );

    case 'c':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" stroke="#659AD2" strokeWidth="2" fill="#0E2238" />
          <path
            d="M14.5 8.5C13.8 7.6 12.8 7 11.5 7 9 7 7 9.2 7 12s2 5 4.5 5c1.3 0 2.3-.6 3-1.5"
            stroke="#659AD2"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'java':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M8.5 18.5c3 .8 7.5.8 9.5-.2M6.5 21c4.5 1.2 11.5 1 14.5-.5M10 16c2.5.5 5.5.5 7.5-.2"
            stroke="#E76F00"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13.5 3c-1.5 2.5-3 4.5-.5 7 2 2 .5 3.5-.5 5M10.5 4c-2 3-1 5 1 7 1.5 1.5 1 3 0 4M15 6c1 1.5 1 3-.5 4.5"
            stroke="#5382A1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path
            d="M4.5 10.5h6M7.5 10.5v8M13 16.5c.8.6 1.8 1 2.8 1 1.3 0 2.2-.6 2.2-1.6 0-1-.8-1.5-2.2-2-1.8-.6-3.1-1.3-3.1-2.9 0-1.6 1.3-2.7 3.3-2.7 1.1 0 2 .3 2.7.7v2c-.7-.5-1.6-.8-2.5-.8-1 0-1.7.5-1.7 1.3 0 .9.7 1.3 2 1.8 2 .7 3.3 1.4 3.3 3.1 0 1.8-1.4 2.8-3.6 2.8-1.2 0-2.3-.4-3.2-1v-2.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            d="M7.5 11v6.5c0 1.2-.6 1.8-1.8 1.8-.6 0-1.1-.1-1.5-.4v-2c.3.2.7.3 1 .3.4 0 .6-.2.6-.7V11h1.7zm6.7 5.6c.8.6 1.8 1 2.8 1 1.3 0 2.2-.6 2.2-1.6 0-1-.8-1.5-2.2-2-1.8-.6-3.1-1.3-3.1-2.9 0-1.6 1.3-2.7 3.3-2.7 1.1 0 2 .3 2.7.7v2c-.7-.5-1.6-.8-2.5-.8-1 0-1.7.5-1.7 1.3 0 .9.7 1.3 2 1.8 2 .7 3.3 1.4 3.3 3.1 0 1.8-1.4 2.8-3.6 2.8-1.2 0-2.3-.4-3.2-1v-2.5z"
            fill="#000000"
          />
        </svg>
      );

    case 'sql':
    case 'database':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#4DAAF8" strokeWidth="1.8">
          <ellipse cx="12" cy="5" rx="9" ry="3" fill="#0C2340" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      );

    case 'assembly':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#A78BFA" strokeWidth="1.8">
          <rect x="5" y="5" width="14" height="14" rx="2" fill="#1E1435" />
          <path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
      );

    case 'html5':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#E44D26" />
          <path d="M12 3.8v16.3l4.8-1.5L18.2 3.8H12z" fill="#F16529" />
          <path d="M12 7.5h4.2l-.3 3.2H12v2.4h3.6l-.4 4.5-3.2 1V18.6" fill="#FFFFFF" />
          <path d="M12 7.5H7.8l.3 3.2H12v2.4H8.4l.2 2.1 3.4 1v2.1" fill="#EBEBEB" />
        </svg>
      );

    case 'bash':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#4ADE80" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="3" fill="#092113" />
          <path d="M6 9l4 3-4 3M12 15h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'dart':
    case 'flutter':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M13.5 2.5L3.5 12.5l3 3 13-13h-6z" fill="#02569B" />
          <path d="M13.5 14.5l-4 4 4 4h6l-6-6 6-6h-6z" fill="#0175C2" />
          <path d="M9.5 18.5l4-4 2 2-2 2-4 0z" fill="#29B6F6" />
        </svg>
      );

    case 'react':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );

    case 'fastapi':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" fill="#059669" />
          <path d="M13 3L6 13h5l-1 8 8-11h-5l1-7z" fill="#FFFFFF" />
        </svg>
      );

    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2z" fill="#539E43" />
          <path d="M12 4.5l6.5 3.8v7.4L12 19.5 5.5 15.7V8.3L12 4.5z" fill="#333333" />
          <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="#539E43" />
        </svg>
      );

    case 'express':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#E2E8F0" strokeWidth="1.8">
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#18181B" />
          <path d="M6 8h4v8H6M10 12h3M14 8l4 8M18 8l-4 8" strokeLinecap="round" />
        </svg>
      );

    case 'flask':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#E2E8F0" strokeWidth="1.8">
          <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 16h9" stroke="#38BDF8" />
        </svg>
      );

    case 'vite':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M19.8 4.2L12.7 22l-1.3-.1L4.2 4.2C3.8 3.5 4.4 2.7 5.2 2.8L12 4.1l6.8-1.3c.8-.1 1.4.7 1 1.4z" fill="#9065FF" />
          <path d="M14.5 3L8 14h4l-2 7 7.5-12h-4l1-6z" fill="#FFD028" />
        </svg>
      );

    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M6 12c.7-2 2-3 4-3 3 0 3.5 2 5 2 2 0 3-1 3.5-2.5-.7 2-2 3-4 3-3 0-3.5-2-5-2-2 0-3 1-3.5 2.5zm-3.5 5c.7-2 2-3 4-3 3 0 3.5 2 5 2 2 0 3-1 3.5-2.5-.7 2-2 3-4 3-3 0-3.5-2-5-2-2 0-3 1-3.5 2.5z"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'langgraph':
    case 'mcp':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#F59E0B" strokeWidth="1.8">
          <circle cx="6" cy="6" r="3" fill="#3B2606" />
          <circle cx="18" cy="6" r="3" fill="#3B2606" />
          <circle cx="12" cy="18" r="3" fill="#3B2606" />
          <path d="M8.5 7.5l7 7M15.5 7.5l-7 7M8.5 6h7" strokeLinecap="round" />
        </svg>
      );

    case 'gemini':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
            fill="url(#gemini-grad)"
          />
          <defs>
            <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1BA1E3" />
              <stop offset="0.5" stopColor="#5486FF" />
              <stop offset="1" stopColor="#9B66FF" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'scikitlearn':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="8" cy="12" r="6" fill="#F89939" opacity="0.8" />
          <circle cx="16" cy="12" r="6" fill="#3499CD" opacity="0.8" />
          <path d="M12 8a6 6 0 0 0 0 8 6 6 0 0 0 0-8z" fill="#4B779A" />
        </svg>
      );

    case 'pandas':
    case 'numpy':
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#60A5FA" strokeWidth="2">
          <path d="M4 20h16M7 16v-4M12 16V8M17 16v-6" strokeLinecap="round" />
          <circle cx="12" cy="6" r="1.5" fill="#60A5FA" />
        </svg>
      );

    case 'groq':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="5" fill="#F55036" />
          <path d="M7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0z" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M15 15l3 3" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'search':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38BDF8" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" strokeLinecap="round" />
        </svg>
      );

    case 'joblib':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#34D399" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="3" fill="#064E3B" />
          <path d="M8 8h8M8 12h8M8 16h4" strokeLinecap="round" />
        </svg>
      );

    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2C11.5 2 8 8 8 13c0 3.5 2.5 6 4 7 1.5-1 4-3.5 4-7 0-5-3.5-11-4-11z"
            fill="#47A248"
          />
          <path d="M12 2v18" stroke="#13AA52" strokeWidth="1.5" />
        </svg>
      );

    case 'firebase':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M4.5 16.5L7 3.5l3.5 6.5-6 6.5z" fill="#FFA000" />
          <path d="M4.5 16.5l8-14 2 3.8-10 10.2z" fill="#F57C00" />
          <path d="M19.5 16.5l-7 5.5-8-5.5 15 0z" fill="#FFCA28" />
          <path d="M14.5 6.3l5 10.2-7-14.5 2 4.3z" fill="#FFA000" />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#F05032" />
          <path
            d="M16.5 11.5L12.5 7.5v2.2c-.6.3-1 .8-1 1.5 0 .4.1.7.3 1L9 15c-.3-.1-.6-.2-1-.2-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2c0-.4-.1-.7-.3-1l2.8-2.8c.3.1.6.2 1 .2.6 0 1.2-.3 1.5-.8h1.5v-1.9z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'compiler':
    case 'parser':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#CBD5E1" strokeWidth="1.8">
          <path d="M4 6h16M4 12h10M4 18h14" strokeLinecap="round" />
          <circle cx="18" cy="12" r="2.5" fill="#3B82F6" stroke="none" />
        </svg>
      );

    case 'linux':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" fill="#FCC624" />
          <circle cx="9" cy="10" r="1.5" fill="#000000" />
          <circle cx="15" cy="10" r="1.5" fill="#000000" />
          <path d="M10 14c1 1 3 1 4 0" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'jupyter':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#F37626" strokeWidth="2" transform="rotate(-25 12 12)" />
          <circle cx="8" cy="6" r="1.5" fill="#F37626" />
          <circle cx="16" cy="18" r="1.5" fill="#6E6E6E" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#FFFFFF" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="3" />
        </svg>
      );
  }
}
