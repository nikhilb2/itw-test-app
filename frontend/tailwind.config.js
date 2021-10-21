const theme = require('tailwindcss/defaultTheme');

function createIncrement(initialValue = 1) {
  let value = initialValue;

  return function increment() {
    value += 1;
    return value;
  };
}

const zIndex = createIncrement();

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: ['src/**/*.ts', 'src/**/*.tsx', 'pages/**/*.ts', 'pages/**/*.tsx'],
  theme: {
    colors: {
      black: '#000',
      blue: '#75e9fb',
      'blue-dark': '#26656f',
      'sea-grey': '#9eb2b5',
      transparent: 'transparent',
      white: '#fff',
    },
    fontFamily: {
      sans: ['Roboto', ...theme.fontFamily.sans],
    },
    zIndex: {
      base: zIndex(),
    },
    extend: {
      inset: {
        full: '100%',
      },
    },
  },
  variants: {},
  plugins: [],
};
