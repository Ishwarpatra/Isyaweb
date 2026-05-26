import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFA500',
        secondary: '#EC4899',
        accent: '#3B82F6',
        dark: '#0B0F19',
        'dark-secondary': '#05080F',
      },
      fontSize: {
        // Remove micro-text, enforce WCAG AA minimum 14px (0.875rem)
        'micro': '0.75rem', // 12px - minimum readable size
        'xs': '0.875rem', // 14px - readable labels
        'sm': '1rem', // 16px - body text minimum
      },
      spacing: {
        // Consistent 4px-based scale
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
      },
      lineHeight: {
        'tight': 1.1,
        'normal': 1.5,
        'relaxed': 1.75,
      },
      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.05em',
        'wider': '0.1em',
        'extrawide': '0.18em',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'live-pulse': 'live-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'live-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-orange': '0 0 20px rgba(255, 165, 0, 0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
