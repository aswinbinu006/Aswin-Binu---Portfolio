import React from 'react';

export interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-9 h-9' }) => {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  switch (normalized) {
    // 1. Python (Official Python Software Foundation Logo)
    case 'python':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <defs>
            <linearGradient id="pyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#387EB8" />
              <stop offset="100%" stopColor="#366994" />
            </linearGradient>
            <linearGradient id="pyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE873" />
              <stop offset="100%" stopColor="#FFD43B" />
            </linearGradient>
          </defs>
          <path
            d="M63.5 4c-32.8 0-30.8 14.2-30.8 14.2l.03 14.7H64v4.2H21.2S4 35.1 4 68c0 32.9 15 31.7 15 31.7h8.9v-12.5s-.5-15 14.7-15h25.4s14.2.2 14.2-13.8V44S85.2 4 63.5 4zm-9 9.6a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6z"
            fill="url(#pyBlue)"
          />
          <path
            d="M64.5 124c32.8 0 30.8-14.2 30.8-14.2l-.03-14.7H64v-4.2h42.8S124 92.9 124 60c0-32.9-15-31.7-15-31.7h-8.9v12.5s.5 15-14.7 15H60s-14.2-.2-14.2 13.8V84s-2 40 19.7 40zm9-9.6a4.8 4.8 0 110-9.6 4.8 4.8 0 010 9.6z"
            fill="url(#pyYellow)"
          />
        </svg>
      );

    // 2. C++ (Official C++ ISO Committee Logo)
    case 'cpp':
    case 'cplusplus':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <polygon points="64,5 115,34.5 115,93.5 64,123 13,93.5 13,34.5" fill="#00599C" />
          <polygon points="64,13 108,38.5 108,89.5 64,115 20,89.5 20,38.5" fill="#004482" />
          <path d="M72 45c-2-3-6-5-11-5-10 0-18 8-18 24s8 24 18 24c5 0 9-2 11-5v9c-3 2-7 3-12 3-16 0-27-13-27-31s11-31 27-31c5 0 9 1 12 3V45z" fill="#FFFFFF" />
          <path d="M83 60h6v-6h5v6h6v5h-6v6h-5v-6h-6v-5zm22 0h6v-6h5v6h6v5h-6v6h-5v-6h-6v-5z" fill="#00A0E2" />
        </svg>
      );

    // 3. C (Official C Language Logo)
    case 'c':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <polygon points="64,5 115,34.5 115,93.5 64,123 13,93.5 13,34.5" fill="#A8B9CC" />
          <polygon points="64,13 108,38.5 108,89.5 64,115 20,89.5 20,38.5" fill="#283593" />
          <path d="M80 43c-3-3-8-5-14-5-13 0-23 11-23 26s10 26 23 26c6 0 11-2 14-5v11c-4 2-9 3-15 3-20 0-35-15-35-35s15-35 35-35c6 0 11 1 15 3v11z" fill="#FFFFFF" />
        </svg>
      );

    // 4. JavaScript (Official JS Yellow Square Logo)
    case 'javascript':
    case 'js':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="16" fill="#F7DF1E" />
          <path d="M37.6 104.2c2.5 1.5 5.5 2.5 8.7 2.5 6.4 0 10.3-3.2 10.3-10.8V60.7h-12.4v35.1c0 3.8-1.5 5.2-4.5 5.2-1.8 0-3.3-.6-4.6-1.5l2.5 4.7zm40.5-1.1c3.5 2.1 8.2 3.6 13.5 3.6 12.3 0 18.9-6.3 18.9-15.5 0-8.6-5.3-13.1-15.3-17.4-6.8-2.9-9.5-5.2-9.5-9.4 0-3.8 3.1-6.7 8.2-6.7 4.2 0 7.4 1.3 9.7 2.7l3.1-9.6c-2.8-1.5-6.8-2.6-11.9-2.6-11.8 0-18.4 6.7-18.4 15.6 0 8.5 5.5 13.2 14.6 17.1 7.2 3.1 10.2 5.6 10.2 9.9 0 4.3-3.6 7.4-9.5 7.4-4.8 0-8.9-1.7-11.8-3.4l-3.8 8.7z" fill="#000000" />
        </svg>
      );

    // 5. TypeScript (Official TypeScript Blue Square Logo)
    case 'typescript':
    case 'ts':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="16" fill="#3178C6" />
          <path d="M22 48h38v10H46v50H34V58H22V48zm47 48.7c3.4 2 8 3.3 13 3.3 12 0 18.4-6.1 18.4-15 0-8.3-5.2-12.6-14.9-16.7-6.6-2.8-9.2-5-9.2-9 0-3.7 3-6.4 7.9-6.4 4.1 0 7.2 1.3 9.4 2.6l3-9.2c-2.7-1.5-6.6-2.5-11.6-2.5-11.4 0-17.8 6.4-17.8 15 0 8.2 5.3 12.7 14.2 16.4 7 3 9.9 5.4 9.9 9.5 0 4.1-3.5 7.1-9.2 7.1-4.7 0-8.6-1.6-11.5-3.3l-3.6 8.6z" fill="#FFFFFF" />
        </svg>
      );

    // 6. Java (Official Java Steaming Cup Logo)
    case 'java':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M46.7 101.4s-6.2 3.6 4.3 4.8c12.7 1.5 19.3 1.3 33.3-.7 0 0 4.6 2.8 11.2 5.1-40.4 16.9-80.4-1.9-48.8-9.2zm-4.3-15.5s-7.1 5.1 3.6 6.3c13 1.5 23.9 1.5 42.1-.9 0 0 3.3 2.5 8.1 4.3-43.1 13.9-87.4 1.5-53.8-9.7zm25.9-26.6c6.1 7 1.5 13.2-12.7 20-3.8 1.8-7.9 3.6-11.9 5.1 13.5-9.7 18.8-15 24.6-25.1zm22.3 29.7c26.6-13.9 14.2-27.4 5.6-25.6-2.3.5-3.3.8-3.3.8s1 1 2.8 1.3c6.1 1 12.7 8.9-5.1 18.5v5zm-33.5-54.8c-2.3 8.4 6.3 16 16.2 22.1 4.1 2.5 7.6 5.1 10.7 7.9-10.7-9.4-19.3-18.3-26.9-30zm30.4-11.9c-2.5 6.1-8.1 12.2-15 18.3 9.1-8.6 15.5-17.5 15-18.3z" fill="#5382A1" />
          <path d="M90.9 90.9c20-10.4 10.7-20.6 4.2-19.2-1.7.4-2.5.6-2.5.6s.8.8 2.1 1c4.6.8 9.5 6.7-3.8 13.9v3.7zM34.8 116.8c29.2 1.8 60.1-.9 60.1-.9s-4.3 3.6-11.9 6.3c-28.7 10.2-67.7-1.3-48.2-5.4z" fill="#E76F00" />
        </svg>
      );

    // 7. Scikit-learn (Official SciKit Learn Network Logo)
    case 'scikitlearn':
    case 'sklearn':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M72.5 24.5a35 35 0 00-47 43l13-7.5a20 20 0 0127-24.5l7-11z" fill="#F89939" />
          <path d="M55.5 103.5a35 35 0 0047-43l-13 7.5a20 20 0 01-27 24.5l-7 11z" fill="#3499CD" />
          <circle cx="25.5" cy="67.5" r="13.5" fill="#F89939" />
          <circle cx="102.5" cy="60.5" r="13.5" fill="#3499CD" />
          <circle cx="64" cy="64" r="12" fill="#0A3C6B" />
          <line x1="25.5" y1="67.5" x2="64" y2="64" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="102.5" y1="60.5" x2="64" y2="64" stroke="#FFFFFF" strokeWidth="4" />
        </svg>
      );

    // 8. TensorFlow (Official 3D Isometric T Logo)
    case 'tensorflow':
    case 'tf':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <polygon points="64,12 112,39 112,65 64,38" fill="#FF6F00" />
          <polygon points="64,38 112,65 112,116 64,89" fill="#FFA800" />
          <polygon points="16,39 64,12 64,89 16,62" fill="#E65100" />
          <polygon points="64,48 88,61 88,88 64,74" fill="#FF8F00" />
          <polygon points="40,61 64,48 64,102 40,88" fill="#F57C00" />
        </svg>
      );

    // 9. Keras (Official Keras Red K Logo)
    case 'keras':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#D00000" />
          <path d="M36 26h18v34.5L85 26h22L72.5 63 108 102H85L54 67.5V102H36V26z" fill="#FFFFFF" />
        </svg>
      );

    // 10. XGBoost (Official XGBoost Gradient Chevron Logo)
    case 'xgboost':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <defs>
            <linearGradient id="xgbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B87C2" />
              <stop offset="100%" stopColor="#1B3A57" />
            </linearGradient>
            <linearGradient id="xgbAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2BB673" />
              <stop offset="100%" stopColor="#00A896" />
            </linearGradient>
          </defs>
          <rect width="128" height="128" rx="20" fill="url(#xgbGrad)" />
          <polygon points="30,34 52,34 98,94 76,94" fill="#FFFFFF" opacity="0.95" />
          <polygon points="76,34 98,34 52,94 30,94" fill="url(#xgbAccent)" />
        </svg>
      );

    // 11. OpenAI (Official OpenAI Blooming Rosette Logo)
    case 'openai':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path
            d="M112.5 53.6a30.5 30.5 0 00-2.3-17.1 31.4 31.4 0 00-22.6-16 30.6 30.6 0 00-14.7-16.7 31.5 31.5 0 00-27.4-1.5 31.7 31.7 0 00-13.8 10.4 31.6 31.6 0 00-15.6 22.8 30.6 30.6 0 00-12.4 18.2 31.5 31.5 0 004.8 26.9 31.4 31.4 0 002.3 17.1 31.4 31.4 0 0022.6 16 30.6 30.6 0 0014.7 16.7 31.5 31.5 0 0027.4 1.5 31.7 31.7 0 0013.8-10.4 31.6 31.6 0 0015.6-22.8 30.6 30.6 0 0012.4-18.2 31.5 31.5 0 00-4.8-26.9zM64 77.2L50.4 69.4l-.4-15.4L64 45.7l13.6 7.9.4 15.4L64 77.2zm-28-5.3l-.3-12.7 10.8-6.3 11 6.3v12.7L46.8 78 36 71.9zm33.5 19.4l-11-6.3v-12.7l10.8-6.3 11 6.3.3 12.7-11.1 6.3zm19.8-12.8L78.2 78l-10.7-6.2V59.1l11-6.4 11.1 6.4-.3 13.4zM49.2 49.3L38.4 55.6l-.3-13.4 10.7-6.2 11.1 6.4-10.7 6.9zm14.8-12.6l11 6.3V55.7l-10.8 6.3-11-6.3-.3-12.7 11.1-6.3z"
            fill="#10A37F"
          />
        </svg>
      );

    // 12. React (Official React Cyan Atom Logo)
    case 'react':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <ellipse cx="64" cy="64" rx="54" ry="21" stroke="#61DAFB" strokeWidth="6" transform="rotate(0 64 64)" />
          <ellipse cx="64" cy="64" rx="54" ry="21" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 64 64)" />
          <ellipse cx="64" cy="64" rx="54" ry="21" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 64 64)" />
          <circle cx="64" cy="64" r="10" fill="#61DAFB" />
        </svg>
      );

    // 13. Next.js (Official Next.js Black Monogram Logo)
    case 'nextjs':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="60" fill="#000000" />
          <path d="M44 38v52h10V56l38 46.5c2.3-1.6 4.5-3.4 6.5-5.3L48.5 38H44zm36 0h10v35l-10-12.5V38z" fill="#FFFFFF" />
        </svg>
      );

    // 14. Tailwind CSS (Official Dual Cyan Wave Logo)
    case 'tailwindcss':
    case 'tailwind':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M32 64c8-10.7 18.7-16 32-16 18.7 0 24 13.3 32 16 8 2.7 16-2.7 21.3-10.7-8 10.7-18.7 16-32 16-18.7 0-24-13.3-32-16-8-2.7-16 2.7-21.3 10.7zm-21.3 26.7C18.7 80 29.3 74.7 42.7 74.7c18.7 0 24 13.3 32 16 8 2.7 16-2.7 21.3-10.7-8 10.7-18.7 16-32 16-18.7 0-24-13.3-32-16-8-2.7-16 2.7-21.3 10.7z"
            fill="#06B6D4"
          />
        </svg>
      );

    // 15. HTML5 (Official W3C Orange Shield Logo)
    case 'html':
    case 'html5':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M19 13l9 101 36 10 36-10 9-101H19z" fill="#E44D26" />
          <path d="M64 114l29-8 7.5-84H64v92z" fill="#F16529" />
          <path d="M64 43h-20l1.4 16H64v-16zm0 33H53.5l-.8-9H42l1.7 20h20.3v-11zM64 43v16h20.4l-1.9 21-18.5 5v16.5l33.4-9.3L100 43H64z" fill="#FFFFFF" />
        </svg>
      );

    // 16. CSS3 (Official W3C Blue Shield Logo)
    case 'css':
    case 'css3':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M19 13l9 101 36 10 36-10 9-101H19z" fill="#1572B6" />
          <path d="M64 114l29-8 7.5-84H64v92z" fill="#33A9DC" />
          <path d="M64 43h-20l1.4 16H64v-16zm0 33H53.5l-.8-9H42l1.7 20h20.3v-11zM64 43v16h20.4l-1.9 21-18.5 5v16.5l33.4-9.3L100 43H64z" fill="#FFFFFF" />
        </svg>
      );

    // 17. NumPy (Official NumPy Matrix Cube Logo)
    case 'numpy':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <polygon points="64,12 110,38 110,90 64,116 18,90 18,38" fill="#013243" />
          <polygon points="64,16 106,40 106,88 64,112 22,88 22,40" fill="#4DABCF" />
          <path d="M42 42v44l18-22v22h12V42L54 64V42H42zm36 0h12v44H78V42z" fill="#013243" />
        </svg>
      );

    // 18. Pandas (Official Pandas Dataframe Striped Logo)
    case 'pandas':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect x="24" y="24" width="16" height="80" rx="8" fill="#150458" />
          <rect x="56" y="44" width="16" height="60" rx="8" fill="#E70488" />
          <rect x="88" y="60" width="16" height="44" rx="8" fill="#00A3E0" />
          <circle cx="64" cy="30" r="7" fill="#E70488" />
          <circle cx="96" cy="46" r="7" fill="#00A3E0" />
        </svg>
      );

    // 19. Matplotlib (Official Matplotlib Wheel / Sine Logo)
    case 'matplotlib':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="54" fill="#11557C" />
          <circle cx="64" cy="64" r="44" fill="#FFFFFF" />
          <path d="M26 64c12-28 26-28 38 0s26 28 38 0" stroke="#11557C" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M26 64c12 28 26 28 38 0s26-28 38 0" stroke="#FF7F0E" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
      );

    // 20. Seaborn (Official Seaborn Wave Distribution Logo)
    case 'seaborn':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="54" fill="#4C72B0" />
          <path d="M24 84c16-36 32-52 48-16s32-40 32-40" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" fill="none" />
          <circle cx="72" cy="68" r="8" fill="#55A868" />
          <circle cx="40" cy="48" r="7" fill="#C44E52" />
        </svg>
      );

    // 21. Recharts (Official Recharts Bar Pillar Logo)
    case 'recharts':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect x="20" y="70" width="16" height="38" rx="4" fill="#22B5BF" />
          <rect x="44" y="50" width="16" height="58" rx="4" fill="#3182CE" />
          <rect x="68" y="32" width="16" height="76" rx="4" fill="#805AD5" />
          <rect x="92" y="16" width="16" height="92" rx="4" fill="#D53F8C" />
        </svg>
      );

    // 22. PostgreSQL (Official Slonik Elephant Logo)
    case 'postgresql':
    case 'postgres':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M64 12C37 12 18 28 18 49c0 14.6 9.3 27.2 23.5 33.6v23.8l16.4-11 16.4 11V82.6C88.7 76.2 98 63.6 98 49c0-21-19-37-46-37z"
            fill="#336791"
          />
          <path d="M42 45c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7zm30 0c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z" fill="#FFFFFF" />
          <circle cx="42" cy="52" r="3.5" fill="#1C3852" />
          <circle cx="72" cy="52" r="3.5" fill="#1C3852" />
          <path d="M57 95V68c0-5 3-9 7-9s7 4 7 9v27" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      );

    // 23. Firebase (Official Firebase Tricolor Flame Logo)
    case 'firebase':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M22 93L53 22l14 27L22 93z" fill="#FFA000" />
          <path d="M78 52l-11-20 39 61-28-41z" fill="#F57C00" />
          <path d="M22 93l42 25 42-25L64 18 22 93z" fill="#FFCA28" />
        </svg>
      );

    // 24. Supabase (Official Supabase Emerald Lightning Bolt)
    case 'supabase':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M70 12L18 76h42l-10 40 52-64H60l10-40z"
            fill="#3ECF8E"
          />
        </svg>
      );

    // 25. Google Cloud (Official GCP 6-Facet Cloud Logo)
    case 'googlecloud':
    case 'gcp':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M84 48c0-13.3-10.7-24-24-24-10.7 0-19.8 7-22.9 16.8A24 24 0 0016 64a24 24 0 0024 24h44a20 20 0 000-40z" fill="#4285F4" />
          <path d="M40 88h44a20 20 0 000-40 24 24 0 00-4.3.4C80 34.6 69.3 24 56 24" fill="#34A853" opacity="0.8" />
          <circle cx="48" cy="72" r="10" fill="#EA4335" />
          <circle cx="84" cy="72" r="8" fill="#FBBC05" />
        </svg>
      );

    // 26. Vercel (Official Vercel Solid Triangle Logo)
    case 'vercel':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <polygon points="64,16 12,112 116,112" fill="#000000" />
        </svg>
      );

    // 27. Git (Official Git Rhomboid Branch Logo)
    case 'git':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#F05032" />
          <path d="M96 64L64 32 32 64l32 32 32-32z" fill="#FFFFFF" />
          <circle cx="64" cy="48" r="6" fill="#F05032" />
          <circle cx="48" cy="64" r="6" fill="#F05032" />
          <circle cx="80" cy="64" r="6" fill="#F05032" />
          <path d="M64 48v24M48 64l16 8" stroke="#F05032" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    // 28. GitHub (Official GitHub Octocat Mark)
    case 'github':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="60" fill="#181717" />
          <path
            d="M64 26a38 38 0 00-12 74c1.9.3 2.6-.8 2.6-1.8v-6.9c-10.6 2.3-12.8-5.1-12.8-5.1-1.7-4.4-4.2-5.6-4.2-5.6-3.5-2.4.3-2.3.3-2.3 3.8.3 5.8 4 5.8 4 3.4 5.8 9 4.1 11.2 3.1.3-2.5 1.3-4.1 2.4-5.1-8.5-1-17.4-4.2-17.4-18.9 0-4.2 1.5-7.6 4-10.3-.4-1-1.7-4.9.4-10.2 0 0 3.2-1 10.5 3.9a36.6 36.6 0 0119.2 0c7.3-5 10.5-3.9 10.5-3.9 2.1 5.3.8 9.2.4 10.2 2.5 2.7 4 6.1 4 10.3 0 14.7-8.9 17.9-17.5 18.8 1.4 1.2 2.6 3.5 2.6 7.1v10.5c0 1 .7 2.2 2.6 1.8A38 38 0 0064 26z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // 29. VS Code (Official Visual Studio Code Ribbon Logo)
    case 'vscode':
    case 'visualstudiocode':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M96 16l-48 42-20-16-12 6v64l12 6 20-16 48 42 16-8V24l-16-8z" fill="#007ACC" />
          <path d="M96 28L48 64l48 36V28z" fill="#0065A9" />
          <path d="M16 48l32 16-32 16V48z" fill="#1F9CF0" />
        </svg>
      );

    // 30. Docker (Official Docker Whale & Container Blocks)
    case 'docker':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect x="24" y="52" width="12" height="12" rx="2" fill="#2496ED" />
          <rect x="40" y="52" width="12" height="12" rx="2" fill="#2496ED" />
          <rect x="56" y="52" width="12" height="12" rx="2" fill="#2496ED" />
          <rect x="40" y="36" width="12" height="12" rx="2" fill="#2496ED" />
          <rect x="56" y="36" width="12" height="12" rx="2" fill="#2496ED" />
          <rect x="72" y="52" width="12" height="12" rx="2" fill="#2496ED" />
          <path
            d="M116 68c-2.4-1.2-5.2-1.6-7.8-1.1-2.6.5-5 1.8-6.8 3.7-5.5-3.5-12-5.4-18.7-5.4H15c-2.4 11 2.2 22.4 11.4 28.5C36 100 50 102 64 102c26 0 46-12 52-34z"
            fill="#2496ED"
          />
          <circle cx="100" cy="76" r="3" fill="#FFFFFF" />
        </svg>
      );

    // 31. Figma (Official Figma 5-Piece Multicolored Logo)
    case 'figma':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M34 16h30v32H34a16 16 0 010-32z" fill="#F24E1E" />
          <path d="M64 16h30a16 16 0 010 32H64V16z" fill="#FF7262" />
          <path d="M34 48h30v32H34a16 16 0 010-32z" fill="#A259FF" />
          <circle cx="80" cy="64" r="16" fill="#1ABCFE" />
          <path d="M34 80h30v16a16 16 0 01-30 0V80z" fill="#0ACF83" />
        </svg>
      );

    // 32. Red Hat (Official Red Hat Fedora Logo)
    case 'redhat':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M112 76c-3-12-16-20-32-22-2-7-8-18-18-18-12 0-20 12-24 22-16 2-26 10-26 18 0 10 16 18 36 20 22 2 46-2 60-12 4-2 5-5 4-8z" fill="#EE0000" />
          <path d="M62 58c0 10 12 18 28 20 12 1 20-3 22-8-3-8-16-12-28-12h-22z" fill="#000000" />
        </svg>
      );

    // 33. Linux (Official Tux Penguin Logo)
    case 'linux':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <ellipse cx="64" cy="68" rx="34" ry="46" fill="#000000" />
          <ellipse cx="64" cy="74" rx="24" ry="36" fill="#FFFFFF" />
          <ellipse cx="64" cy="34" rx="20" ry="18" fill="#000000" />
          <circle cx="56" cy="32" r="4" fill="#FFFFFF" />
          <circle cx="72" cy="32" r="4" fill="#FFFFFF" />
          <circle cx="57" cy="33" r="2" fill="#000000" />
          <circle cx="71" cy="33" r="2" fill="#000000" />
          <polygon points="64,36 54,46 74,46" fill="#FFA500" />
          <ellipse cx="44" cy="114" rx="14" ry="8" fill="#FFA500" />
          <ellipse cx="84" cy="114" rx="14" ry="8" fill="#FFA500" />
        </svg>
      );

    // 34. ServiceNow (Official ServiceNow Workflow Logo)
    case 'servicenow':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="54" fill="#032D42" />
          <path d="M42 42h44a22 22 0 0122 22v0a22 22 0 01-22 22H42a22 22 0 01-22-22v0a22 22 0 0122-22z" fill="none" stroke="#81B5A1" strokeWidth="12" />
          <circle cx="64" cy="64" r="14" fill="#81B5A1" />
        </svg>
      );

    // 35. Jupyter (Official Jupyter Planetary Rings Logo)
    case 'jupyter':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <ellipse cx="64" cy="64" rx="52" ry="24" fill="none" stroke="#767676" strokeWidth="8" transform="rotate(-30 64 64)" />
          <circle cx="64" cy="28" r="12" fill="#F37626" />
          <circle cx="64" cy="100" r="12" fill="#F37626" />
          <circle cx="38" cy="80" r="8" fill="#6E6E6E" />
          <circle cx="90" cy="48" r="8" fill="#6E6E6E" />
        </svg>
      );

    // 36. FastAPI (Official FastAPI Teal Lightning Logo)
    case 'fastapi':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="54" fill="#05998B" />
          <polygon points="68,26 34,70 60,70 56,102 94,58 68,58" fill="#FFFFFF" />
        </svg>
      );

    default:
      return (
        <div className="w-10 h-10 rounded-xl bg-warm/60 border border-gold-border/60 flex items-center justify-center font-bold text-xs text-navy font-mono shadow-xs">
          {name.slice(0, 3).toUpperCase()}
        </div>
      );
  }
};
