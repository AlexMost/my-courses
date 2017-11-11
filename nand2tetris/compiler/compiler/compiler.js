const SymbolTable = require('./symbol-table');
const CompilerState = require('./compiler-state');
const parseAST = require('../analyzer');
const { groupParameterList } = require('./utils');

function compileClass(ast, cState) {
    const symbolTable = new SymbolTable();
    const classVarDec = ast.children.filter(({ type }) => type === 'classVarDec');

    if (!classVarDec.length) return; // no need to create symbol table if there is no declarations

    classVarDec.forEach((varDec) => {
        const [kindNode, typeNode, nameNode] = varDec.children;
        const kind = kindNode.getValue();
        const type = typeNode.getValue();
        const name = nameNode.getValue();
        symbolTable.define(name, type, kind);
    });
    cState.pushSymbolTable(symbolTable);
}

function compileFunction(ast, cState) {
    const [_, _2, nameNode] = ast.children;
    const fnName = `${cState.getClassName()}.${nameNode.getValue()}`;
    const localsCount = cState.getLocalsCount();
    cState.write(`function ${fnName} ${localsCount}`);
}

function fillSubroutineSymbolTable(ast, cState) {
    const symbolTable = new SymbolTable();

    const parameterList = ast.children.find(({ type }) => type === 'parameterList');
    groupParameterList(parameterList).forEach(([type, name]) => {
        symbolTable.define(name, type, 'argument');
    });

    const varDecs = ast.children
    .find(({ type }) => type === 'subroutineBody').children
    .filter(({ type }) => type === 'varDec');

    varDecs.forEach((varDec) => {
        const [_, typeNode, nameNode] = varDec.children;
        const type = typeNode.getValue();
        const name = nameNode.getValue();
        symbolTable.define(name, type, 'local');
    });
    cState.pushSymbolTable(symbolTable);
}

function compileSubroutine(ast, cState) {
    fillSubroutineSymbolTable(ast, cState);
    const subroutineType = ast.children[0].getValue();
    switch (subroutineType) {
        case 'function':
            compileFunction(ast, cState);
            break;
        default:
            throw new Error(`Unknown subrouting type ${subroutineType}`);
    }
    cState.popSymbolTable();
}


function compileAST(astNode, cState) {
    switch (astNode.type) {
        case 'class':
            compileClass(astNode, cState);
            astNode.children
            .filter(({ type }) => type === 'subroutineDec')
            .map((subRoutine) => compileAST(subRoutine, cState));
            break;
        case 'subroutineDec':
            compileSubroutine(astNode, cState);
            break;
        default:
            throw new Error(`Unknown node type ${astNode}`);
    }
}

function compile(rawText) {
    const ast = parseAST(rawText);
    const [_, classNameNode] = ast.children;
    const compilerState = new CompilerState(classNameNode.getValue());
    compileAST(ast, compilerState);
    return compilerState;
}

module.exports = { compileAST, compile, compileClass };
