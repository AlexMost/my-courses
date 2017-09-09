const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const Parser = require('./parse');

function parse(tokenizer) {
    const p = new Parser(tokenizer);
    return new ASTNode('whileStatement', [
        p.keyword(KEYWORDS.while),
        p.symbol('('),
        p.expression(),
        p.symbol(')'),
        p.symbol('{'),
        p.statements(),
        p.symbol('}'),
    ]);
}

module.exports = parse;
