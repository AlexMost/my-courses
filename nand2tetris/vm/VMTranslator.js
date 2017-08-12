/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');
const EOL = require('os').EOL;

const { parseVMAST } = require('./parser');
const { translate } = require('./translator');

function main(filepath) {
    const rawStr = fs.readFileSync(filepath).toString();

    const vmAST = parseVMAST(rawStr, filepath);
    const asmStr = translate(vmAST) + EOL;

    const resultFile = path.dirname(filepath);
    const fname = path.basename(filepath).replace('vm', 'asm');
    const destFilepath = path.join(resultFile, fname);
    fs.writeFileSync(destFilepath, asmStr);

    console.log(`Translated result to ${destFilepath}`);
}

main(process.argv[2]);
