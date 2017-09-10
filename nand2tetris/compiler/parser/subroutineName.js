const { validateIdentifier } = require('./validate');

function parse(tokenizer) {
    const token = tokenizer.next();
    validateIdentifier(token, 'subroutineName');
    return token;
}

module.exports = parse;
