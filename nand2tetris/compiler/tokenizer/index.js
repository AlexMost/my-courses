const { parseRawTokens } = require('./utils');

function Tokenizer(rawStr) {
    const rawTokens = parseRawTokens(rawStr);
}

module.exports = { Tokenizer };
