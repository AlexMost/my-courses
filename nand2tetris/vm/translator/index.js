const EOL = require('os').EOL;
const { Pop, Push } = require('../types');
const { OPS } = require('../defs');

const { translatePop } = require('./pop');
const { translatePush } = require('./push');
const { translateAdd } = require('./add');
const { translateSub } = require('./sub');

function translateLine(rawLine, filename) {
    const [command, segment, value] = rawLine.split(' ');
    const meta = { line: rawLine, filename };
    switch (command) {
        case OPS.PUSH:
            return translatePush(new Push(segment, value, meta));
        case OPS.POP:
            return translatePop(new Pop(segment, value, meta));
        case OPS.ADD:
            return translateAdd();
        case OPS.SUB:
            return translateSub();
        default:
            throw new Error(`Unknown command '${command}' in ${rawLine}`);
    }
}

function appendLineInfo(strLine, asm) {
    const lineInfo = `// ${strLine}${EOL}`;
    return lineInfo + asm;
}

function translate(rawContent, filename) {
    const strLines = rawContent.split(EOL).map((rawStr) => {
        const asm = translateLine(rawStr, filename);
        return appendLineInfo(rawStr, asm);
    });
    return strLines.join(EOL);
}

module.exports = { translate };
