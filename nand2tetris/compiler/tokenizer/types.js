const TOKENS = {
    KEYWORD: 'KEYWORD',
    SYMBOL: 'SYMBOL',
    IDENTIFIER: 'IDENTIFIER',
};

class Token {
    constructor(type) {
        if (!TOKENS[type]) {
            throw new Error(`Unknown type of token ${type}`);
        }
        this._type = type;
    }
    getType() {
        return this._type;
    }
}

const isKindaOf = (type) => (token) => token.getType() == type;

module.exports = {
    Token,
    isKeyword: isKindaOf(TOKENS.KEYWORD),
    isSymbol: isKindaOf(TOKENS.SYMBOL),
    isIdentifier: isKindaOf(TOKENS.IDENTIFIER),
};
