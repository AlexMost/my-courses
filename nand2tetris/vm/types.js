const checkArg = (name, arg) => {
	if (arg === undefined) {
		throw new Error(`Argument ${ name } must be present`)
	}
}

class Statement {
	constructor(command) {
		checkArg('command', command);
		this.command = command;
	}
}

class Push extends Statement {
	constructor(command, segment, value) {
		super(command);
		
		checkArg('segment', segment);
		checkArg('value', value);

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

module.exports = { Push }