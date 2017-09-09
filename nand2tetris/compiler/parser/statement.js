const parseletStatement = require('./letStatement');
const parseifStatement = require('./ifStatement');
const parsewhileStatement = require('./whileStatement');

const { KEYWORDS } = require('../tokenizer/types');
const { ParserError } = require('./errors');

function parse(tokenizer) {
    const firstToken = tokenizer.next();
    tokenizer.back();

    switch (firstToken.getValue()) {
        case KEYWORDS.let:
            return parseletStatement(tokenizer);
        case KEYWORDS.if:
            return parseifStatement(tokenizer);
        case KEYWORDS.while:
            return parsewhileStatement(tokenizer);
        default:
            throw new ParserError(firstToken, 'let, if, while, do, return');
    }
}


module.exports = parse;
