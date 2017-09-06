const EOL = require('os').EOL;
const { Token, TOKENS, isReserved } = require('./types');

const COMMENT_REGEXP = /\/\/[\s\S]*$/g;
const SYMBOL_REGEXP = /\{|\}|\(|\)|\[|\]|\.|,|;|\+|-|\*|\/|&|\||<|>|=|~/;
const INTEGER_CONST = /^\d+$/;
const IDENTIFIER = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
const STRING = /^".*"$/;

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

function isString(word) {
    return word.match(STRING);
}

function validateIntConst(ident) {
    if (ident < 0 || ident > 32767) {
        throw new Error(`Invalid identifier ${ident} (must be in range [0..32767])`);
    }
}

function removeMultilineComments(rawText) {

}

const id = (i) => i;
const cleanLine = (line) => line.replace(COMMENT_REGEXP, '').trim();

function parseLines(rawContent) {
    return rawContent.split(EOL).map(cleanLine).filter(id);
}

function parseTokens(rawLine) {
    /* eslint-disable no-continue */
    const tokens = [];
    let tmpToken = '';
    for (let i = 0; i < rawLine.length; i += 1) {
        if (isSpace(rawLine[i])) continue;

        // simple comments
        if (rawLine[i] === '/' && rawLine[i + 1] === '/') {
            while(rawLine[i] !== EOL) {
                i += 1;
            }
            continue;
        }

        // strip multiline comments
        if (rawLine[i] === '/' && rawLine[i + 1] === '*' && rawLine[i + 2] === '*') {
            i += 3;
            while(!(rawLine[i] === '*' && rawLine[i + 1] === '/')) {
                i += 1;
            }
            i += 1;
            continue;
        }

        if (isSymbol(rawLine[i])) {
            tokens.push(new Token(TOKENS.SYMBOL, rawLine[i]));
            continue;
        }

        tmpToken = '';

        // handle strings
        if (rawLine[i] === '"') {
            i += 1;
            while(rawLine[i] !== undefined && rawLine[i] !== '"') {
                tmpToken += rawLine[i];
                i += 1;
            }
            tokens.push(new Token(TOKENS.STRING_CONST, tmpToken));
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
            tokens.push(new Token(TOKENS.INTEGER_CONST, intConst));
            continue;
        }
        if (isIdentifier(tmpToken)) {
            if (isReserved(tmpToken)) {
                tokens.push(new Token(TOKENS.KEYWORD, tmpToken));
            } else {
                tokens.push(new Token(TOKENS.IDENTIFIER, tmpToken));
            }
            continue;
        }

        throw new Error(`Unexpected token '${tmpToken}'`);
    }
    return tokens;
}

module.exports = { parseLines, parseTokens };
