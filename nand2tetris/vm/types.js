const { SEGMENTS } = require('./defs');

const mustExist = (name, arg) => {
	if (arg === undefined) {
		throw new Error(`Argument '${ name }' must be present`)
	}
}

class Statement {
	constructor({ line, filename }) {
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
	constructor(segment, value, meta) {
		super(segment, value, meta);
		if (segment == SEGMENTS.CONST) {
			throw new Error(
				'Can not create Pop statement for the constant segment');
		}
	}
}

class Push extends PushPop {}

module.exports = { Push, Pop }