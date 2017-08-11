const { SEGMENTS } = require('./defs');

const mustExist = (name, arg) => {
	if (arg === undefined) {
		throw new Error(`Argument '${ name }' must be present`)
	}
}

class Statement {
	constructor(line) {
		mustExist('line', line);
		this._line = line;
	}
	getLine() {
		return this._line;
	}
}

class PushPop extends Statement {
	constructor(segment, value, line) {
		super(line);

		mustExist('segment', segment);
		mustExist('value', value);

		this._segment = segment;
		this._value = value;
	}

	getSegment() {
		return this._segment;
	}

	getValue() {
		return this._value;
	}
}

class Pop extends PushPop {
	constructor(segment, value, line) {
		super(segment, value, line);
		if (segment == SEGMENTS.CONST) {
			throw new Error(
				'Can not create Pop statement for the constant segment');
		}
	}
}

class Push extends PushPop {}

module.exports = { Push, Pop }