/** Orange + Black brand themes (palette: #FFD3AA · #FFA95B · #FF7F00 · #B05400 · #522600 · #000000) */
const shared = {
  'primary': '#FF7F00',
  'primary-content': '#1A0C00',
  'accent': '#FFA95B',
  'accent-content': '#1A0C00',
  'success-content': '#FFFFFF',
  'error-content': '#FFFFFF',
  'warning-content': '#1A0C00',
  '--rounded-box': '1.25rem',
  '--rounded-btn': '999px',
  '--rounded-badge': '999px',
  '--animation-btn': '0.2s',
  '--btn-focus-scale': '0.97',
  '--btn-text-case': 'none',
  '--border-btn': '1.5px',
  '--tab-radius': '0.75rem',
};

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'DM Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: { cream: '#FFD3AA', peach: '#FFA95B', orange: '#FF7F00', rust: '#B05400', brown: '#522600', black: '#000000' },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        rentlight: {
          ...shared,
          'secondary': '#B05400',
          'secondary-content': '#FFFFFF',
          'neutral': '#140A03',
          'neutral-content': '#FFE7CF',
          'base-100': '#FFFFFF',
          'base-200': '#FFF4E8',
          'base-300': '#FFDFC0',
          'base-content': '#2A1400',
          'info': '#B05400',
          'info-content': '#FFFFFF',
          'success': '#16803C',
          'warning': '#F5A300',
          'error': '#D92D20',
        },
        rentdark: {
          ...shared,
          'color-scheme': 'dark',
          'secondary': '#FFA95B',
          'secondary-content': '#1A0C00',
          'neutral': '#000000',
          'neutral-content': '#FFE7CF',
          'base-100': '#140B05',
          'base-200': '#0A0502',
          'base-300': '#2B1709',
          'base-content': '#FFEBD8',
          'info': '#FFA95B',
          'info-content': '#1A0C00',
          'success': '#34C46B',
          'success-content': '#04210F',
          'warning': '#FFC23D',
          'error': '#FF6B5E',
          'error-content': '#2A0500',
        },
      },
    ],
  },
};
