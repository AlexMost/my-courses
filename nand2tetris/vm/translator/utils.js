const { cleanLine } = require('../parser');
const EOL = require('os').EOL;

const asmLines = (raw) => {
    return raw.split(EOL).map(cleanLine).filter((l) => l);
};

const asmText = (raw) => {
    return asmLines(raw).join(EOL);
};

const stackCompare = (id, jmp) => {
    return asmText(`
        @SP
        M=M-1

        @SP
        A=M
        D=M

        A=A-1
        D=M-D

        @EQTRUE.${id}
        D;${jmp}
        @SP
        A=M
        A=A-1
        M=0
        @END.${id}
        0;JMP

        (EQTRUE.${id})
        @SP
        A=M
        A=A-1
        M=-1

        (END.${id})
    `);
};

module.exports = { asmLines, asmText, stackCompare };
