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

class Token {
    constructor(meta) {
        mustExist('meta', meta);
        const { id, line, filename } = meta;
        mustExist('line', line);
        mustExist('id', id);
        mustExist('filename', filename);

        this._line = line;
        this._id = id;

        const [fileWithoutExt] = path.basename(filename).split(['.']);
        this._filename = fileWithoutExt;
    }
    getLine() {
        return this._line;
    }
    getFilename() {
        return this._filename;
    }
    getId() {
        return `${this.getFilename()}.${this._id}`;
    }
}

class PushPop extends Token {
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

class Add extends Token {}

class Sub extends Token {}

class Eq extends Token {}

class Lt extends Token {}

class Gt extends Token {}

class Neg extends Token {}

class And extends Token {}

class Or extends Token {}

class Not extends Token {}

class Label extends Token {
    constructor(label, meta) {
        super(meta);
        this._label = label;
    }
    getLabel() {
        return `${this._label}.${this.getFilename()}`;
    }
}

class IfGoTo extends Label {}

class GoTo extends Label {}

class Func extends Token {
    constructor(label, nArgs, meta) {
        super(meta);
        mustExist('label', label);
        mustExist('nArgs', nArgs);
        this._label = label;
        this._nArgs = parseInt(nArgs, 10);
    }
    getLabel() {
        return this._label;
    }
    getNArgs() {
        return this._nArgs;
    }
}

class Return extends Token {}

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
    IfGoTo,
    GoTo,
    Func,
    Return,

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
    assertIfGoTo: makeAssert(IfGoTo),
    assertGoTo: makeAssert(GoTo),
    assertFunction: makeAssert(Func),
    assertReturn: makeAssert(Return),
};
