import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5fa',
          100: '#e1ebf4',
          200: '#c5d9eb',
          300: '#9bc0e0',
          400: '#6ca1ce',
          500: '#4b85b6',
          600: '#396b99',
          700: '#2f567e',
          800: '#284768',
          900: '#243c56',
          950: '#18273a',
        },
        slate: {
          50: '#f6f7f8',
          100: '#ebedef',
          200: '#d3d7dc',
          300: '#adb5bf',
          400: '#818d9b',
          500: '#606e7e',
          600: '#4c5866',
          700: '#3f4955',
          800: '#363d46',
          900: '#2f353c',
          950: '#1d2126',
        },
        surface: {
          50: '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
        }
      },
      fontFamily: {
        sans: ['"Zen Kaku Gothic New"', 'sans-serif'],
        display: ['"Zen Old Mincho"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(47, 86, 126, 0.05)',
        'hover': '0 10px 30px -5px rgba(47, 86, 126, 0.1)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'fade-in': 'fadeIn 0.7s ease-out',
        drift: 'drift 9s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
      },
      backgroundImage: {
        'mesh-light': 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 48%, #e1ebf4 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config
