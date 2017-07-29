const { getLines } = require('./parser');
const { AsmState, discoverLabels } = require('./hack-assembler');

function main(filePath) {
	console.log(`Starting assemble file '${filePath}' ...`);
	const lines = getLines(filePath);
	const state = new AsmState();
	const withLables = discoverLabels(lines, state);
	const withVariables = discoverVariables(withLables, state);
}

main(process.argv[2]);
