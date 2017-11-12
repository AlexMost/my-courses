const { compileExpression } = require('./compile-expression');

function compileLetStatement(ast, cState) {
    const [_, sourceNode, _2, expNode] = ast.children;
    compileExpression(expNode, cState);
    const sourceSymb = cState.lookupSymbol(sourceNode.getValue());
    cState.write(`pop ${sourceSymb.kind} ${sourceSymb.num}`);
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
        default:
            throw new Error(`Unsupported statement ${ast.type}`);
    }
}

module.exports = { compileStatement };
