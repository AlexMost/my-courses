const { validateIdentifier } = require('./validate');

function parse(tokenizer) {
	const token = tokenizer.next();
	validateIdentifier(token, 'varName');
	return token;
}

module.exports = parse;
