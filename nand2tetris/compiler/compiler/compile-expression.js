/* eslint-disable no-case-declarations,no-use-before-define */

const { ASTNode, isUnary } = require('../parser/types');
const { Token } = require('../tokenizer/types');

const mapOp = {
    '+': 'add',
    '-': 'sub',
    '*': 'call Math.multiply 2',
    '<': 'lt',
    '>': 'gt',
    '=': 'eq',
    '&': 'and'
};

function writeUnary(op, cState) {
    if (op === '-') {
        cState.write('neg');
    } else if (op === '~') {
        cState.write('not');
    }
}

function isSubRoutineCall(ast) {
    if (ast.children.length === 6) {
        const [classNode, dotNode, funcNode, parenNode] = ast.children;
        return (classNode.getType() === 'identifier' &&
        dotNode.getValue() === '.' &&
        funcNode.getType() === 'identifier' &&
        parenNode.getValue() === '(');
    }
    if (ast.children.length === 4) {
        const [funcNode, parenNode] = ast.children;
        return funcNode.getType() === 'identifier' && parenNode.getValue() === '(';
    }
    return false;
}

function isFunctionCall(ast, cState) {
    const [classNode] = ast.children;
    return ast.children.length === 6 && !cState.hasSymbol(classNode.getValue());
}

function compileFunctionCall(ast, cState) {
    const args = ast.children[4].children.filter((ch) => ch.type === 'expression');
    args.forEach((exp) => compileExpression(exp, cState));
    const [classNode, dotNode, funcNode] = ast.children;
    const name = `${classNode.getValue()}.${funcNode.getValue()}`;
    cState.write(`call ${name} ${args.length}`);
}

function compileMethodCall(ast, cState) {
    if (ast.children.length === 4) {
        cState.write('push pointer 0');
        const args = ast.children[2].children.filter((ch) => ch.type === 'expression');
        args.forEach((exp) => compileExpression(exp, cState));
        const methodName = ast.children[0].getValue();
        const name = `${cState.getClassName()}.${methodName}`;
        cState.write(`call ${name} ${args.length + 1}`);
        return;
    }
    if (ast.children.length === 6) {
        const instanceNode = ast.children[0];
        const methodNode = ast.children[2];
        const instanceSymbol = cState.lookupSymbol(instanceNode.getValue());
        const className = instanceSymbol.type;
        const args = ast.children[4].children.filter((ch) => ch.type === 'expression');
        cState.writePushValue(instanceNode.getValue());
        args.forEach((exp) => compileExpression(exp, cState));
        cState.write(`call ${className}.${methodNode.getValue()} ${args.length + 1}`);
    }
}

function compileString(str, cState) {
    const length = str.length;
    cState.write(`push constant ${length}`);
    cState.write('call String.new 1');
    for (let i = 0; i < str.length; i += 1) {
        cState.write(`push constant ${str.charCodeAt(i)}`);
        cState.write('call String.appendChar 2');
    }
}

function isArrayAccess(ast) {
    return (
        ast.children.length > 2 &&
        ast.children[1] instanceof Token &&
        ast.children[1].getValue() === '['
    );
}

function compileArrayAccess(ast, cState) {
    const [arrNode, _, indexExprNode] = ast.children;
    compileExpression(indexExprNode, cState);
    cState.writePushValue(arrNode.getValue());
    cState.write('add');
    cState.write('pop pointer 1');
    cState.write('push that 0');
}

function compileTerm(ast, cState) {
    let unary = null;
    if (isSubRoutineCall(ast)) {
        if (isFunctionCall(ast, cState)) {
            compileFunctionCall(ast, cState);
        } else {
            compileMethodCall(ast, cState);
        }
        return;
    }
    if (isArrayAccess(ast)) {
        compileArrayAccess(ast, cState);
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
                cState.writePushValue(child.getValue());
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
                if (child.getValue() === 'this') {
                    cState.write('push pointer 0');
                    return;
                }
                throw new Error(`Unsupported keyword ${JSON.stringify(child)}`);
            case 'stringConstant':
                compileString(child.getValue(), cState);
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
        if (!mapOp[symbol.getValue()]) {
            throw new Error(`Unexpected symbol ${symbol.getValue()}`);
        }
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
