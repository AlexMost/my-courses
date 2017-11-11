class CompilerState {
    constructor() {
        this.symbolTables = [];
    }

    pushSymbolTable(symbolTable) {
        this.symbolTables.push(symbolTable);
    }

    popSymbolTable() {
        this.symbolTables.pop();
    }

    lookupSymbol(symbol) {
        for (const st of this.symbolTables) {
            const resolved = st.lookupSymbol(symbol);
            if (resolved) return resolved;
        }
        throw new Error(`Symbol ${symbol} is not found in symbol tables`);
    }
}

module.exports = CompilerState;
