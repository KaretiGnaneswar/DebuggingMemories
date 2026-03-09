/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rich-black': '#0A0A0A',
        'rich-dark': '#1A1A1A',
        'rich-gray': '#2D2D2D',
        'rich-silver': '#8B8B8B',
        'rich-gold': '#D4AF37',
        'rich-platinum': '#E5E4E2',
        'rich-pearl': '#F8F6F0',
        'rich-burgundy': '#800020',
        'rich-navy': '#000080',
        'rich-forest': '#228B22',
        'rich-royal': '#4169E1',
        'rich-emerald': '#50C878',
        'rich-ruby': '#E0115F',
        'rich-sapphire': '#082567',
        'rich-amber': '#FFBF00',
        'rich-copper': '#B87333',
        'rich-bronze': '#CD7F32',
        'rich-ivory': '#FFFFF0',
        'rich-charcoal': '#36454F',
        'rich-steel': '#71797E',
        'rich-slate': '#708090',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'rotate-slow': 'rotate-slow 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      }
    },
  },
  plugins: [],
}
