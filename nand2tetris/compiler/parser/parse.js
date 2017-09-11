const { validateSymbol, validateKeyword } = require('./validate');
const { isKeyword, isSymbol, isIdentifier } = require('../tokenizer/types');
const { ParseError } = require('./errors');

const parseTerm = require('./term');
const parseOp = require('./op');
const parseExpression = require('./expression');
const parseClassName = require('./className');
const parseVarName = require('./varName');
const parseType = require('./type');
const parseVarDec = require('./varDec');
const parseclassVarDec = require('./classVarDec');
const parsesubroutineBody = require('./subroutineBody');
const parsesubroutineName = require('./subroutineName');
const parseparameterList = require('./parameterList');
const parsesubroutineDec = require('./subroutineDec');
const parseUnaryOp = require('./unaryOp');


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

const oneOfKeywords = (tokenizer) => (keywords) => {
    const token = tokenizer.next();
    if (!isKeyword(token)) {
        throw new ParseError(token, `one of ${keywords}`);
    }
    const value = token.getValue();
    if (keywords.includes(value)) {
        return token;
    }
    throw new ParseError(token, `one of ${keywords}`);
};

function Parser(tokenizer) {
    const parseStatements = require('./statements');
    this.symbol = symbol(tokenizer);
    this.keyword = keyword(tokenizer);
    this.oneOfKeywords = oneOfKeywords(tokenizer);
    this.expression = () => parseExpression(tokenizer);
    this.statements = () => parseStatements(tokenizer);
    this.className = () => parseClassName(tokenizer);
    this.varName = () => parseVarName(tokenizer);
    this.type = () => parseType(tokenizer);
    this.varDec = () => parseVarDec(tokenizer);
    this.classVarDec = () => parseclassVarDec(tokenizer);
    this.subroutineBody = () => parsesubroutineBody(tokenizer);
    this.subroutineName = () => parsesubroutineName(tokenizer);
    this.subroutineDec = () => parsesubroutineDec(tokenizer);
    this.parameterList = () => parseparameterList(tokenizer);
    this.term = () => parseTerm(tokenizer);
    this.op = () => parseOp(tokenizer);
    this.unaryOp = () => parseUnaryOp(tokenizer);

    this.isNextKeyword = (kw) => {
        const token = tokenizer.next();
        const isKw = token && isKeyword(token) && token.getValue() === kw;
        tokenizer.back();
        return isKw;
    };

    this.isNextIdentifier = () => {
        const token = tokenizer.next();
        const isId = isIdentifier(token);
        tokenizer.back();
        return isId;
    };

    this.isNexSymbol = (symb) => {
        const token = tokenizer.next();
        const isSym = token && isSymbol(token) && token.getValue() === symb;
        tokenizer.back();
        return isSym;
    };

    this.hasNext = () => {
        return tokenizer.hasNext();
    };
}

module.exports = Parser;
