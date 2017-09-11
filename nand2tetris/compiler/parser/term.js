const { ASTNode } = require('./types');
const { isIntegerConst, isStringConst, isIdentifier, isSymbol } = require('../tokenizer/types');
const { isKeywordConstant, isUnary } = require('./types');
const { ParserError } = require('./errors');


function parse(tokenizer) {
    const Parser = require('./parse');

    const token = tokenizer.next();
    const second = tokenizer.next();
    tokenizer.back();
    tokenizer.back();

    if (isIntegerConst(token) || isStringConst(token) || isKeywordConstant(token)) {
        tokenizer.next();
        return new ASTNode('term', [token]);
    } else if (isIdentifier(token) && second && isSymbol(second) && second.getValue() === '[') {
        const p = new Parser(tokenizer);
        const children = [
            p.varName(),
            p.symbol('['),
            p.expression(),
            p.symbol(']')
        ];
        return new ASTNode('term', children);
    } else if (isIdentifier(token) && second && isSymbol(second) && second.getValue() === '(') {
        const p = new Parser(tokenizer);
        return new ASTNode('term', p.subroutineCall());
    } else if (isIdentifier(token) && second && isSymbol(second) && second.getValue() === '.') {
        const p = new Parser(tokenizer);
        return new ASTNode('term', p.subroutineCall());
    } else if (isIdentifier(token)) {
        tokenizer.next();
        return new ASTNode('term', [token]);
    } else if (isUnary(token)) {
        const p = new Parser(tokenizer);
        return new ASTNode('term', [p.unaryOp(), p.term()]);
    }

    throw new ParserError(token, 'Expression term');
}


module.exports = parse;
