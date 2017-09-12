const { Tokenizer } = require('./tokenizer');
const parseClass = require('./parser/class');

function parseAST(rawText) {
    const tokenizer = new Tokenizer(rawText);
    const AST = parseClass(tokenizer);
    return AST;
}

module.exports = parseAST;
