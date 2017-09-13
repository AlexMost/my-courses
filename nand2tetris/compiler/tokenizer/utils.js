const EOL = require('os').EOL;
const { Token, TOKENS, isReserved } = require('./types');

const SYMBOL_REGEXP = /\{|\}|\(|\)|\[|\]|\.|,|;|\+|-|\*|\/|&|\||<|>|=|~/;
const INTEGER_CONST = /^\d+$/;
const IDENTIFIER = /^[a-zA-Z_][a-zA-Z_0-9]*$/;

function isSpace(ch) {
    return ch.match(/\s/);
}

function isSymbol(ch) {
    return ch.match(SYMBOL_REGEXP);
}

function isDigit(ch) {
    return ch.match(/\d/);
}

function isAlpha(ch) {
    return ch.match(/[a-zA-Z]/);
}

function isIntegerConstant(word) {
    return word.match(INTEGER_CONST);
}

function isIdentifier(word) {
    return word.match(IDENTIFIER);
}

function validateIntConst(ident) {
    if (ident < 0 || ident > 32767) {
        throw new Error(`Invalid identifier ${ident} (must be in range [0..32767])`);
    }
}

function parseTokens(rawLine) {
    /* eslint no-continue:0 complexity:0 */
    const tokens = [];
    let tmpToken = '';
    let line = 0;
    for (let i = 0; i < rawLine.length; i += 1) {
        if (rawLine[i] === EOL) {
            line += 1;
        }
        if (isSpace(rawLine[i])) continue;

        // simple comments
        if (rawLine[i] === '/' && rawLine[i + 1] === '/') {
            while (rawLine[i] !== EOL) {
                i += 1;
            }
            line += 1;
            continue;
        }

        // strip multiline comments
        if (rawLine[i] === '/' && rawLine[i + 1] === '*' && rawLine[i + 2] === '*') {
            i += 3;
            while (!(rawLine[i] === '*' && rawLine[i + 1] === '/')) {
                i += 1;
            }
            i += 1;
            continue;
        }

        if (isSymbol(rawLine[i])) {
            tokens.push(new Token(TOKENS.SYMBOL, rawLine[i], line));
            continue;
        }

        tmpToken = '';

        // handle strings
        if (rawLine[i] === '"') {
            i += 1;
            while (rawLine[i] !== undefined && rawLine[i] !== '"') {
                tmpToken += rawLine[i];
                i += 1;
            }
            tokens.push(new Token(TOKENS.STRING_CONST, tmpToken, line));
            continue;
        }

        while (rawLine[i] !== undefined &&
            (isDigit(rawLine[i]) || isAlpha(rawLine[i]))) {
            tmpToken += rawLine[i];
            i += 1;
        }
        if (tmpToken) i -= 1;
        if (isIntegerConstant(tmpToken)) {
            const intConst = parseInt(tmpToken, 10);
            validateIntConst(intConst);
            tokens.push(new Token(TOKENS.INTEGER_CONST, intConst, line));
            continue;
        }
        if (isIdentifier(tmpToken)) {
            tokens.push(
                new Token(isReserved(tmpToken) ? TOKENS.KEYWORD : TOKENS.IDENTIFIER, tmpToken, i));

            continue;
        }

        throw new Error(`Unexpected token '${tmpToken}'`);
    }
    return tokens;
}

module.exports = { parseTokens };
