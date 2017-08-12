const { assertPop } = require('../types');
const { SEGMENTS, SEGMENT_MAP } = require('../defs');
const { lineInfo } = require('./utils');
const EOL = require('os').EOL

function popStatic(pop) {
	const segment = pop.getSegment();
	const value = pop.getValue();
	const [label] = pop.getFilename().split('.');
	segmentPointer = `${label}.${value}`
	return [
		'@SP',
		'A=M',
		'D=M',

		`@${segmentPointer}`,
		`M=D`,

		'@SP',
		'M=M-1'
	];
}

function popToSegmentMap(pop) {
	const segment = pop.getSegment();
	const value = pop.getValue();
	segmentPointer = SEGMENT_MAP[segment];

	return [
		`@${value}`,
		'D=A',
		`@${segmentPointer}`,
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
}

function translatePop(pop) {
	assertPop(pop);
	const segment = pop.getSegment();
	let lines;

	if (SEGMENT_MAP[segment]) {
		lines = popToSegmentMap(pop);
	} else if (SEGMENTS.STATIC === segment) {
		lines = popStatic(pop);
	} 
	else {
		throw new Error(`Unknown segment name ${pop.getLine()}`);
	}
	
	return lineInfo(lines, pop).join(EOL) + EOL;
}

module.exports = { translatePop };

if (process.env.NODE_ENV === 'test') {
	module.exports._test = {
		translatePop
	}
}
