const { ASTNode } = require('./types');
const { ParserError } = require('./errors');
const { validateIdentifier } = require('./validate');

function parse(tokenizer) {
    const Parser = require('./parse');
    const children = [];

    const token = tokenizer.next();
    validateIdentifier(token);
    children.push(token);

    const p = new Parser(tokenizer);

    if (p.isNexSymbol('(')) {
        children.push(p.symbol('('));
        children.push(p.expressionList());
        children.push(p.symbol(')'));
    } else if (p.isNexSymbol('.')) {
        children.push(p.symbol('.'));
        children.push(p.subroutineName());
        children.push(p.symbol('('));
        children.push(p.expressionList());
        children.push(p.symbol(')'));
    } else {
        throw new ParserError(token, 'Expression term');
    }

    return new ASTNode('subroutineCall', children);
}

module.exports = parse;
