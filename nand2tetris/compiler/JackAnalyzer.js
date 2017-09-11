/* eslint no-console: 0 */
const EOL = require('os').EOL;
const fs = require('fs');
// const path = require('path');
const { Tokenizer } = require('./tokenizer');
const parseClass = require('./parser/class');

function processFile(filepath) {
    const destFilepath = filepath.replace('.jack', '.xml');
    const raw = fs.readFileSync(filepath).toString();
    const tokenizer = new Tokenizer(raw);
    const ast = parseClass(tokenizer);
    fs.writeFileSync(destFilepath, `${ast.toXML()}${EOL}`);
    console.log(`Saved result to ${destFilepath}`);
}

function main(entryPath) {
    processFile(entryPath);
}

main(process.argv[2]);
