const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const Parser = require('./parse');

function parse(tokenizer) {
    const p = new Parser(tokenizer);
    let children = [];
    children.push(p.keyword(KEYWORDS.do));
    children = children.concat(p.subroutineCall());
    children.push(p.symbol(';'));
    return new ASTNode('doStatement', children);
}

module.exports = parse;
