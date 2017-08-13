const { asmText } = require('./utils');
const { assertAnd } = require('../types');

function translateAnd(add) {
    assertAnd(add);

    return asmText(`
        @SP
        M=M-1

        @SP
        A=M
        D=M

        A=A-1
        M=M&D
        `);
}

module.exports = { translateAnd };
