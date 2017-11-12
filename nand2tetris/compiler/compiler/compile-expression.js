/* eslint-disable no-case-declarations,no-use-before-define */

const { ASTNode } = require('../parser/types');

const mapOp = {
    '+': 'add',
    '*': 'call Math.multiply 2',
};

function compileToken(ast, cState) {
    switch (ast.getType()) {
        case 'integerConstant':
            cState.write(`push constant ${ast.getValue()}`);
            break;
        case 'identifier':
            const symb = cState.lookupSymbol(ast.getValue());
            cState.write(`push ${symb.kind} ${symb.num}`);
            break;
        default:
            throw new Error(`Unsupported term type ${ast.getType()}`);
    }
}

function compileSingleExpression(ast, cState) {
    switch (ast.type) {
        case 'term':
            ast.children.forEach((t) => compileToken(t, cState));
            break;
        default:
            throw new Error(`Unsupported compile for expression type ${ast.type}`);
    }
}

function compileTerm(ast, cState) {
    ast.children.forEach((child) => {
        if (child instanceof ASTNode) {
            switch (child.type) {
                case 'expression':
                    compileExpression(child, cState);
                    break;
                default:
                    throw new Error(`Unsupported term expression ${ast.type}`);
            }
            return;
        }

        switch (child.getType()) {
            case 'integerConstant':
                cState.write(`push constant ${child.getValue()}`);
                break;
            case 'identifier':
                const symb = cState.lookupSymbol(child.getValue());
                cState.write(`push ${symb.kind} ${symb.num}`);
                break;
            case 'symbol':
                break;
            default:
                throw new Error(`Unsupported term type ${JSON.stringify(child)}`);
        }
    });
}

function compileExpression(ast, cState) {
    if (ast.children.length === 1) {
        compileTerm(ast.children[0], cState);
        return;
    }

    // term
    if (ast.children[0] instanceof ASTNode) {
        const [term1, symbol, term2, ...tail] = ast.children;
        compileTerm(term1, cState);
        compileTerm(term2, cState);
        cState.write(mapOp[symbol.getValue()]);
        if (tail && tail.length) {
            ast.children = tail;
            compileExpression(ast, cState);
        }
    } else {
        const [symbol, term, ...tail] = ast.children;
        cState.write(mapOp[symbol.getValue()]);
        compileTerm(term, cState);
        if (tail && tail.length) {
            ast.children = tail;
            compileExpression(ast, cState);
        }
    }
}

module.exports = { compileExpression };
