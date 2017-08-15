const path = require('path');
const EOL = require('os').EOL;
const { OPS } = require('./defs');
const { Push, Pop, Add, Sub, Eq, Lt, Gt, Neg,
And, Or, Not, Label, IfGoTo } = require('./types');

const COMMENT_REGEXP = /\/\/[\s\S]*$/g;

const id = (i) => i;
const cleanLine = (line) => line.replace(COMMENT_REGEXP, '').trim();

function parseStatement(line, filename, idx) {
    const [command, segment, value] = line.split(' ');
    const meta = { id: idx, line, filename };
    switch (command) {
        case OPS.PUSH:
            return new Push(segment, value, meta);
        case OPS.POP:
            return new Pop(segment, value, meta);
        case OPS.ADD:
            return new Add(meta);
        case OPS.SUB:
            return new Sub(meta);
        case OPS.EQ:
            return new Eq(meta);
        case OPS.LT:
            return new Lt(meta);
        case OPS.GT:
            return new Gt(meta);
        case OPS.NEG:
            return new Neg(meta);
        case OPS.AND:
            return new And(meta);
        case OPS.OR:
            return new Or(meta);
        case OPS.NOT:
            return new Not(meta);
        case OPS.LABEL:
            return new Label(segment, meta);
        case OPS.IFGOTO:
            return new IfGoTo(segment, meta);
        default:
            throw new Error(`Unknown operation '${line}'`);
    }
}

function parseVMAST(rawContent, filepath) {
    return rawContent.split(EOL).map(cleanLine).filter(id)
    .map((line, i) => parseStatement(line, path.basename(filepath), i));
}

module.exports = { parseVMAST, cleanLine };

if (process.env.NODE_ENV === 'test') {
    module.exports._test = {
        cleanLine,
        parseStatement
    };
}
