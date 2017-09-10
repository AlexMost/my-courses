const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const Parser = require('./parse');

function parse(tokenizer) {
    const p = new Parser(tokenizer);
    const children = [p.keyword(KEYWORDS.return)];
    if (!p.isNexSymbol(';')) {
        children.push(p.expression());
    }
    children.push(p.symbol(';'));
    return new ASTNode('returnStatement', children);
}

module.exports = parse;
