const { asmText } = require('./utils');
const { assertReturn } = require('../types');

function translateReturn(ret) {
    assertReturn(ret);

    return asmText(`
        // endFrame = LCL
        @LCL
        D=M
        @endFrame
        M=D

        // retAddr = *(endFrame - 5)
        @5
        D=A
        @endFrame
        D=M-D
        @retAddr
        M=D

        // *ARG = pop()
        @SP
        M=M-1
        A=M
        D=M
        @ARG
        A=M
        M=D

        // SP = ARG + 1
        @ARG
        D=M
        @SP
        M=D+1

        // THAT = *(endFrame - 1)
        @endFrame
        A=M-1
        D=M
        @THAT
        M=D

        // THIS = *(endFrame - 2)
        @2
        D=A
        @endFrame
        A=M-D
        D=M
        @THIS
        M=D

        // ARG = *(endFrame - 3)
        @3
        D=A
        @endFrame
        A=M-D
        D=M
        @ARG
        M=D

        // ARG = *(endFrame - 4)
        @4
        D=A
        @endFrame
        A=M-D
        D=M
        @LCL
        M=D

        @retAddr
        A=M
        0;JMP
    `);
}

module.exports = { translateReturn };
