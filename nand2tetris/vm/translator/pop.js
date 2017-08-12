const { assertPop } = require('../types');
const { SEGMENTS, SEGMENT_MAP } = require('../defs');
const { lineInfo } = require('./utils');
const EOL = require('os').EOL

function popToSegmentMap(pop) {
	const segment = pop.getSegment();
	const value = pop.getValue();
	segmentName = SEGMENT_MAP[segment];

	lines = [
		`@${value}`,
		'D=A',
		`@${segmentName}`,
		'D=M+D',
		'@POPTMP',
		'M=D',

		'@SP',
		'A=M',
		'D=M',

		'@POPTMP',
		'A=M',
		'M=D',

		'@SP',
		'M=M-1'
	]
	return lines;
}

function translatePop(pop) {
	assertPop(pop);
	const segment = pop.getSegment();
	let lines;

	if (SEGMENT_MAP[segment]) {
		lines = popToSegmentMap(pop);
	} else {
		throw new Error(`Unknown segment name ${push.getLine()}`);
	}
	
	return lineInfo(lines, pop).join(EOL) + EOL;
}

module.exports = { translatePop };

if (process.env.NODE_ENV === 'test') {
	module.exports._test = {
		translatePop
	}
}
