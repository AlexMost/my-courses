const { isUnary, UNARY } = require('./types');
const { ParserError } = require('./errors');

function parse(tokenizer) {
    const token = tokenizer.next();
    if (isUnary(token)) {
        return token;
    }
    throw new ParserError(token, `one of ${Array.from(UNARY)}`);
}

module.exports = parse;
