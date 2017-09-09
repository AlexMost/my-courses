const { ASTNode } = require('./types');
const { validateKeyword, validateSymbol } = require('./validate');
const { KEYWORDS, isKeyword } = require('../tokenizer/types');
const parseExpression = require('./expression');

function parse(tokenizer) {
	const parseStatements = require('./statements');
	
	const children = []

	const ifKeyword = tokenizer.next();
	validateKeyword(ifKeyword, KEYWORDS.if);
	children.push(ifKeyword);

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

	let maybeElse = tokenizer.next();

	if (maybeElse && isKeyword(maybeElse) && maybeElse.getValue() === 'else') {
		children.push(maybeElse);

		const openElseCurly = tokenizer.next();
		validateSymbol(openElseCurly, '{');
		children.push(openElseCurly);

		children.push(parseStatements(tokenizer));

		const closingElseCurly = tokenizer.next();
		validateSymbol(closingElseCurly, '}');
		children.push(closingElseCurly);
	} else {
		tokenizer.back();
	}
	return new ASTNode('ifStatement', children);
}

module.exports = parse;
