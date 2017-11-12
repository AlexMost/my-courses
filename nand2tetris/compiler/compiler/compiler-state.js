const EOL = require('os').EOL;

class CompilerState {
    constructor(className) {
        this.symbolTables = [];
        this.className = className;
        this.writerLines = [];
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

    getClassName() {
        return this.className;
    }

    write(str) {
        this.writerLines.push(str);
    }

    getLocalsCount() {
        let count = 0;
        for (const st of this.symbolTables) {
            for (const name of Object.keys(st.toDict())) {
                const kind = st.kindOf(name);
                if (kind === 'local') count += 1;
            }
        }
        return count;
    }

    getVMCode() {
        return this.writerLines.join(EOL) + EOL;
    }
}

module.exports = CompilerState;
