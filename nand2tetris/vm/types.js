const { SEGMENTS } = require('./defs');

const mustExist = (name, arg) => {
    if (arg === undefined) {
        throw new Error(`Argument '${name}' must be present`);
    }
};

class Statement {
    constructor(meta) {
        mustExist('meta', meta);
        const { line, filename } = meta;
        mustExist('line', line);
        mustExist('filename', filename);
        this._line = line;
        this._filename = filename;
    }
    getLine() {
        return this._line;
    }
    getFilename() {
        return this._filename;
    }
}

class PushPop extends Statement {
    constructor(segment, value, meta) {
        super(meta);

        mustExist('segment', segment);
        mustExist('value', value);

        this._segment = segment;
        this._value = parseInt(value, 10);
    }

    getSegment() {
        return this._segment;
    }

    getValue() {
        return this._value;
    }
}

class Pop extends PushPop {
    constructor(segment, value, meta) {
        super(segment, value, meta);
        if (segment === SEGMENTS.CONST) {
            throw new Error(
                'Can not execute pop for the constant');
        }
    }
}

class Push extends PushPop {}

class Add extends Statement {}

class Sub extends Statement {}

class Eq extends Statement {}

function assertPush(obj) {
    if (!(obj instanceof Push)) {
        throw Error(`Expected Push type, actual ${typeof push}`);
    }
}

function assertPop(obj) {
    if (!(obj instanceof Pop)) {
        throw Error(`Expected Pop type, actual ${typeof push}`);
    }
}

function assertEq(obj) {
    if (!(obj instanceof Eq)) {
        throw Error(`Expected Eq type, actual ${typeof push}`);
    }
}

function assertAdd(obj) {
    if (!(obj instanceof Add)) {
        throw Error(`Expected Add type, actual ${typeof push}`);
    }
}

function assertSub(obj) {
    if (!(obj instanceof Sub)) {
        throw Error(`Expected Add type, actual ${typeof push}`);
    }
}

module.exports = { Push,
    Pop,
    Add,
    Sub,
    Eq,

    assertPush,
    assertPop,
    assertEq,
    assertAdd,
    assertSub,
};
