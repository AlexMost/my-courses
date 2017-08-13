const { asmText } = require('./utils');
const { assertNot } = require('../types');

function translateNot(not) {
    assertNot(not);
    return asmText(`
        @SP
        A=M
        A=A-1
        M=!M
    `);
}

module.exports = { translateNot };
