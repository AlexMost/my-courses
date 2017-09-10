const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');

function parse(tokenizer) {
    const Parser = require('./parse');
    const p = new Parser(tokenizer);
    const children = [
        p.oneOfKeywords([KEYWORDS.static, KEYWORDS.field]),
        p.type(),
        p.varName(),
    ];

    while (p.isNexSymbol(',')) {
        children.push(p.symbol(','));
        children.push(p.varName());
    }

    children.push(p.symbol(';'));

    return new ASTNode('classVarDec', children);
}

module.exports = parse;
