const { isIdentifier, isSymbol, isKeyword } = require('../tokenizer/types');
const { ParserError } = require('./errors');

function validateIdentifier(token) {
    if (!isIdentifier(token)) {
        throw new ParserError(token, `identifier`);
    }
}

function validateSymbol(token, expected) {
    if (!isSymbol(token)) {
        throw new ParserError(token, `symbol '${expected}'`);
    }
    if (token.getValue() !== expected) {
        throw new ParserError(token, `symbol '${expected}'`);
    }
}

function validateKeyword(token, expected) {
    if (!isKeyword(token)) {
        throw new ParserError(token, `keyword '${expected}'`);
    }
}

module.exports = { validateIdentifier, validateSymbol, validateKeyword };
