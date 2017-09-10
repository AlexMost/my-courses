const { ASTNode } = require('./types');
const { isIntegerConst, isStringConst, isIdentifier } = require('../tokenizer/types');
const { isKeywordConstant } = require('./types');

function parse(tokenizer) {
    const token = tokenizer.next();
    tokenizer.back();

    if (isIntegerConst(token) || isStringConst(token) || isKeywordConstant(token)) {
        return new ASTNode('term', [token]);
    } else if (isIdentifier(token)) {
        return new ASTNode('term', [token]);
    }
}


module.exports = parse;
