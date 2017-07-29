const DEFAULT_SYMBOLS = {
	SP: 0,
	LCL: 1,
	ARG: 2,
	THIS: 3,
	THAT: 4,
	SCREEN: 16384,
	KBD: 24576
}


function getDefaultSymbols() {
	const symbols = Object.assign({}, DEFAULT_SYMBOLS);
	for (let i = 0; i <= 15; i++) {
		symbols[`R${i}`] = i;
	}
	return symbols;
}

module.exports = { getDefaultSymbols };
