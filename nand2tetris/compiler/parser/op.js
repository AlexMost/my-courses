const { isOp, OPS } = require('./types');
const { ParserError } = require('./errors');

function parse(tokenizer) {
    const token = tokenizer.next();
    if (isOp(token)) {
        return token;
    }
    throw new ParserError(token, `one of ${Array.from(OPS)}`);
}


module.exports = parse;
