const SymbolTable = require('./symbol-table');
const CompilerState = require('./compiler-state');
const parseAST = require('../analyzer');

function compileClass(ast, cState) {
    const symbolTable = new SymbolTable();
    const classVarDec = ast.children.filter(({ type }) => type === 'classVarDec');
    classVarDec.forEach((varDec) => {
        const [kindNode, typeNode, nameNode] = varDec.children;
        const kind = kindNode.getValue();
        const type = typeNode.getValue();
        const name = nameNode.getValue();
        symbolTable.define(name, type, kind);
    });

    cState.pushSymbolTable(symbolTable);
}


function compileAST(astNode, cState) {
    switch (astNode.type) {
        case 'class':
            compileClass(astNode, cState);
            break;
        default:
            throw new Error(`Unknown node type ${astNode}`);
    }
}

function compile(rawText) {
    const compilerState = new CompilerState();
    const ast = parseAST(rawText);
    compileAST(ast, compilerState);
    return compilerState;
}

module.exports = { compileAST, compile, compileClass };
