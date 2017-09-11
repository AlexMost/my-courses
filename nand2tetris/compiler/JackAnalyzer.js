/* eslint no-console: 0 */
const fs = require('fs');
// const path = require('path');
const { Tokenizer } = require('./tokenizer');
const parseClass = require('./parser/class');

function readFile(filepath) {
    return fs.readFileSync(filepath).toString();
}

function main(entryPath) {
    const destFilepath = entryPath.replace('.jack', '.xml');
    const raw = readFile(entryPath);
    const tokenizer = new Tokenizer(raw);
    const ast = parseClass(tokenizer);
    fs.writeFileSync(destFilepath, ast.toXML());
    console.log(`Saved result to ${destFilepath}`);
}

main(process.argv[2]);
