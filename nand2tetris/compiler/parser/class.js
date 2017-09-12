const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const Parser = require('./parse');

function parse(tokenizer) {
    const p = new Parser(tokenizer);

    const children = [
        p.keyword(KEYWORDS.class),
        p.className(),
        p.symbol('{')
    ];

    // classVarDec*
    while (p.isNextKeyword(KEYWORDS.static) || p.isNextKeyword(KEYWORDS.field)) {
        children.push(p.classVarDec());
    }

    // subRoutineDec*
    while (p.isNextKeyword(KEYWORDS.constr) ||
          p.isNextKeyword(KEYWORDS.function) ||
          p.isNextKeyword(KEYWORDS.method)) {
        children.push(p.subroutineDec());
    }

    children.push(p.symbol('}'));
    return new ASTNode('class', children);
}

module.exports = parse;
