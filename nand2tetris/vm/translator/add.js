const EOL = require('os').EOL;

function translateAdd() {
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
