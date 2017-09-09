const { validateIdentifier } = require('./validate');
const { KEYWORDS, isKeyword } = require('../tokenizer/types');
const { ParserError } = require('./errors');

const types = new Set([KEYWORDS.int, KEYWORDS.char, KEYWORDS.boolean]);


function parse(tokenizer) {
    const token = tokenizer.next();
    if (isKeyword(token)) {
        if (!types.has(token.getValue())) {
            throw new ParserError(token, `must be in ${types}`);
        }
        return token;
    }
    validateIdentifier(token);
    return token;
}


module.exports = parse;
