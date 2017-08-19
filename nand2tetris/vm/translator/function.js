const { asmText } = require('./utils');
const { assertFunc } = require('../types');

function translateFunc(func) {
    assertFunc(func);
    const id = func.getId();
    const nArgs = func.getNArgs();
    if (nArgs > 0) {
        return asmText(`
        (${func.getLabel()})

        @${nArgs}
        D=A
        @i    // i = nArgs
        M=D

        (LOOP.${id})
            @SP
            A=M   // SP = 0
            M=0

            @SP   // SP = SP + 1
            M=M+1

            @i
            M=M-1    // i = i - 1
            D=M

            @LOOP.${id}
            D;JGT

        `);
    }

    return asmText(`(${func.getLabel()})`);
}

module.exports = { translateFunc };
