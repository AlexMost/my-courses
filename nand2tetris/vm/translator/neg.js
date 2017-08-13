const { asmText } = require('./utils');
const { assertNeg } = require('../types');

function translateNeg(neg) {
    assertNeg(neg);
    return asmText(`
        @SP
        A=M
        A=A-1
        M=-M
    `);
}

module.exports = { translateNeg };
