const { ASTNode } = require('./types');
const { validateKeyword, validateSymbol } = require('./validate');
const { KEYWORDS } = require('../tokenizer/types');
const parseExpression = require('./expression');

function parse(tokenizer) {
	const parseStatements = require('./statements');
	
	const children = []
	const whileKeyword = tokenizer.next();
	validateKeyword(whileKeyword, KEYWORDS.while);

	const leftParen = tokenizer.next();
	validateSymbol(leftParen, '(');
	children.push(leftParen);

	children.push(parseExpression(tokenizer));

	const rightParen = tokenizer.next();
	validateSymbol(rightParen, ')');
	children.push(rightParen);

	const openCurly = tokenizer.next();
	validateSymbol(openCurly, '{');
	children.push(openCurly);

	children.push(parseStatements(tokenizer));

	const closingCurly = tokenizer.next();
	validateSymbol(closingCurly, '}');
	children.push(closingCurly);

	return new ASTNode('whileStatement', children);
}

module.exports = parse;
