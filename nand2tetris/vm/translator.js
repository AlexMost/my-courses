const { SEGMENTS, SEGMENT_MAP } = require('./defs');
const EOL = require('os').EOL

function translatePush(push) {
	const segment = push.getSegment();
	const value = push.getValue();
	let segmentPointer;

	if (SEGMENT_MAP[segment]) {
		segmentPointer = SEGMENT_MAP[segment];
	} else if(segment === SEGMENTS.STATIC) {
		const [label] = push.getFilename().split('.');
		segmentPointer = `${label}.${value}`;
	} else if (segment === SEGMENTS.TEMP) {
		segmentPointer = `R${value + 5}`;
	}
	
	let lines;
	if (segment === SEGMENTS.CONST) {
		lines = [
			`// ${push.getLine()}`,
			`@${value}`,
			'D=A',

			`@${segmentPointer}`,
			'A=M',
			'M=D',

			'@SP',
			'M=M+1'
		]
	} else {
		lines = [
			`// ${push.getLine()}`,
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

	return lines.join(EOL) + EOL;
}

module.exports = {  };

if (process.env.NODE_ENV === 'test') {
	module.exports._test = {
		translatePush
	}
}