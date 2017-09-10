const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const Parser = require('./parse');

function parse(tokenizer) {
    const p = new Parser(tokenizer);
    const children = [];
    children.push(
        p.oneOfKeywords([KEYWORDS.constructor, KEYWORDS.function, KEYWORDS.method])
    );

    // (void | type)
    if (p.isNextKeyword(KEYWORDS.void)) {
        children.push(p.keyword(KEYWORDS.void));
    } else {
        children.push(p.type());
    }

    children.push(p.subroutineName());
    children.push(p.symbol('('));

    return new ASTNode('subroutineDec', children);
}

module.exports = parse;
