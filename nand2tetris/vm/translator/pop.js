const { assertPop } = require('../types');
const { SEGMENTS, SEGMENT_MAP } = require('../defs');
const EOL = require('os').EOL;

function popStatic(pop) {
    const value = pop.getValue();
    const [label] = pop.getFilename().split('.');
    const segmentPointer = `${label}.${value}`;
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

function popTemp(pop) {
    const segmentPointer = `R${pop.getValue() + 5}`;
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

function popPointer(pop) {
    const value = pop.getValue();

    let targetSegment;
    switch (value) {
        case 0:
            targetSegment = SEGMENT_MAP[SEGMENTS.THIS];
            break;
        case 1:
            targetSegment = SEGMENT_MAP[SEGMENTS.THAT];
            break;
        default:
            throw new Error(
                `Unexpected value for pointer pop "${pop.getLIne()}"`);
    }

    return [
        '@SP',
        'A=M',
        'D=M',

        `@${targetSegment}`,
        'A=M',
        'M=D',

        '@SP',
        'M=M-1'
    ];
}


function popToSegmentMap(pop) {
    const segment = pop.getSegment();
    const value = pop.getValue();
    const segmentPointer = SEGMENT_MAP[segment];

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
    ];
}

function translatePop(pop) {
    assertPop(pop);
    const segment = pop.getSegment();
    let lines;

    if (SEGMENT_MAP[segment]) {
        lines = popToSegmentMap(pop);
    } else if (SEGMENTS.STATIC === segment) {
        lines = popStatic(pop);
    } else if (SEGMENTS.TEMP === segment) {
        lines = popTemp(pop);
    } else if (SEGMENTS.POINTER === segment) {
        lines = popPointer(pop);
    } else {
        throw new Error(`Unknown segment name ${pop.getLine()}`);
    }

    return lines.join(EOL);
}

module.exports = { translatePop };

if (process.env.NODE_ENV === 'test') {
    module.exports._test = {
        translatePop
    };
}
