const { getLines } = require('./parser');
const { getDefaultSymbols } = require('./hack-assembler');

function main(filePath) {
	console.log(`Starting assemble file '${filePath}' ...`);
	const lines = getLines(filePath);
	console.log(getDefaultSymbols());
	console.log(lines);
}

main(process.argv[2]);
