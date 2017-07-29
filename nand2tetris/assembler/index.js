const path = require('path');
const fs = require('fs');

const { parse } = require('./parser');
const { assemble } = require('./hack-assembler');

function main(filepath) {
	console.log(`Starting assemble file '${filepath}' ...`);

	const symbolicLines = parse(filepath);
	const binaryLines = assemble(symbolicLines);

	const resultFile = path.dirname(filepath);
	const fname = path.basename(filepath).replace('asm', 'hack');
	const destFilepath = path.join(resultFile, fname);

	console.log(`Writing result to ${destFilepath}`);
	fs.writeFileSync(destFilepath,
		binaryLines.join('\n').concat('\n'));
}

main(process.argv[2]);
