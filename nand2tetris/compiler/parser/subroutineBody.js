const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const Parser = require('./parse');

function parse(tokenizer) {
    const p = new Parser(tokenizer);
    const children = [];

    children.push(p.symbol('{'));
    while (p.isNextKeyword(KEYWORDS.var)) {
        children.push(p.varDec());
    }
    children.push(p.statements());
    children.push(p.symbol('}'));

    return new ASTNode('subroutineBody', children);
}

module.exports = parse;
