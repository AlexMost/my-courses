const { SEGMENTS } = require('./defs');
const path = require('path');

const mustExist = (name, arg) => {
    if (arg === undefined) {
        throw new Error(`Argument '${name}' must be present`);
    }
};

const makeAssert = (Type) => {
    return (obj) => {
        if (!(obj instanceof Type)) {
            throw new Error(`Expected ${Type.name} type, actual ${typeof obj}`);
        }
    };
};

class Statement {
    constructor(meta) {
        mustExist('meta', meta);
        const { id, line, filename } = meta;
        mustExist('line', line);
        mustExist('id', id);
        mustExist('filename', filename);
        const [label] = path.basename(filename).split(['.']);
        this.getId = () => `${label}.${id}`;
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

class Label extends Statement {
    constructor(label, meta) {
        super(meta);
        this._label = label;
    }
    getLabel() {
        return `${this._label}.${this.getFilename()}`;
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
    Label,

    assertPush: makeAssert(Push),
    assertPop: makeAssert(Pop),
    assertEq: makeAssert(Eq),
    assertAdd: makeAssert(Add),
    assertSub: makeAssert(Sub),
    assertLt: makeAssert(Lt),
    assertGt: makeAssert(Gt),
    assertNeg: makeAssert(Neg),
    assertAnd: makeAssert(And),
    assertOr: makeAssert(Or),
    assertNot: makeAssert(Not),
    assertLabel: makeAssert(Label),
};
