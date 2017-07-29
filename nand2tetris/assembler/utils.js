function isAInstr(line) {
	return line[0] === '@';
}

function getAValue(line) {
	return line.replace('@', '');
}

module.exports = { isAInstr, getAValue };
