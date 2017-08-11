const path = require('path');
const fs = require('fs');


function main(filepath) {
	console.log(`VM translating file '${filepath}' ...`);

	console.log(`Writing result to ${destFilepath}`);
	// fs.writeFileSync(destFilepath,
	// 	binaryLines.join('\n').concat('\n'));
}

main(process.argv[2]);
