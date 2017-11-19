const path = require('path');

module.exports = {
    target: 'node',
    entry: {
        JackAnalyzer: './JackAnalyzer.js',
        JackCompiler: './JackCompiler.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};
