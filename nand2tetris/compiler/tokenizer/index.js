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

    this.back = () => {
        this._i -= 1;
    };

    this.getTokens = () => this._tokens;

    this.hasNext = () => {
        return Boolean(this._tokens[this._i + 1]);
    };

    this.getNext = () => {
        return this._tokens[this._i + 1];
    };

    this.reset = () => {
        this._i = 0;
    };
}

module.exports = { Tokenizer };
