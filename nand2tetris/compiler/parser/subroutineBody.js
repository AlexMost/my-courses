const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');

function parse(tokenizer) {
    const Parser = require('./parse');
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
