const EOL = require('os').EOL;
const { KEYWORDS } = require('../tokenizer/types');
const { isKeyword, isSymbol } = require('../tokenizer/types');

class ASTNode {
    constructor(type, children = []) {
        this.type = type;
        this.children = children;
    }
    toXML() {
        if (this.children.length) {
            const childXML = this.children.map((ch) => ch.toXML()).join(EOL);
            return `<${this.type}>${EOL}${childXML}${EOL}</${this.type}>`;
        }
        return `<${this.type}>${EOL}</${this.type}>`;
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

module.exports = { ASTNode, isKeywordConstant, isOp, OPS };
