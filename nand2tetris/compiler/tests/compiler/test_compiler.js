const { expect } = require('chai');
const { compile } = require('../../compiler/compiler');

const classDefn = `
class Main {
    field int testField1;
    field string testField2;
}
`;

const classDefnWithAssign = `
class FieldAssign {
    field int testField1;
    field string testField2;
    function int test(int arg1, string arg2) {
        var int a;
        var int b;
        let a = 1;
        let b = arg1;
        let b = arg2;
        return a;
    }
}
`;

const expectedDefnWithAssign =
`function FieldAssign.test 2
push constant 1
pop local 0
push argument 0
pop local 1
push argument 1
pop local 1
push local 0
return
`;

describe('compiler class', () => {
    it('should fill class symbol table', () => {
        const state = compile(classDefn);
        expect(state.lookupSymbol('testField1')).to.eql({ type: 'int', kind: 'field', num: 0 });
        expect(state.lookupSymbol('testField2')).to.eql({ type: 'string', kind: 'field', num: 1 });
        expect(state.getClassName()).to.eql('Main');
    });
    it('shlould create symbol table for methods', () => {
        const state = compile(classDefnWithAssign);
        expect(state.getVMCode()).to.eql(expectedDefnWithAssign);
    });
});
