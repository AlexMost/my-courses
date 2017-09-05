const TOKENS = {
    KEYWORD: 'KEYWORD',
    SYMBOL: 'SYMBOL',
    IDENTIFIER: 'IDENTIFIER',
    INTEGER_CONST: 'INTEGER_CONST',
    STRING_CONST: 'STRING_CONST',
};

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
        if (!TOKENS[type]) {
            throw new Error(`Unknown type of token ${type}`);
        }
        if (value === undefined) {
            throw new Error(`Token should have value`);
        }
        this._type = type;
        this._value = value;
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
