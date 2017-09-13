const { ASTNode, isOp } = require('./types');

function parse(tokenizer) {
    const Parser = require('./parse');
    const p = new Parser(tokenizer);
    const children = [];
    children.push(p.term());
    let maybeOp = tokenizer.next();
    while (maybeOp && isOp(maybeOp)) {
        children.push(maybeOp);
        children.push(p.term());
        maybeOp = tokenizer.next();
    }
    tokenizer.back();
    return new ASTNode('expression', children);
}

module.exports = parse;
