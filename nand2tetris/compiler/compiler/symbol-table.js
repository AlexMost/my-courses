class SymbolTable {
    constructor() {
        this.nameHash = {};
        this.kindHashCount = {};
    }

    define(name, type, kind) {
        if (this.kindHashCount[kind] !== undefined) {
            this.kindHashCount[kind] += 1;
            this.nameHash[name] = { type, kind, num: this.kindHashCount[kind] - 1 };
        } else {
            this.kindHashCount[kind] = 1;
            this.nameHash[name] = { type, kind, num: 0 };
        }
    }

    varCount(kind) {
        return this.kindHashCount[kind] || 0;
    }

    kindOf(name) {
        return this.nameHash[name].kind;
    }

    typeOf(name) {
        return this.nameHash[name].type;
    }

    indexOf(name) {
        return this.nameHash[name].num;
    }

    toDict() {
        return this.nameHash;
    }
}

module.exports = SymbolTable;
