const EOL = require('os').EOL;

function dumpTokens(tokens) {
	let result = '';
	const xmlEntries = tokens.map((t) => t.toXML());
	return `<tokens>${EOL}${xmlEntries.join(EOL)}${EOL}</tokens>${EOL}`
}

module.exports = { dumpTokens };
