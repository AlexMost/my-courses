const path = require('path');
const EOL = require('os').EOL;
const { OPS } = require('./defs');
const { Push, Pop, Add, Sub } = require('./types');

const COMMENT_REGEXP = /\/\/[\s\S]*$/g;

const id = (i) => i;
const cleanLine = (line) => line.replace(COMMENT_REGEXP, '').trim();

function parseStatement(line, filename) {
    const [command, segment, value] = line.split(' ');
    const meta = { line, filename };
    switch (command) {
        case OPS.PUSH:
            return new Push(segment, value, meta);
        case OPS.POP:
            return new Pop(segment, value, meta);
        case OPS.ADD:
            return new Add(meta);
        case OPS.SUB:
            return new Sub(meta);
        default:
            throw new Error(`Unknown operation '${line}'`);
    }
}

function parseVMAST(rawContent, filepath) {
    return rawContent.split(EOL).map(cleanLine).filter(id)
    .map((line) => parseStatement(line, path.basename(filepath)));
}

module.exports = { parseVMAST };

if (process.env.NODE_ENV === 'test') {
    module.exports._test = {
        cleanLine,
        parseStatement
    };
}
