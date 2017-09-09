const { validateKeyword, validateSymbol } = require('./validate');
const parseType = require('./type');
const parseVarName = require('./varName');
const { ASTNode } = require('./types');

class VarDec {
	constructor(ast) {
		this.ast = ast;
	}
}

function parse(tokenizer) {
	const children = [];
	const varDeclaration = tokenizer.next();
	validateKeyword(varDeclaration, 'var');
	children.push(varDeclaration);

	const type = parseType(tokenizer);
	children.push(type);
	const varName = parseVarName(tokenizer);
	children.push(varName);

	let next = tokenizer.next();

	while(next.getValue() !== ';') {
		validateSymbol(next, ',')
		children.push(next);
		children.push(parseVarName(tokenizer));
		next = tokenizer.next();
	}

	const semi = next;
	children.push(semi);

	return new ASTNode('varDec', children);
}

module.exports = parse;
