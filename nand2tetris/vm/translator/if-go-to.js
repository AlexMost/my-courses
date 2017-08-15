const { asmText } = require('./utils');
const { assertIfGoTo } = require('../types');

function translateIfGoTo(ifgoto) {
    assertIfGoTo(ifgoto);
    return asmText(`
        @SP
        M=M-1  // SP = SP - 1
        A=M
        D=M    // D = *SP

        @${ifgoto.getLabel()}  // go-to label if > 0
        D;JGT
    `);
}

module.exports = { translateIfGoTo };
