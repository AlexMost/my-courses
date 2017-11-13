/* eslint-disable no-case-declarations,no-use-before-define */

const { ASTNode, isUnary } = require('../parser/types');

const mapOp = {
    '+': 'add',
    '*': 'call Math.multiply 2',
    '<': 'lt',
    '>': 'gt',
    '=': 'eq',
    '&': 'and'
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

function writeUnary(op, cState) {
    if (op === '-') {
        cState.write('neg');
    } else if (op === '~') {
        cState.write('not');
    }
}

function isFunctionCall(ast) {
    if (ast.children.length === 6) {
        const [classNode, dotNode, funcNode, parenNode] = ast.children;
        return (classNode.getType() === 'identifier' &&
        dotNode.getValue() === '.' &&
        funcNode.getType() === 'identifier' &&
        parenNode.getValue() === '(');
    }
    return false;
}

function compileFunction(ast, cState) {
    const args = ast.children[4].children.filter((ch) => ch.type === 'expression');
    args.forEach((exp) => compileExpression(exp, cState));
    const [classNode, dotNode, funcNode] = ast.children;
    const name = `${classNode.getValue()}.${funcNode.getValue()}`;
    cState.write(`call ${name} ${args.length}`);
}

function compileTerm(ast, cState) {
    let unary = null;
    if (isFunctionCall(ast)) {
        compileFunction(ast, cState);
        return;
    }
    ast.children.forEach((child) => {
        if (child instanceof ASTNode) {
            switch (child.type) {
                case 'expression':
                    compileExpression(child, cState);
                    break;
                case 'term':
                    if (unary) {
                        compileTerm(child, cState);
                        writeUnary(unary, cState);
                        unary = null;
                    }
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
                if (isUnary(child)) {
                    unary = child.getValue();
                }
                break;
            case 'keyword':
                if (child.getValue() === 'true') {
                    cState.write('push constant 0');
                    cState.write('not');
                    return;
                }
                if (child.getValue() === 'false') {
                    cState.write('push constant 0');
                    return;
                }
                throw new Error(`Unsupported keyword ${JSON.stringify(child)}`);
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
        compileTerm(term, cState);
        if (tail && tail.length) {
            ast.children = tail;
            compileExpression(ast, cState);
        }
        cState.write(mapOp[symbol.getValue()]);
    }
}

module.exports = { compileExpression };
