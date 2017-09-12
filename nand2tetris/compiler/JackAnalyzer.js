/* eslint no-console: 0 */
const EOL = require('os').EOL;
const fs = require('fs');
const path = require('path');
const parseAST = require('./analyzer');

function processFile(filepath) {
    const destFilepath = filepath.replace('.jack', '.xml');
    const raw = fs.readFileSync(filepath).toString();
    const ast = parseAST(raw);
    fs.writeFileSync(destFilepath, `${ast.toXML()}${EOL}`);
    console.log(`Saved result to ${destFilepath}`);
}


function processDir(dirpath) {
    fs.readdirSync(dirpath)
    .filter((f) => fs.lstatSync(path.resolve(dirpath, f)).isFile())
    .filter((f) => f.endsWith('.jack'))
    .forEach((f) => processFile(path.resolve(dirpath, f)));
}


function main(entryPath) {
    const lstat = fs.lstatSync(entryPath);
    return lstat.isFile() ? processFile(entryPath) : processDir(entryPath);
}

main(process.argv[2]);
