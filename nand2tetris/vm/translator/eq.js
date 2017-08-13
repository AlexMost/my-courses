const { asmLines } = require('./utils');
const { assertEq } = require('../types');

function translateEq(eq) {
    assertEq(eq);
    return asmLines(`
        @SP
        M=M-1

        @SP
        A=M
        D=M

        A=A-1
        D=D-M

        @EQTRUE
        D;JEQ
        @SP
        A=M
        A=A-1
        M=0
        @END
        0;JMP

        (EQTRUE)
        @SP
        A=M
        A=A-1
        M=-1

        (END)
        `
        );
}

module.exports = { translateEq };
