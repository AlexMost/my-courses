const { ASTNode } = require('./types');
const { validateKeyword, validateSymbol } = require('./validate');
const { KEYWORDS } = require('../tokenizer/types');
const parseExpression = require('./expression');
const parseVarname = require('./varName');

function parse(tokenizer) {
	const letKeyword = tokenizer.next();
	validateKeyword(letKeyword, KEYWORDS.let);
	const varName = parseVarname(tokenizer);
	const eqOp = tokenizer.next();
	validateSymbol(eqOp, '=');
	const sourceExpr = parseExpression(tokenizer);
	const semi = tokenizer.next();
	validateSymbol(semi, ';');
	const children = [
		letKeyword, varName, eqOp, sourceExpr, semi
	]
	return new ASTNode('letStatement', children);
}

module.exports = parse;
