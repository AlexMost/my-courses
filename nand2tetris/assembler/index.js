const { parse } = require('./parser');

function main(filePath) {
	console.log(`Starting assemble file '${filePath}' ...`);
	const lines = parse(filePath);
}

main(process.argv[2]);
