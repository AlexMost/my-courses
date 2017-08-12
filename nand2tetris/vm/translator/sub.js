const EOL = require('os').EOL;

function translateSub() {
    const lines = [
        '@SP',
        'A=M',
        'D=M',
        'A=A-1',
        'M=M-D',
        '@SP',
        'M=M-1'
    ];

    return lines.join(EOL);
}

module.exports = { translateSub };
