const { cleanLine } = require('../parser');
const EOL = require('os').EOL;

const asmLines = (raw) => {
    return raw.split(EOL).map(cleanLine).filter((l) => l);
};

const asmText = (raw) => {
    return asmLines(raw).join(EOL);
};

module.exports = { asmLines, asmText };
