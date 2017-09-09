const { ASTNode } = require('./types');
const { validateKeyword, validateSymbol } = require('./validate');
const { KEYWORDS } = require('../tokenizer/types');
const parseExpression = require('./expression');
const parseVarname = require('./varName');

function parse(tokenizer) {
	const children = []
	const letKeyword = tokenizer.next();
	validateKeyword(letKeyword, KEYWORDS.let);
	children.push(letKeyword);

	const varName = parseVarname(tokenizer);
	children.push(varName);

	let eqOp = tokenizer.next();

	// computed property
	if (eqOp.getValue() === '[') {
		children.push(eqOp);

		const compExpr = parseExpression(tokenizer);
		children.push(compExpr);

		const closingGap = tokenizer.next();
		validateSymbol(closingGap, ']');
		children.push(closingGap);

		eqOp = tokenizer.next();
	}

	validateSymbol(eqOp, '=');
	children.push(eqOp);

	const sourceExpr = parseExpression(tokenizer);
	children.push(sourceExpr);

	const semi = tokenizer.next();
	validateSymbol(semi, ';');
	children.push(semi);
	return new ASTNode('letStatement', children);
}

module.exports = parse;
