const { ASTNode } = require('./types');
const { isIntegerConst, isStringConst, isIdentifier, isSymbol } = require('../tokenizer/types');
const { isKeywordConstant } = require('./types');
const { ParserErrror } = require('./errors');


function parse(tokenizer) {
    const Parser = require('./parse');
    const token = tokenizer.next();
    const second = tokenizer.next();
    tokenizer.back();
    if (isIntegerConst(token) || isStringConst(token) || isKeywordConstant(token)) {
        return new ASTNode('term', [token]);
    } else if (isIdentifier(token) && second && isSymbol(second) && second.getValue() === '[') {
        const p = new Parser(tokenizer);
        const children = [
            token,
            p.symbol('['),
            p.expression(),
            p.symbol(']')
        ];
        return new ASTNode('term', children);
    } else if (isIdentifier(token)) {
        return new ASTNode('term', [token]);
    }

    throw new ParserErrror(token, 'Expression term');
}


module.exports = parse;
