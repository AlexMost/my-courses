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

const voidRet =
`class FieldAssign {
    function void test(int arg1, string arg2) {
        return;
    }
}`;

const voidRetExpected =
`function FieldAssign.test 0
push constant 0
return
`;

const expOpExp =
`class FieldAssign {
    function int test() {
        return 1 + (1 * 4);
    }
}
`;

const expectedOpExp =
`function FieldAssign.test 0
push constant 1
push constant 1
push constant 4
call Math.multiply 2
add
return
`;


const expOpExpOp =
`class FieldAssign {
    function int test() {
        return 1 + (1 * 4) + 3;
    }
}
`;

const expOpExpOpExpected =
`function FieldAssign.test 0
push constant 1
push constant 1
push constant 4
call Math.multiply 2
add
push constant 3
add
return
`;

const opExp =
`
class FieldAssign {
    function int test() {
        return ~(2 + 4 * (- 1));
    }
}
`;

const opExpExpected =
`function FieldAssign.test 0
push constant 2
push constant 4
add
push constant 1
neg
call Math.multiply 2
not
return
`;

const fnCall =
`class FieldAssign {
    function int sum(int a, int b) {
        return a + (a + b);
    }
    function int test() {
        return FieldAssign.sum(1, 1);
    }
}`;

const fnCallResult =
`function FieldAssign.sum 0
push argument 0
push argument 0
push argument 1
add
add
return
function FieldAssign.test 0
push constant 1
push constant 1
call FieldAssign.sum 2
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
    it('shlould handle void return', () => {
        const state = compile(voidRet);
        expect(state.getVMCode()).to.eql(voidRetExpected);
    });
    it('should compile exp op exp', () => {
        const state = compile(expOpExp);
        expect(state.getVMCode()).to.eql(expectedOpExp);
    });
    it('should compile exp op exp op', () => {
        const state = compile(expOpExpOp);
        expect(state.getVMCode()).to.eql(expOpExpOpExpected);
    });
    it('sould compile op exp', () => {
        const state = compile(opExp);
        expect(state.getVMCode()).to.eql(opExpExpected);
    });
    it('should compile fnCall in expression', () => {
        const state = compile(fnCall);
        expect(state.getVMCode()).to.eql(fnCallResult);
    });
});
