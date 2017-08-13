const { asmText } = require('./utils');
const { assertNeg } = require('../types');

function translateNeg(neg) {
    assertNeg(neg);
    return asmText(`
        @SP
        A=M
        M=-M
    `);
}

module.exports = { translateNeg };
