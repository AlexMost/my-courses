/* eslint-disable no-case-declarations,no-use-before-define */

const { compileExpression } = require('./compile-expression');

function compileLetStatement(ast, cState) {
    const [_, sourceNode, _2, expNode] = ast.children;
    compileExpression(expNode, cState);
    const sourceSymb = cState.lookupSymbol(sourceNode.getValue());
    if (sourceSymb.kind === 'field') {
        cState.write(`pop this ${sourceSymb.num}`);
    } else {
        cState.write(`pop ${sourceSymb.kind} ${sourceSymb.num}`);
    }
}

function compileReturnStatement(ast, cState) {
    const expNode = ast.children.find(({ type }) => type === 'expression');
    if (expNode) {
        compileExpression(expNode, cState);
    } else {
        cState.write('push constant 0');
    }
    cState.write('return');
}

function compileDoStatement(ast, cState) {
    const [doNode, classNode, dotNode, fnNode] = ast.children;
    const subroutineName = `${classNode.getValue()}.${fnNode.getValue()}`;
    const expressions = ast.children.find(({ type }) => type === 'expressionList')
    .children.filter(({ type }) => type === 'expression');
    expressions.forEach((exp) => compileExpression(exp, cState));
    cState.write(`call ${subroutineName} ${expressions.length}`);
    cState.write('pop temp 0');
}

function compileIfStatement(ast, cState) {
    const condExpr = ast.children.find(({ type }) => type === 'expression');
    const [trueStatements, falseStatements] = ast.children.filter(({ type }) => type === 'statements');
    if (falseStatements) { // with else branch
        const [labelTrue, labelFalse, ifEnd] = cState.getLabelsNames('IF_TRUE', 'IF_FALSE', 'IF_END');
        compileExpression(condExpr, cState);
        cState.write(`if-goto ${labelTrue}`);
        cState.write(`goto ${labelFalse}`);
        cState.write(`label ${labelTrue}`);
        trueStatements.children.forEach((st) => compileStatement(st, cState));
        cState.write(`goto ${ifEnd}`);
        cState.write(`label ${labelFalse}`);
        falseStatements.children.forEach((st) => compileStatement(st, cState));
        cState.write(`label ${ifEnd}`);
    } else { // without else branch
        const [labelTrue, labelFalse] = cState.getLabelsNames('IF_TRUE', 'IF_FALSE');
        compileExpression(condExpr, cState);
        cState.write(`if-goto ${labelTrue}`);
        cState.write(`goto ${labelFalse}`);
        cState.write(`label ${labelTrue}`);
        trueStatements.children.forEach((st) => compileStatement(st, cState));
        cState.write(`label ${labelFalse}`);
    }
}

function compileWhileStatement(ast, cState) {
    const [labelWhileExp, labelWhileEnd] = cState.getLabelsNames('WHILE_EXP', 'WHILE_END');
    const whileExp = ast.children.find(({ type }) => type === 'expression');
    const statements = ast.children.find(({ type }) => type === 'statements');
    cState.write(`label ${labelWhileExp}`);
    compileExpression(whileExp, cState);
    cState.write('not');
    cState.write(`if-goto ${labelWhileEnd}`);
    statements.children.forEach((st) => compileStatement(st, cState));
    cState.write(`goto ${labelWhileExp}`);
    cState.write(`label ${labelWhileEnd}`);
}

function compileStatement(ast, cState) {
    switch (ast.type) {
        case 'letStatement':
            compileLetStatement(ast, cState);
            break;
        case 'returnStatement':
            compileReturnStatement(ast, cState);
            break;
        case 'doStatement':
            compileDoStatement(ast, cState);
            break;
        case 'ifStatement':
            compileIfStatement(ast, cState);
            break;
        case 'whileStatement':
            compileWhileStatement(ast, cState);
            break;
        default:
            throw new Error(`Unsupported statement ${ast.type}`);
    }
}

module.exports = { compileStatement };
