const { ASTNode } = require('./types');
const { isIdentifier, isIntegerConst, isStringConst } = require('../tokenizer/types');

function parse(tokenizer) {
	const token = tokenizer.next();
	const exprChildren = []
	if (isIdentifier(token) || isIntegerConst(token) || isStringConst(token)) {
		exprChildren.push(new ASTNode('term', [token]));
	}

	return new ASTNode('expression', exprChildren);
}

module.exports = parse;
