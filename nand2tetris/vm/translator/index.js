const EOL = require('os').EOL;
const { Pop, Push, Add,
    Sub, Eq, Lt, Gt, Neg, And, Or, Not } = require('../types');

const { translatePop } = require('./pop');
const { translatePush } = require('./push');
const { translateAdd } = require('./add');
const { translateSub } = require('./sub');
const { translateEq } = require('./eq');
const { translateLt } = require('./lt');
const { translateGt } = require('./gt');
const { translateNeg } = require('./neg');
const { translateAnd } = require('./and');
const { translateOr } = require('./or');
const { translateNot } = require('./not');

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
    } else if (vmNode instanceof Eq) {
        asmResult = translateEq(vmNode);
    } else if (vmNode instanceof Lt) {
        asmResult = translateLt(vmNode);
    } else if (vmNode instanceof Gt) {
        asmResult = translateGt(vmNode);
    } else if (vmNode instanceof Neg) {
        asmResult = translateNeg(vmNode);
    } else if (vmNode instanceof And) {
        asmResult = translateAnd(vmNode);
    } else if (vmNode instanceof Or) {
        asmResult = translateOr(vmNode);
    } else if (vmNode instanceof Not) {
        asmResult = translateNot(vmNode);
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
