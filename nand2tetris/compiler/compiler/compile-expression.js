/* eslint-disable no-case-declarations */

function compileTerm(ast, cState) {
    switch (ast.getType()) {
        case 'integerConstant':
            cState.write(`push constant ${ast.getValue()}`);
            break;
        case 'identifier':
            const symb = cState.lookupSymbol(ast.getValue());
            cState.write(`push ${symb.kind} ${symb.num}`);
            break;
        default:
            throw new Error(`Unsupported expression type ${ast.getType()}`);
    }
}

function compileExpression(ast, cState) {
    switch (ast.type) {
        case 'term':
            ast.children.forEach((t) => compileTerm(t, cState));
            break;
        default:
            throw new Error(`Unsupported compile for expression type ${ast.type}`);
    }
}

module.exports = { compileExpression };
