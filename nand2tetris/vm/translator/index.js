const EOL = require('os').EOL;
const { Pop, Push, Add,
    Sub, Eq, Lt, Gt, Neg, And, Or, Not, Label, IfGoTo, GoTo,
    Func, Return, Call
} = require('../types');

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
const { translateLabel } = require('./label');
const { translateIfGoTo } = require('./if-goto');
const { translateGoTo } = require('./goto');
const { translateFunc } = require('./function');
const { translateReturn } = require('./return');
const { translateCall } = require('./call');

function vmAST2ASM(vmNode) {
    /* eslint complexity: 0 */
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
    } else if (vmNode instanceof IfGoTo) {
        asmResult = translateIfGoTo(vmNode);
    } else if (vmNode instanceof GoTo) {
        asmResult = translateGoTo(vmNode);
    } else if (vmNode instanceof Label) {
        asmResult = translateLabel(vmNode);
    } else if (vmNode instanceof Call) {
        asmResult = translateCall(vmNode);
    } else if (vmNode instanceof Return) {
        asmResult = translateReturn(vmNode);
    } else if (vmNode instanceof Func) {
        asmResult = translateFunc(vmNode);
    } else {
        throw new Error(`Unsupported vmNode type '${vmNode.constructor.name}'`);
    }
    return `// ${vmNode.getLine()}${EOL}${asmResult}`;
}


function translate(vmAST) {
    const strLines = vmAST.map(vmAST2ASM);
    return strLines.join(EOL);
}

module.exports = { translate };
