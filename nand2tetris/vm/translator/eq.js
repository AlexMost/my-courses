const { asmText } = require('./utils');
const { assertEq } = require('../types');

function translateEq(eq) {
    assertEq(eq);
    const id = eq.getId();
    return asmText(`
        @SP
        M=M-1

        @SP
        A=M
        D=M

        A=A-1
        D=D-M

        @EQTRUE.${id}
        D;JEQ
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
        `
        );
}

module.exports = { translateEq };
