const isSyssyColors = true;

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
      radio: isSyssyColors
        ? // Syssy
          {
            common: '#9b3970',
            controller: '#58265d',
            bg: '#230127',
            bg200: '#58265d',
            action: '#db8841',
            accent: '#db8841',
            accent200: '#eef2b0',
            secondary: '#9b3970',
            promote: '#9b3970',
            night: '#58265d',
          }
        : // Wappu
          {
            common: '#001C36',
            controller: '#000e1c',
            bg: '#001C36',
            bg200: '#001831',
            action: '#5bbfbf',
            accent: '#F65F52',
            accent200: '#F65F52',
            secondary: '#5bbfbf',
            header: '#F65F52',
            promote: '#5bbfbf',
            night: '#60A3EE',
          },
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
