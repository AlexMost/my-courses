const { stackCompare } = require('./utils');
const { assertGt } = require('../types');

function translateGt(eq) {
    assertGt(eq);
    return stackCompare(eq.getId(), 'JGT');
}

module.exports = { translateGt };
