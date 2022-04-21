module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',

      md: '768px',

      lg: '1160px', // Default 1024px

      xl: '1420px', // Default 1280px

      '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      blue: {
        darkestest: '#000e1c',
        darkest: '#001326',
        dark: '#001831',
        DEFAULT: '#001C36',
        light: '#00254a',
        lightest: '#60A3EE',
      },
      coral: '#F65F52',
      teal: '#5bbfbf',
    },
    fontFamily: {
      sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontWeight: {
      normal: 400,
      bold: 600,
    },
    extend: {
      width: {
        128: '32rem',
        144: '36rem',
        160: '40rem',
        192: '48rem',
        256: '64rem',
      },
      height: {
        128: '32rem',
        144: '36rem',
        160: '40rem',
        192: '48rem',
        256: '64rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
