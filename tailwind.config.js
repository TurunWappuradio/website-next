module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      blue: {
        dark: '#001326',
        DEFAULT: '#001C36',
        light: '#002447',
      },
      coral: '#F65F52',
      teal: '#5bbfbf',
    },
    fontFamily: {
      sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif']
    },
    fontWeight: {
      normal: 500,
      bold: 600,
    },
    extend: {
      height: {
        '128': '32rem',
        '192': '48rem',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
