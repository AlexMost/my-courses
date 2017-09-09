const { validateSymbol, validateKeyword } = require('./validate');

function symbol(rawSymbol, tokenizer) {
    const token = tokenizer.next();
    validateSymbol(token, rawSymbol);
    return token;
}

function keyword(rawKeyword, tokenizer) {
    const token = tokenizer.next();
    validateKeyword(token, rawKeyword);
    return token;
}

module.exports = { symbol, keyword };
