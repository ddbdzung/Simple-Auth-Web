module.exports = {
  content: [
    './src/components/**/*.jsx',
    './src/pages/**/*.jsx',
    './src/**/*.jsx',
    './src/index.html'
  ],
  theme: {
    extend: {
      spacing: {
        '40vh': '40vh'
      },
      colors: {
        'templateColor': 'color: rgb(112, 76, 182)',
      }
    },
    fontSize: {
      template: 'calc(10px + 2vmin)',
    }
  },
  plugins: []
};
