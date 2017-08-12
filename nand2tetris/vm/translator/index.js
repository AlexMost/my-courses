const EOL = require('os').EOL;
const { Pop, Push, Add, Sub } = require('../types');

const { translatePop } = require('./pop');
const { translatePush } = require('./push');
const { translateAdd } = require('./add');
const { translateSub } = require('./sub');

function vmAST2ASM(vmNode) {
    let asmResult;
    if (vmNode instanceof Pop) {
        asmResult = translatePop(vmNode);
    } else if (vmNode instanceof Push) {
        asmResult = translatePush(vmNode);
    } else if (vmNode instanceof Add) {
        asmResult = translateAdd(vmNode);
    } else if (vmNode instanceof Sub) {
        asmResult = translateSub(vmNode);
    } else {
        throw new Error(`Unsupported vmNode type ${typeof vmNode}`);
    }
    return `// ${vmNode.getLine()}${EOL}${asmResult}`;
}

function translate(vmAST) {
    const strLines = vmAST.map(vmAST2ASM);
    return strLines.join(EOL);
}

module.exports = { translate };
