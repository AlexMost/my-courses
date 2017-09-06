const { parseTokens } = require('./utils');

function Tokenizer(rawStr) {
    const tokens = parseTokens(rawStr);

    this._tokens = tokens;
    this._i = 0;

    this.next = () => {
        const ret = this._tokens[this._i];
        this._i += 1;
        return ret;
    };

    this.getTokens = () => this._tokens;

    this.hasNext = () => {
        return this._tokens[this._i + 1];
    };

    this.reset = () => {
        this._i = 0;
    };
}

module.exports = { Tokenizer };
