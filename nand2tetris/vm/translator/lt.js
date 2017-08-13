const { stackCompare } = require('./utils');
const { assertLt } = require('../types');

function translateLt(eq) {
    assertLt(eq);
    return stackCompare(eq.getId(), 'JLT');
}

module.exports = { translateLt };
