const { expect } = require('chai');
const SymbolTable = require('../../compiler/symbol-table');

describe('symbol-table', () => {
    let sTable;
    before(() => {
        sTable = new SymbolTable();
    });
    it('should define name', () => {
        sTable.define('x', 'int', 'field');
        sTable.define('y', 'int', 'field');
        sTable.define('pointCount', 'int', 'static');
        const expected = {
            x: { type: 'int', kind: 'field', num: 0 },
            y: { type: 'int', kind: 'field', num: 1 },
            pointCount: { type: 'int', kind: 'static', num: 0 },
        };
        expect(sTable.toDict()).to.eql(expected);
    });
    it('should return var count', () => {
        expect(sTable.varCount('field')).to.eql(2);
    });
    it('should return var count', () => {
        expect(sTable.varCount('field')).to.eql(2);
    });
    it('should return kind of var', () => {
        expect(sTable.kindOf('x')).to.eql('field');
    });
    it('should return type of var', () => {
        expect(sTable.typeOf('x')).to.eql('int');
    });
    it('should return index of', () => {
        expect(sTable.indexOf('y')).to.eql(1);
    });
});
