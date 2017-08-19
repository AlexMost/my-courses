/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');
const EOL = require('os').EOL;

const { parseVMAST } = require('./parser');
const { translate } = require('./translator');
const { getBootstrap } = require('./bootstrap');

function processFile(filepath) {
	const rawStr = fs.readFileSync(filepath).toString();
    const vmAST = parseVMAST(rawStr, filepath);
    return translate(vmAST) + EOL;
}

function processDir(dirPath) {
	const bootstrapAsm = getBootstrap();
	const vmFiles = fs.readdirSync(dirPath)
	.filter((f) => fs.lstatSync(path.resolve(dirPath, f)).isFile())
	.filter((f) => f.endsWith('.vm'));
	const asmFiles = vmFiles.map(
		(fname) => processFile(path.resolve(dirPath, fname)));
	return [bootstrapAsm, ...asmFiles].join('');
}

function main(entryPath) {
	const lstat = fs.lstatSync(entryPath)
	const dirName = path.dirname(entryPath);
	let asm;
	let destFilepath;

	if (lstat.isFile()) {
		asm = processFile(entryPath);
    	const fname = path.basename(entryPath).replace('vm', 'asm');
    	destFilepath = path.join(dirName, fname);
	} else if (lstat.isDirectory()) {
		asm = processDir(entryPath);
		const fname = `${path.basename(entryPath)}.asm`;
		destFilepath = path.join(entryPath, fname);
	} else {
		throw new Error(`Unknown entry point ${entryPath}`);
	}

	fs.writeFileSync(destFilepath, asm);
	console.log(`Translated result to ${destFilepath}`);
}

main(process.argv[2]);
