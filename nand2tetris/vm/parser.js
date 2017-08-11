const fs = require('fs');
const EOL = require('os').EOL
const { Push } = require('./types');

const COMMENT_REGEXP = /\/\/[\s\S]*$/g;
const SPACE = /\s/g;

const id = (i) => i


function parseStatement(line) {
	const [command, segment, value] = line.split(' ');
	switch (command) {
		case 'push':
			return new Push(command, segment, value);
		default:
			throw new Error(`Unknown statement ${ line }`);
	}
}

function cleanLine(line) {
	return trimComments(line);
}

function trimComments(rawLine) {
	return rawLine.replace(COMMENT_REGEXP, '').trim();
}

function readRawLines(filepath) {
	const raw = fs.readFileSync(filepath).toString();
	return raw.split(EOL).map(cleanLine).filter(id);
}

function parseVMCode(filepath) {
	const lines = readRawLines(filepath);
}

module.exports = { parseVMCode };

if (process.env.NODE_ENV === 'test') {
	module.exports._test = {
		cleanLine,
		readRawLines,
		parseStatement
	}
}