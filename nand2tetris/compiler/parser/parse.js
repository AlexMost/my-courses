const { validateSymbol, validateKeyword } = require('./validate');
const { isKeyword } = require('../tokenizer/types');

const parseExpression = require('./expression');

const symbol = (tokenizer) => (rawSymbol) => {
    const token = tokenizer.next();
    validateSymbol(token, rawSymbol);
    return token;
};

const keyword = (tokenizer) => (rawKeyword) => {
    const token = tokenizer.next();
    validateKeyword(token, rawKeyword);
    return token;
};


function Parser(tokenizer) {
    const parseStatements = require('./statements');
    this.symbol = symbol(tokenizer);
    this.keyword = keyword(tokenizer);
    this.expression = () => parseExpression(tokenizer);
    this.statements = () => parseStatements(tokenizer);
    this.isNextKeyword = (kw) => {
        const token = tokenizer.next();
        const isKw = token && isKeyword(token) && token.getValue() === kw;
        tokenizer.back();
        return isKw;
    };
}

module.exports = Parser;
