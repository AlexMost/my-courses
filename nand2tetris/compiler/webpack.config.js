const path = require('path');

module.exports = {
  target: 'node',
  entry: './JackAnalyzer.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'JackAnalyzer.js'
  }
};