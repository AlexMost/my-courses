function lineInfo(lines, push) {
	return [`// ${push.getLine()}`,].concat(lines);
}

module.exports = { lineInfo };
