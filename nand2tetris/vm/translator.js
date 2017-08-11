const { SEGMENTS } = require('./defs');
const EOL = require('os').EOL

function translatePush(push) {
	const segment = push.getSegment();
	const value = push.getValue();
	let segmentPointer;

	switch (segment) {
		case SEGMENTS.CONST:
			segmentPointer = 'SP';
			break;
		default:
			throw new Error(`Unknown segment "${segment}"`);
	}

	const lines = [
		`// ${push.getLine()}`,
		`@${value}`,
		`D=A`,

		`@${segmentPointer}`,
		'A=M',
		'M=D',

		`@${segmentPointer}`,
		`M=M+1`
	]
	
	return lines.join(EOL) + EOL;
}

module.exports = {  };

if (process.env.NODE_ENV === 'test') {
	module.exports._test = {
		translatePush
	}
}