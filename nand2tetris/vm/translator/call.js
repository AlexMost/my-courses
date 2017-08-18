const { asmText } = require('./utils');
const { assertCall } = require('../types');

function translateCall(call) {
    assertCall(call);

    const id = call.getId();
    const fnLabel = call.getLabel();
    const nArgs = call.getNArgs();

    return asmText(`
        // push RETURN_ADDR
        @RETURN_ADDR.${id}
        D=A
        @SP
        A=M
        M=D
        @SP
        M=M+1

        // push LCL
        @LCL
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1

        // push ARG
        @ARG
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1

        // push THIS
        @THIS
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1

        // push THAT
        @THAT
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1

        // ARG = SP - 5 - nArgs
        @5
        D=A
        @SP
        D=M-D
        @ARG
        M=D
        @${nArgs}
        D=A
        @ARG
        M=M-D

        // LCL = SP
        @SP
        D=M
        @LCL
        M=D

        @${fnLabel}
        0;JMP

        (RETURN_ADDR.${id})
    `);
}

module.exports = { translateCall };
