const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');


function parse(tokenizer) {
    const Parser = require('./parse');
    const p = new Parser(tokenizer);
    const children = [];
    children.push(
        p.oneOfKeywords([KEYWORDS.constr, KEYWORDS.function, KEYWORDS.method])
    );

    // (void | type)
    if (p.isNextKeyword(KEYWORDS.void)) {
        children.push(p.keyword(KEYWORDS.void));
    } else {
        children.push(p.type());
    }

    children.push(p.subroutineName());
    children.push(p.symbol('('));
    children.push(p.parameterList());
    children.push(p.symbol(')'));
    children.push(p.subroutineBody());

    return new ASTNode('subroutineDec', children);
}

module.exports = parse;
