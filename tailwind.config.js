/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        blush: {
          light: '#fff5f7',
          pink: '#ffd6e0',
          rose: '#ffb3c6',
          deep: '#ff85a1',
          gold: '#f7d698',
          goldDark: '#e5b25d'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        cursive: ['Dancing Script', 'Pacifico', 'cursive']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'bounce-soft': 'bounceSoft 2s infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(255, 182, 193, 0.4), 0 0 30px rgba(255, 105, 180, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 182, 193, 0.8), 0 0 50px rgba(255, 105, 180, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
