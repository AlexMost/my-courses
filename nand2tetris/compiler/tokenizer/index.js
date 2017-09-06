const { parseLines, parseTokens } = require('./utils');

function Tokenizer(rawStr) {
    const tokens = parseTokens(rawStr)

    this._tokens = tokens;
    this._i = 0;

    this.next = () => {
    	const ret = this._tokens[i];
    	this._i += 1;
    	return ret;
    };

    this.hasNext = () => {
    	return this._tokens[i + 1];
    };

    this.reset = () => {
    	this._i = 0;
    };
}

module.exports = { Tokenizer };
