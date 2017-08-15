const { assertLabel } = require('../types');

function translateLabel(label) {
    assertLabel(label);
    return `(${label.getLabel()})`;
}

module.exports = { translateLabel };
