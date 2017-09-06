const TOKENS = {
    KEYWORD: 'keyword',
    SYMBOL: 'symbol',
    IDENTIFIER: 'identifier',
    INTEGER_CONST: 'integerConstant',
    STRING_CONST: 'stringConstant',
};

const validTokens = new Set(Object.keys(TOKENS).map((k) => TOKENS[k]));

const KEYWORDS = {
    class: 'class',
    constructor: 'constructor',
    function: 'function',
    method: 'method',
    field: 'field',
    static: 'static',
    var: 'var',
    int: 'int',
    char: 'char',
    boolean: 'boolean',
    void: 'void',
    true: 'true',
    false: 'false',
    null: 'null',
    this: 'this',
    let: 'let',
    do: 'do',
    if: 'if',
    else: 'else',
    while: 'while',
    return: 'return',
};

class Token {
    constructor(type, value) {
        if (!validTokens.has(type)) {
            throw new Error(`Unknown type of token ${type}`);
        }
        if (value === undefined) {
            throw new Error(`Token should have value`);
        }
        this._type = type;
        this._value = value;
    }
    toXML() {
        return `<${this.getType()}> ${this.getValue()} </${this.getType()}>`;
    }
    getType() {
        return this._type;
    }
    getValue() {
        return this._value;
    }
}

const isKindaOf = (type) => (token) => token.getType() === type;
const isReserved = (word) => !!KEYWORDS[word];

module.exports = {
    TOKENS,
    KEYWORDS,
    Token,
    isReserved,
    isKeyword: isKindaOf(TOKENS.KEYWORD),
    isSymbol: isKindaOf(TOKENS.SYMBOL),
    isIdentifier: isKindaOf(TOKENS.IDENTIFIER),
};
