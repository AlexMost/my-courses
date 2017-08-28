const EOL = require('os').EOL;

const COMMENT_REGEXP = /\/\/[\s\S]*$/g;

const id = (i) => i;
const cleanLine = (line) => line.replace(COMMENT_REGEXP, '').trim();

function parseLines(rawContent) {
    return rawContent.split(EOL).map(cleanLine).filter(id);
}

module.exports = { parseLines };
