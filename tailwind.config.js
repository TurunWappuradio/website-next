module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      blue: {
        DEFAULT: '#001C36',
        light: '#002447',
      },
      coral: {
        DEFAULT: '#FF6B6B',
      },
      teal: '#5bbfbf',
    },
    fontFamily: {
      sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif']
    },
    fontWeight: {
      normal: 500,
      bold: 600,
    },
    extend: {}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
