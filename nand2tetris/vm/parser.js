const path = require('path');
const EOL = require('os').EOL;
const { TOKENS } = require('./defs');
const { Push, Pop, Add, Sub, Eq, Lt, Gt, Neg,
And, Or, Not, Label, IfGoTo, GoTo, Func, Return, Call
} = require('./types');

const COMMENT_REGEXP = /\/\/[\s\S]*$/g;

const id = (i) => i;
const cleanLine = (line) => line.replace(COMMENT_REGEXP, '').trim();

function parseStatement(line, filename, idx) {
    /* eslint complexity: 0 */
    const [command, segment, value] = line.split(' ');
    const meta = { id: idx, line, filename };
    switch (command) {
        case TOKENS.PUSH:
            return new Push(segment, value, meta);
        case TOKENS.POP:
            return new Pop(segment, value, meta);
        case TOKENS.ADD:
            return new Add(meta);
        case TOKENS.SUB:
            return new Sub(meta);
        case TOKENS.EQ:
            return new Eq(meta);
        case TOKENS.LT:
            return new Lt(meta);
        case TOKENS.GT:
            return new Gt(meta);
        case TOKENS.NEG:
            return new Neg(meta);
        case TOKENS.AND:
            return new And(meta);
        case TOKENS.OR:
            return new Or(meta);
        case TOKENS.NOT:
            return new Not(meta);
        case TOKENS.LABEL:
            return new Label(segment, meta);
        case TOKENS.IFGOTO:
            return new IfGoTo(segment, meta);
        case TOKENS.GOTO:
            return new GoTo(segment, meta);
        case TOKENS.FUNC:
            return new Func(segment, value, meta);
        case TOKENS.RETURN:
            return new Return(meta);
        case TOKENS.CALL:
            return new Call(segment, value, meta);
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
