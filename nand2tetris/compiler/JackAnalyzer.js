/* eslint no-console: 0 */
const EOL = require('os').EOL;
const fs = require('fs');
const parseAST = require('./analyzer');

function processFile(filepath) {
    const destFilepath = filepath.replace('.jack', '.xml');
    const raw = fs.readFileSync(filepath).toString();
    const ast = parseAST(raw);
    fs.writeFileSync(destFilepath, `${ast.toXML()}${EOL}`);
    console.log(`Saved result to ${destFilepath}`);
}

function main(entryPath) {
    processFile(entryPath);
}

main(process.argv[2]);
