const { SEGMENTS, SEGMENT_MAP } = require('../defs');
const EOL = require('os').EOL;
const { assertPush } = require('../types');

function pushFromSegmentMap(push) {
    const segment = push.getSegment();
    const value = push.getValue();
    const segmentPointer = SEGMENT_MAP[segment];

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

function pushTemp(push) {
    const value = push.getValue() + 5;
    return [
        `@R${value}`,
        'D=M',

        '@SP',
        'A=M',
        'M=D',

        '@SP',
        'M=M+1',
    ];
}

function pushStatic(push) {
    const value = push.getValue();
    const [label] = push.getFilename().split('.');
    return [
        `@${label}.${value}`,
        'D=M',

        '@SP',
        'A=M',
        'M=D',

        '@SP',
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
        case SEGMENTS.TEMP:
            lines = pushTemp(push);
            break;
        case SEGMENTS.STATIC:
            lines = pushStatic(push);
            break;
        default:
            if (SEGMENT_MAP[segment]) {
                lines = pushFromSegmentMap(push);
            } else {
                throw new Error(`Unknown segment name ${push.getLine()}`);
            }

    }

    return lines.join(EOL);
}

module.exports = { translatePush };

if (process.env.NODE_ENV === 'test') {
    module.exports._test = {
        translatePush
    };
}
