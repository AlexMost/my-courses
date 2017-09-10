const { ASTNode } = require('./types');
const { isIntegerConst, isStringConst, isIdentifier } = require('../tokenizer/types');
const { isKeywordConstant } = require('./types');
const { ParserErrror } = require('./errors');

function parse(tokenizer) {
    const token = tokenizer.next();

    if (isIntegerConst(token) || isStringConst(token) || isKeywordConstant(token)) {
        return new ASTNode('term', [token]);
    } else if (isIdentifier(token)) {
        return new ASTNode('term', [token]);
    }

    throw new ParserErrror(token, 'Expression term');
}


module.exports = parse;
