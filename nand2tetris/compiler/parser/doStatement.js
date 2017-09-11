const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const Parser = require('./parse');

function parse(tokenizer) {
    const p = new Parser(tokenizer);
    return new ASTNode('doStatement', [
        p.keyword(KEYWORDS.do),
        p.subroutineCall(),
        p.symbol(';'),
    ]);
}

module.exports = parse;
