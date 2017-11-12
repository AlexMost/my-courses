const { compileExpression } = require('./compile-expression');

function compileLetStatement(ast, cState) {
    const [_, sourceNode, _2, expNode] = ast.children;
    expNode.children.forEach((exp) => compileExpression(exp, cState));
    const sourceSymb = cState.lookupSymbol(sourceNode.getValue());
    cState.write(`pop ${sourceSymb.kind} ${sourceSymb.num}`);
}

function compileReturnStatement(ast, cState) {
    const expNode = ast.children.find(({ type }) => type === 'expression');
    if (expNode) {
        expNode.children.forEach((exp) => compileExpression(exp, cState));
    }
    cState.write('return');
}

function compileStatement(ast, cState) {
    switch (ast.type) {
        case 'letStatement':
            compileLetStatement(ast, cState);
            break;
        case 'returnStatement':
            compileReturnStatement(ast, cState);
            break;
        default:
            throw new Error(`Unsupported statement ${ast.type}`);
    }
}

module.exports = { compileStatement };
