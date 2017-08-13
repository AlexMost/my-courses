const { stackCompare } = require('./utils');
const { assertEq } = require('../types');

function translateEq(eq) {
    assertEq(eq);
    return stackCompare(eq.getId(), 'JEQ');
}

module.exports = { translateEq };
