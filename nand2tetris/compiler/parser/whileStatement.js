const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const parseExpression = require('./expression');
const p = require('./parse');

function parse(tokenizer) {
    const parseStatements = require('./statements');

    return new ASTNode('whileStatement', [
        p.keyword(KEYWORDS.while, tokenizer),
        p.symbol('(', tokenizer),
        parseExpression(tokenizer),
        p.symbol(')', tokenizer),
        p.symbol('{', tokenizer),
        parseStatements(tokenizer),
        p.symbol('}', tokenizer),
    ]);
}

module.exports = parse;
