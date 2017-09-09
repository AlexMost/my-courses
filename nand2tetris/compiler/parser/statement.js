const { validateKeyword, validateSymbol } = require('./validate');
const parseletStatement = require('./letStatement');
const { ASTNode } = require('./types');
const { KEYWORDS } = require('../tokenizer/types');
const { ParserError } = require('./errors');

function parse(tokenizer) {
	const firstToken = tokenizer.next();
	tokenizer.back();
	let statement;
	switch(firstToken.getValue()) {
		case KEYWORDS.let:
			return parseletStatement(tokenizer);
		default:
			throw new ParserError(firstToken, 'let, if, while, do, return');
	}
}


module.exports = parse;
