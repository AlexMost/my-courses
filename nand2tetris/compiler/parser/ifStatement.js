const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const Parser = require('./parse');

function parse(tokenizer) {
    const p = new Parser(tokenizer);
    const children = [];
    children.push(p.keyword(KEYWORDS.if));
    children.push(p.symbol('('));
    children.push(p.expression());
    children.push(p.symbol(')'));
    children.push(p.symbol('{'));
    children.push(p.statements());
    children.push(p.symbol('}'));

    if (p.isNextKeyword(KEYWORDS.else)) {
        children.push(p.keyword(KEYWORDS.else));
        children.push(p.symbol('{'));
        children.push(p.statements());
        children.push(p.symbol('}'));
    } else {
        tokenizer.back();
    }
    return new ASTNode('ifStatement', children);
}

module.exports = parse;
