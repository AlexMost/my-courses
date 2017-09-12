const EOL = require('os').EOL;
const { KEYWORDS } = require('../tokenizer/types');
const { isKeyword, isSymbol } = require('../tokenizer/types');

class ASTNode {
    constructor(type, children = []) {
        this.type = type;
        this.children = children;
    }
    toXML(l = 0) {
        const level = '  '.repeat(l);
        if (this.children.length) {
            const childXML = this.children.map((ch) => ch.toXML(l + 1)).join(EOL);
            return `${level}<${this.type}>${EOL}${childXML}${EOL}${level}</${this.type}>`;
        }
        return `${level}<${this.type}>${EOL}${level}</${this.type}>`;
    }
}

const KEYWORD_CONSTANT = new Set(
    [KEYWORDS.true, KEYWORDS.false, KEYWORDS.null, KEYWORDS.this]);

function isKeywordConstant(token) {
    return isKeyword(token) && KEYWORD_CONSTANT.has(token.getValue());
}

const OPS = new Set(
    ['+', '-', '*', '/', '&', '|', '<', '>', '=']);

function isOp(token) {
    return isSymbol(token) && OPS.has(token.getValue());
}

const UNARY = new Set(['-', '~']);
function isUnary(token) {
    return UNARY.has(token.getValue());
}

module.exports = { ASTNode, isKeywordConstant, isOp, OPS, isUnary };
