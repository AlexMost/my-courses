const fs = require('fs');

const COMMENT_REGEXP = /\/\/[\s\S]*$/g;
const SPACE = /\s/g;
const DEFAULT_SYMBOLS = {
	SP: 0,
	LCL: 1,
	ARG: 2,
	THIS: 3,
	THAT: 4,
	SCREEN: 16384,
	KBD: 24576
}

function getRawLines(filePath) {
	return fs.readFileSync(filePath).toString().split('\n');
}

function trimComments(rawLine) {
	return rawLine.replace(COMMENT_REGEXP, '').replace(SPACE, '');
}

function stripSpacesAndComments(rawLines) {
	return rawLines.map((line) => trimComments(line)).filter((line) => line);
}

function getLines(filePath) {
	return stripSpacesAndComments(getRawLines(filePath));
}

function getDefaultSymbols() {
	const symbols = Object.assign({}, DEFAULT_SYMBOLS);
	for (let i = 0; i <= 15; i++) {
		symbols[`R${i}`] = i;
	}
	return symbols;
}


function AsmState() {
	const symbolTable = getDefaultSymbols();
	let currentVarAddr = 16;
	// public methods
	this.getSymbol = (symbol) => symbolTable[symbol]
	this.setLabel = (label, addr) => symbolTable[label] = addr
	this.setVar = (varname) => {
		if (!this.getSymbol(varname)) {
			this.setLabel(varname, currentVarAddr);
			currentVarAddr += 1;
		}
	}
	this.print = () => {
		Object.keys(symbolTable).forEach((key) => {
			console.log(`${key} - ${this.getSymbol(key)}`);
		});
	}
}

function isLabel(line) {
	return line[0] === '(';
}

function isACommand(line) {
	return line[0] === '@';
}

function getAValue(line) {
	return line.replace('@', '');
}
function isNumeric(str){
    return /^\d+$/.test(str);
}

function isAddr(line) {
	return isNumeric(line.replace('@', ''));
}

function getLabel(line) {
	return line.replace('(', '').replace(')', '');
}

function discoverLabels(lines, asmState) {
	const resultLines = [];
	let addr = 0;

	for (let i = addr; i < lines.length; i++) {
		const line = lines[i];
		if (!isLabel(line)) {
			resultLines.push(line);
			addr += 1;
		} else {
			asmState.setLabel(getLabel(line), addr);	
		}
	}
	return resultLines;
}

function discoverVariables(lines, asmState) {
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (!isACommand(line)) continue;
		if (isAddr(line)) continue;
		const varName = getAValue(line);
		if (asmState.getSymbol(varName)) continue;
		asmState.setVar(varName);
	}
}

function resolveAddresses(lines, asmState) {
	return lines.map((line) => {
		if(isACommand(line) && !isAddr(line)) {
			const symbol = getAValue(line);
			const addr = asmState.getSymbol(symbol);
			return `@${addr}`
		}
		return line;
	});
}

function parse(filepath) {
	let lines = getLines(filepath);
	const state = new AsmState();
	lines = discoverLabels(lines, state);
	discoverVariables(lines, state);
	return resolveAddresses(lines, state);
}


module.exports = { parse };

if (process.env.NODE_ENV === 'test') {
	module.exports._test = {
		AsmState,
		discoverLabels,
		discoverVariables,
		resolveAddresses,
		getLines,
	}
}
