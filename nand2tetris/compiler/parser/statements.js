const { ASTNode } = require('./types');
const { validateKeyword, validateSymbol } = require('./validate');
const { KEYWORDS } = require('../tokenizer/types');
const parseStatement = require('./statement');

const statementKeywords = new Set(
	[KEYWORDS.let, KEYWORDS.if, KEYWORDS.while, 
	KEYWORDS.while, KEYWORDS.do, KEYWORDS.return]);

function parse(tokenizer) {
	const children = []
	let maybeStatementToken = tokenizer.next();
	tokenizer.back();
	while(maybeStatementToken && statementKeywords.has(maybeStatementToken.getValue())) {
		children.push(parseStatement(tokenizer));
		maybeStatementToken = tokenizer.next();
		tokenizer.back();
	}
	
	return new ASTNode('statements', children);
}

module.exports = parse;
