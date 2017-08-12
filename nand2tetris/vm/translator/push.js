const { SEGMENTS, SEGMENT_MAP } = require('../defs');
const EOL = require('os').EOL
const { lineInfo } = require('./utils');

function pushFromSegmentMap(push) {
	const segment = push.getSegment();
	const value = push.getValue();
	let segmentPointer;

	switch (segment) {
		case SEGMENTS.STATIC:
			const [label] = push.getFilename().split('.');
			segmentPointer = `${label}.${value}`
			break;
		case SEGMENTS.TEMP:
			segmentPointer = `R${value + 5}`;
			break;
		default:
			segmentPointer = SEGMENT_MAP[segment];
	}

	return [
		`@${value}`,
		`D=A`,

		`@${segmentPointer}`,
		'A=M',
		'A=D+A',
		'D=M',

		'@SP',
		'A=M',
		'M=D',

		'@SP',
		'M=M+1',
	]
}

function pushConst(push) {
	const value = push.getValue();
	return [
		`@${value}`,
		'D=A',

		'@SP',
		'A=M',
		'M=D',

		'@SP',
		'M=M+1'
	]
}

function translatePush(push) {
	const segment = push.getSegment();
	const value = push.getValue();
	let segmentPointer;
	
	let lines;
	switch (segment) {
		case SEGMENTS.CONST:
			lines = pushConst(push);
			break;
		default:
			lines = pushFromSegmentMap(push);
	}

	return lineInfo(lines, push).join(EOL) + EOL;
}

module.exports = { translatePush };

if (process.env.NODE_ENV === 'test') {
	module.exports._test = {
		translatePush
	}
}