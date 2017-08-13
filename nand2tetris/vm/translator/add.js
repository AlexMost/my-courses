const EOL = require('os').EOL;
const { assertAdd } = require('../types');

function translateAdd(add) {
    assertAdd(add);

    const lines = [
        '@SP',
        'M=M-1',

        '@SP',
        'A=M',
        'D=M',
        'A=A-1',
        'M=M+D',
    ];

    return lines.join(EOL);
}

module.exports = { translateAdd };
