/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#E8E0D2',
        warm: '#E6D5BD',
        card: '#F3EDE1',
        navy: '#0E1D61',
        midnight: '#070F38',
        gold: {
          DEFAULT: '#B89A54',
          text: '#775C1B',
          border: 'rgba(184, 154, 84, 0.35)',
        },
        status: {
          green: '#2E7D5B',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgb(7 15 56 / 0.05), 0 1px 2px rgb(7 15 56 / 0.03)',
        'card-hover': '0 8px 24px rgb(7 15 56 / 0.08), 0 2px 6px rgb(7 15 56 / 0.04)',
        modal: '0 20px 50px rgb(7 15 56 / 0.3)',
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        sheet: '20px',
      },
      maxWidth: {
        container: '1480px',
      },
      transitionDuration: {
        '180': '180ms',
        '220': '220ms',
        '280': '280ms',
        '350': '350ms',
        '450': '450ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-custom': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-custom': 'cubic-bezier(0.4, 0, 1, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        maskReveal: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        portraitSettle: {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        modalEnter: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        modalExit: {
          '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0.96) translateY(12px)' },
        },
        sheetEnter: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        sheetExit: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1) both',
        fadeOut: 'fadeOut 200ms cubic-bezier(0.4, 0, 1, 1) both',
        fadeUp: 'fadeUp 550ms cubic-bezier(0.16, 1, 0.3, 1) both',
        maskReveal: 'maskReveal 650ms cubic-bezier(0.16, 1, 0.3, 1) both',
        portraitSettle: 'portraitSettle 800ms cubic-bezier(0.16, 1, 0.3, 1) both',
        modalEnter: 'modalEnter 240ms cubic-bezier(0.16, 1, 0.3, 1) both',
        modalExit: 'modalExit 180ms cubic-bezier(0.4, 0, 1, 1) both',
        sheetEnter: 'sheetEnter 300ms cubic-bezier(0.16, 1, 0.3, 1) both',
        sheetExit: 'sheetExit 220ms cubic-bezier(0.4, 0, 1, 1) both',
        floatSubtle: 'floatSubtle 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
