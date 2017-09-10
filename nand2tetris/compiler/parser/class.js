const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const Parser = require('./parse');

function parse(tokenizer) {
    const p = new Parser(tokenizer);
    const children = [
        p.keyword(KEYWORDS.class),
        p.className(),
        p.symbol('{'),
        // classVarDec
        // subRoutineDec
        p.symbol('}'),
    ];
    return new ASTNode('class', children);
}

module.exports = parse;
