const SEGMENTS = {
    CONST: 'constant',
    THIS: 'this',
    THAT: 'that',
    LOCAL: 'local',
    STATIC: 'static',
    POINTER: 'pointer',
    ARGUMENT: 'argument',
    TEMP: 'temp',
};

const SEGMENT_MAP = {};
SEGMENT_MAP[SEGMENTS.LOCAL] = 'LCL';
SEGMENT_MAP[SEGMENTS.ARGUMENT] = 'ARG';
SEGMENT_MAP[SEGMENTS.THIS] = 'THIS';
SEGMENT_MAP[SEGMENTS.THAT] = 'THAT';

const TOKENS = {
    PUSH: 'push',
    POP: 'pop',
    ADD: 'add',
    SUB: 'sub',
    EQ: 'eq',
    LT: 'lt',
    GT: 'gt',
    NEG: 'neg',
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    LABEL: 'label',
    IFGOTO: 'if-goto',
    GOTO: 'goto',
    FUNC: 'function',
    RETURN: 'return',
    CALL: 'call',
};

module.exports = { SEGMENTS, TOKENS, SEGMENT_MAP };
