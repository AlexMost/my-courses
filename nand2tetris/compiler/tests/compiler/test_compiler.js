const { expect } = require('chai');
const { compile } = require('../../compiler/compiler');

const classDefn = `
class Main {
    field int testField1;
    field string testField2;
}
`;

describe('compiler class', () => {
    it('should fill class symbol table', () => {
        const state = compile(classDefn);
        expect(state.lookupSymbol('testField1')).to.eql({ type: 'int', kind: 'field', num: 0 });
        expect(state.lookupSymbol('testField2')).to.eql({ type: 'string', kind: 'field', num: 1 });
    });
});
