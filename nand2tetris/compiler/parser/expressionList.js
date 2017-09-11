const { ASTNode, isUnary } = require('./types');
const { isSymbol } = require('../tokenizer/types');


function parse(tokenizer) {
    const Parser = require('./parse');
    const next = tokenizer.next();
    tokenizer.back();
    const p = new Parser(tokenizer);
    const children = [];

    if (!isSymbol(next) || isUnary(next)) {
        children.push(p.expression());

        while (p.isNexSymbol(',')) {
            children.push(p.symbol(','));
            children.push(p.expression());
        }
    }

    return new ASTNode('expressionList', children);
}

module.exports = parse;
