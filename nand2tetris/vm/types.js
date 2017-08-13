const { SEGMENTS } = require('./defs');

const mustExist = (name, arg) => {
    if (arg === undefined) {
        throw new Error(`Argument '${name}' must be present`);
    }
};

class Statement {
    constructor(meta) {
        mustExist('meta', meta);
        const { id, line, filename } = meta;
        mustExist('line', line);
        mustExist('id', id);
        mustExist('filename', filename);
        this.getId = () => id;
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

class Lt extends Statement {}

class Gt extends Statement {}

class Neg extends Statement {}

class And extends Statement {}

class Or extends Statement {}

class Not extends Statement {}

function assertPush(obj) {
    if (!(obj instanceof Push)) {
        throw Error(`Expected Push type, actual ${typeof obj}`);
    }
}

function assertPop(obj) {
    if (!(obj instanceof Pop)) {
        throw Error(`Expected Pop type, actual ${typeof obj}`);
    }
}

function assertEq(obj) {
    if (!(obj instanceof Eq)) {
        throw Error(`Expected Eq type, actual ${typeof obj}`);
    }
}

function assertAdd(obj) {
    if (!(obj instanceof Add)) {
        throw Error(`Expected Add type, actual ${typeof obj}`);
    }
}

function assertSub(obj) {
    if (!(obj instanceof Sub)) {
        throw Error(`Expected Add type, actual ${typeof obj}`);
    }
}

function assertLt(obj) {
    if (!(obj instanceof Lt)) {
        throw Error(`Expected Lt type, actual ${typeof obj}`);
    }
}

function assertGt(obj) {
    if (!(obj instanceof Gt)) {
        throw Error(`Expected Gt type, actual ${typeof obj}`);
    }
}

function assertNeg(obj) {
    if (!(obj instanceof Neg)) {
        throw Error(`Expected Neg type, actual ${typeof obj}`);
    }
}

function assertAnd(obj) {
    if (!(obj instanceof And)) {
        throw Error(`Expected And type, actual ${typeof obj}`);
    }
}

function assertOr(obj) {
    if (!(obj instanceof Or)) {
        throw Error(`Expected Or type, actual ${typeof obj}`);
    }
}

function assertNot(obj) {
    if (!(obj instanceof Not)) {
        throw Error(`Expected Not type, actual ${typeof obj}`);
    }
}

module.exports = {
    Push,
    Pop,
    Add,
    Sub,
    Eq,
    Lt,
    Gt,
    Neg,
    And,
    Or,
    Not,

    assertPush,
    assertPop,
    assertEq,
    assertAdd,
    assertSub,
    assertLt,
    assertGt,
    assertNeg,
    assertAnd,
    assertOr,
    assertNot,
};
