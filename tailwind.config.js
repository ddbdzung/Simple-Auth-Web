module.exports = {
  content: [
    './src/components/**/*.jsx',
    './src/pages/**/*.jsx',
    './src/**/*.jsx',
    './src/index.html'
  ],
  theme: {
    screens: {
      'tablet': '992px',
      'laptop': '1200px',
    },
    extend: {
      spacing: {
        '40vh': '40vh'
      },
      colors: {
        'templateColor': 'color: rgb(112, 76, 182)',
      }
    },
  },
  plugins: []
};
