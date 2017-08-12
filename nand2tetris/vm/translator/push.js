const { SEGMENTS, SEGMENT_MAP } = require('../defs');
const EOL = require('os').EOL;
const { lineInfo } = require('./utils');
const { assertPush } = require('../types');

function pushFromSegmentMap(push) {
    const segment = push.getSegment(); const value = push.getValue();
    const [label] = push.getFilename().split('.');

    let segmentPointer;
    switch (segment) {
        case SEGMENTS.STATIC:
            segmentPointer = `${label}.${value}`;
            break;
        case SEGMENTS.TEMP:
            segmentPointer = `R${value + 5}`;
            break;
        default:
            if (SEGMENT_MAP[segment]) {
                segmentPointer = SEGMENT_MAP[segment];
            } else {
                throw new Error(`Unknown segment name ${push.getLine()}`);
            }

    }

    return [
        `@${value}`,
        `D=A`,

        `@${segmentPointer}`,   // D = *SEGMENT[value]
        'A=M',
        'A=D+A',
        'D=M',

        '@SP',    // *SP=D
        'A=M',
        'M=D',

        '@SP',     // SP++
        'M=M+1',
    ];
}

function pushConst(push) {
    const value = push.getValue();
    return [
        `@${value}`,  // D = value
        'D=A',

        '@SP',
        'A=M',      // *SP = D
        'M=D',

        '@SP',      // SP++
        'M=M+1'
    ];
}

function pushPointer(push) {
    const value = push.getValue();
    let readSegment;

    switch (value) {
        case 0:
            readSegment = SEGMENT_MAP[SEGMENTS.THIS];
            break;
        case 1:
            readSegment = SEGMENT_MAP[SEGMENTS.THAT];
            break;
        default:
            throw new Error(
                `Unexpected value for pointer push "${push.getLIne()}"`);
    }

    return [
        `@${readSegment}`, // D = *THIS/THAT
        'A=M',
        'D=M',

        '@SP',
        'A=M',            // *SP = D
        'M=D',

        '@SP',            // SP++
        'M=M+1'
    ];
}

function translatePush(push) {
    assertPush(push);
    const segment = push.getSegment();
    let lines;
    switch (segment) {
        case SEGMENTS.CONST:
            lines = pushConst(push);
            break;
        case SEGMENTS.POINTER:
            lines = pushPointer(push);
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
    };
}
