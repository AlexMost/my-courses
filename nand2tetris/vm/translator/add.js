const EOL = require('os').EOL;

function translateAdd() {
    const lines = [
        '@SP',
        'A=M',
        'D=M',
        'A=A-1',
        'M=D+M',
        '@SP',
        'M=M-1'
    ];

    return lines.join(EOL);
}

module.exports = { translateAdd };
