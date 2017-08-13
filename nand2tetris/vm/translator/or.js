const { asmText } = require('./utils');
const { assertOr } = require('../types');

function translateOr(add) {
    assertOr(add);

    return asmText(`
        @SP
        M=M-1

        @SP
        A=M
        D=M

        A=A-1
        M=M|D
        `);
}

module.exports = { translateOr };
