const { Tokenizer } = require('./tokenizer');
const parseClass = require('./parser/class');

function parseAST(rawText) {
    /* eslint-disable new-cap,no-console */
    const tokenizer = new Tokenizer(rawText);
    try {
        const AST = parseClass(tokenizer);
        return AST;
    } catch (err) {
        console.log(err.message);
        console.log(tokenizer.printLastLine());
        throw new err();
    }
}

module.exports = parseAST;
