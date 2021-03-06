const EOL = require('os').EOL;

class CompilerState {
    constructor(className) {
        this.symbolTables = [];
        this.className = className;
        this.writerLines = [];
        this.labelCountMap = {};
        this.getLabelName = this.getLabelName.bind(this);
        this.hasSymbol = this.hasSymbol.bind(this);
    }

    getLabelName(name) {
        if (this.labelCountMap[name] !== undefined) {
            this.labelCountMap[name] = this.labelCountMap[name] + 1;
        } else {
            this.labelCountMap[name] = 0;
        }
        return `${name}${this.labelCountMap[name]}`;
    }

    getLabelsNames(...names) {
        return names.map(this.getLabelName);
    }

    pushSymbolTable(symbolTable) {
        this.symbolTables.push(symbolTable);
    }

    popSymbolTable() {
        this.symbolTables.pop();
    }

    hasSymbol(symbol) {
        try {
            this.lookupSymbol(symbol);
            return true;
        } catch (err) {
            return false;
        }
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

    fieldsCount() {
        let count = 0;
        for (const st of this.symbolTables) {
            for (const name of Object.keys(st.toDict())) {
                const kind = st.kindOf(name);
                if (kind === 'field') count += 1;
            }
        }
        return count;
    }

    writePushValue(value) {
        const symb = this.lookupSymbol(value);
        if (symb.kind === 'field') {
            this.write(`push this ${symb.num}`);
        } else {
            this.write(`push ${symb.kind} ${symb.num}`);
        }
    }
}

module.exports = CompilerState;
