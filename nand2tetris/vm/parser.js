const fs = require('fs');
const EOL = require('os').EOL
const { OPS } = require('./defs');
const { Push, Pop } = require('./types');

const COMMENT_REGEXP = /\/\/[\s\S]*$/g;

const id = (i) => i
const cleanLine = (line) => line.replace(COMMENT_REGEXP, '').trim();

function parseStatement(line) {
	const [command, segment, value] = line.split(' ');
	switch (command) {
		case OPS.PUSH:
			return new Push(segment, value, { line });
		case OPS.POP:
			return new Pop(segment, value, { line });
		default:
			throw new Error(`Unknown statement ${ line }`);
	}
}

function readRawLines(filepath) {
	const raw = fs.readFileSync(filepath).toString();
	return raw.split(EOL).map(cleanLine).filter(id);
}

function parseVMCode(filepath) {
	return readRawLines(filepath).map(parseStatement);
}

module.exports = { parseVMCode };

if (process.env.NODE_ENV === 'test') {
	module.exports._test = {
		cleanLine,
		readRawLines,
		parseStatement
	}
}