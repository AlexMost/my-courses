const { asmText } = require('./utils');
const { assertGoTo } = require('../types');

function translateGoTo(goTo) {
    assertGoTo(goTo);
    return asmText(`
        @${goTo.getLabel()}
        0;JMP
    `);
}

module.exports = { translateGoTo };
