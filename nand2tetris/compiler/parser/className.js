const { validateIdentifier } = require('./validate');

function parse(tokenizer) {
	const token = tokenizer.next();
	validateIdentifier(token, 'className');
	return token;
}

module.exports = parse;
