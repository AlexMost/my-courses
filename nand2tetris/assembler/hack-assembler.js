const { isAInstr, getAValue } = require('./utils');
const { COMP_MAP } = require('./defs');

const WORD_LEN = 16;
const COMP_REGEX_WITH_DEST = /=([A-Z!\+\-\|\&01]*);?/;
const COMP_REGEXT_WITHOUT_DEST = /([A-Z!\+\-\|\&01]*);/

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function assembleA(line) {
	const addr = getAValue(line);
	const binAddr = dec2bin(addr);
	const zeros = WORD_LEN - binAddr.length;
	return `${'0'.repeat(zeros)}${binAddr}`;
}

function getCompSymb(line) {
	if (line.includes('=')) {
		const res = line.match(COMP_REGEX_WITH_DEST);
		return res[1];
	}
	if (line.includes(';')) {
		const res = line.match(COMP_REGEXT_WITHOUT_DEST);
		return res[1];
	}
	throw Error(`failed to parse expression '${line}'`);
}

function getComp(line) {
	const symb = getCompSymb(line);
	const bin = COMP_MAP[symb];
	if (!bin) throw Error(
		`Failed to decode computation '${symb}' in expression '${line}'`)
	return bin;
}

function assembleC(line) {
	const compBin = getComp(line);
	return `111${compBin}`;
}

module.exports = {};

if (process.env.NODE_ENV === 'test') {
	module.exports._test = {
		assembleA,
		getCompSymb,
		getComp
	}
}