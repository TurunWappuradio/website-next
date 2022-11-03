module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
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
      orange: {
        DEFAULT: '#db8841',
      },
      purple: {
        light: '#58265d',
        dark: '#9b3970',
        darkest: '#230127',
      },
      coral: '#F65F52',
      teal: '#5bbfbf',
      greyish: '#eef2b0',
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
