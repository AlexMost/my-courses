SEGMENTS = {
	CONST:'constant',
	THIS:'this',
	THAT:'that',
	LOCAL:'local',
	STATIC:'static',
	POINTER:'pointer',
	ARGUMENT:'argument',
	TEMP:'temp',
}

SEGMENT_MAP = {}
SEGMENT_MAP[SEGMENTS.LOCAL] = 'LCL';
SEGMENT_MAP[SEGMENTS.ARGUMENT] = 'ARG';
SEGMENT_MAP[SEGMENTS.THIS] = 'THIS';
SEGMENT_MAP[SEGMENTS.THAT] = 'THAT';

OPS = {
	PUSH: 'push',
	POP: 'pop'
}

module.exports = { SEGMENTS, OPS, SEGMENT_MAP }
