/* eslint no-console: 0 */
const EOL = require('os').EOL;
const fs = require('fs');
const path = require('path');
const { compile } = require('./compiler/compiler');

function processFile(filepath) {
    const destFilepath = filepath.replace('.jack', '.vm');
    const raw = fs.readFileSync(filepath).toString();
    const compileState = compile(raw);
    fs.writeFileSync(destFilepath, `${compileState.getVMCode()}${EOL}`);
    console.log(`Saved result to ${destFilepath}`);
}


function processDir(dirpath) {
    fs.readdirSync(dirpath)
    .filter((f) => fs.lstatSync(path.resolve(dirpath, f)).isFile() && f.endsWith('.jack'))
    .forEach((f) => processFile(path.resolve(dirpath, f)));
}


function main(entryPath) {
    const lstat = fs.lstatSync(entryPath);
    return lstat.isFile() ? processFile(entryPath) : processDir(entryPath);
}

main(process.argv[2]);
