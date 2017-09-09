const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const Parser = require('./parse');

function parse(tokenizer) {
    const p = new Parser(tokenizer);
    let children = [
        p.keyword(KEYWORDS.if),
        p.symbol('('),
        p.expression(),
        p.symbol(')'),
        p.symbol('{'),
        p.statements(),
        p.symbol('}'),
    ];

    if (p.isNextKeyword(KEYWORDS.else)) {
        children = children.concat([
            p.keyword(KEYWORDS.else),
            p.symbol('{'),
            p.statements(),
            p.symbol('}'),
        ]);
    }

    return new ASTNode('ifStatement', children);
}

module.exports = parse;
