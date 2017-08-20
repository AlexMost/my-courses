const path = require('path');

module.exports = {
  target: 'node',
  entry: './VMTranslator.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'VMTranslator.js'
  }
};