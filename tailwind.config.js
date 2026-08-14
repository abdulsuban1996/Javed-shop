/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B1220',
          'navy-dark': '#060A12',
          'navy-light': '#1E293B',
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          'blue-light': '#EFF6FF',
          green: '#25C55E',
          'green-dark': '#16A34A',
          'green-light': '#F0FDF4',
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#111827',
          muted: '#64748B',
          border: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
        bengali: ['var(--font-anek-bangla)', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '24px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(11, 18, 32, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(11, 18, 32, 0.08), 0 1px 2px -1px rgba(11, 18, 32, 0.08)',
        md: '0 4px 6px -1px rgba(11, 18, 32, 0.08), 0 2px 4px -2px rgba(11, 18, 32, 0.08)',
        lg: '0 10px 15px -3px rgba(11, 18, 32, 0.08), 0 4px 6px -4px rgba(11, 18, 32, 0.08)',
        xl: '0 20px 25px -5px rgba(11, 18, 32, 0.08), 0 8px 10px -6px rgba(11, 18, 32, 0.08)',
      }
    },
  },
  plugins: [],
};
