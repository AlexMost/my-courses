function ParserError(token, expected) {
    this.name = 'ParserError';
    this.message = `Unexpected token '${token.getValue()}', ${expected} expected. Line ${token.getLine()}`;
    this.stack = (new Error()).stack;
}

ParserError.prototype = Object.create(Error.prototype);
ParserError.prototype.constructor = ParserError;

module.exports = { ParserError };
