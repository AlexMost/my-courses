const fs = require('fs');

const COMMENT_REGEXP = /\/\/[\s\S]*$/g;
const SPACE = /\s/g;

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

module.exports = { getLines };
