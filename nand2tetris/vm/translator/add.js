const EOL = require('os').EOL;

function translateAdd() {
    const lines = [
        '@SP',
        'A=M',

        'A=A-1',
        'D=M',
        'A=A-1',
        'M=M+D',

        '@SP',
        'M=M-1'
    ];

    return lines.join(EOL);
}

module.exports = { translateAdd };
