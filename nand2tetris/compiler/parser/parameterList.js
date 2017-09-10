const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');

function parse(tokenizer) {
    const Parser = require('./parse');
    const p = new Parser(tokenizer);
    const children = [];

    if (p.isNextKeyword(KEYWORDS.int) ||
        p.isNextKeyword(KEYWORDS.char) ||
        p.isNextKeyword(KEYWORDS.boolean) ||
        p.isNextIdentifier()) {
        children.push(p.type());
        children.push(p.varName());
    }

    while (p.isNexSymbol(',')) {
        children.push(p.symbol(','));
        children.push(p.type());
        children.push(p.varName());
    }

    return new ASTNode('parameterList', children);
}

module.exports = parse;
