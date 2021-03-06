const { expect } = require('chai');
const { compile } = require('../../compiler/compiler');

const classDefn = `
class Main {
    field int testField1, testField11;
    field string testField2;
}
`;

const classDefnWithAssign = `
class FieldAssign {
    field int testField1;
    field string testField2;
    function int test(int arg1, string arg2) {
        var int a;
        var int b, c;
        let a = 1;
        let b = arg1;
        let b = arg2;
        let c = a;
        return a;
    }
}
`;

const expectedDefnWithAssign =
`function FieldAssign.test 3
push constant 1
pop local 0
push argument 0
pop local 1
push argument 1
pop local 1
push local 0
pop local 2
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

const seven =
`class Seven {
    
       function void main() {
          do Output.printInt(1 + (2 * 3));
          return;
       }
    
    }
`;

const sevenExpected =
`function Seven.main 0
push constant 1
push constant 2
push constant 3
call Math.multiply 2
add
call Output.printInt 1
pop temp 0
push constant 0
return
`;


const ifElseStatement =
`
class Seven {
    function void main() {
        if (1 < 2) {
            do Output.printInt(1 + (2 * 3));
        } else {
            do Output.printInt(0);
        }
        return;
    }

}
`;

const ifElseStatementExpected =
`function Seven.main 0
push constant 1
push constant 2
lt
if-goto IF_TRUE0
goto IF_FALSE0
label IF_TRUE0
push constant 1
push constant 2
push constant 3
call Math.multiply 2
add
call Output.printInt 1
pop temp 0
goto IF_END0
label IF_FALSE0
push constant 0
call Output.printInt 1
pop temp 0
label IF_END0
push constant 0
return
`;

const ifStatement =
`class Seven {
    function void main() {
        if (1 < 2) {
            do Output.printInt(1 + (2 * 3));
        }
        return;
    }
}`;

const ifStatementExpected =
`function Seven.main 0
push constant 1
push constant 2
lt
if-goto IF_TRUE0
goto IF_FALSE0
label IF_TRUE0
push constant 1
push constant 2
push constant 3
call Math.multiply 2
add
call Output.printInt 1
pop temp 0
label IF_FALSE0
push constant 0
return
`;

const whileStatement =
`class Seven {
    function void main() {
        var int a;
        let a = 0;
        while (a < 5) {
            do Output.printInt(1 + (2 * 3));
            let a = a + 1;
        }
        return;
    }
}
`;

const whileStatementExpected =
`function Seven.main 1
push constant 0
pop local 0
label WHILE_EXP0
push local 0
push constant 5
lt
not
if-goto WHILE_END0
push constant 1
push constant 2
push constant 3
call Math.multiply 2
add
call Output.printInt 1
pop temp 0
push local 0
push constant 1
add
pop local 0
goto WHILE_EXP0
label WHILE_END0
push constant 0
return
`;

const booleansTest =
`class FieldAssign {
    function boolean main() {
        var boolean a;
        var boolean b;
        let a = false;
        let b = true;
        return a;
    }
}`;

const booleanTestExpected =
`function FieldAssign.main 2
push constant 0
pop local 0
push constant 0
not
pop local 1
push local 0
return
`;

const constructorCall =
`class FieldAssign {
    function Point newPoint(int arg1, string arg2) {
        var Point p1;
        let p1 = Point.new(arg1, arg2);
        return p1;
    }
}
`;

const constructorCallExpected =
`function FieldAssign.newPoint 1
push argument 0
push argument 1
call Point.new 2
pop local 0
push local 0
return
`;

const constructorCreate =
`class Point {
    field int x;
    field int y;
    constructor Point new(int dx, int dy) {
        let x = dx;
        let y = dy;
        return this;
    }
}
`;

const constructorCreateExpected =
`function Point.new 0
push constant 2
call Memory.alloc 1
pop pointer 0
push argument 0
pop this 0
push argument 1
pop this 1
push pointer 0
return
`;

const method =
`class FieldAssign {
    field int x, y;
    method int getX() {
        return x;
    }
}
`;

const methodExpected =
`function FieldAssign.getX 0
push argument 0
pop pointer 0
push this 0
return
`;

const methodCall =
`class FieldAssign {
    field int x, y;
    method int getX() {
        return x;
    }
    method int test() {
        var int a;
        let a = getX();
        return a;
    }
}
`;

const methodCallExpected =
`function FieldAssign.getX 0
push argument 0
pop pointer 0
push this 0
return
function FieldAssign.test 1
push argument 0
pop pointer 0
push pointer 0
call FieldAssign.getX 1
pop local 0
push local 0
return
`;

const objMethodCall =
`class FieldAssign {
    method int getX() {
        var Point p1;
        let p1 = Point.new(1, 1);
        return p1.getX();
    }
}
`;

const objMethodCallExpected =
`function FieldAssign.getX 1
push argument 0
pop pointer 0
push constant 1
push constant 1
call Point.new 2
pop local 0
push local 0
call Point.getX 1
return
`;

const doObjMethodCall =
`class FieldAssign {
    method int getY() {
        return 1;
    }
    method int getX() {
        do getY();
        return 1;
    }
}
`;

const doObjMethodCallExpected =
`function FieldAssign.getY 0
push argument 0
pop pointer 0
push constant 1
return
function FieldAssign.getX 0
push argument 0
pop pointer 0
push pointer 0
call FieldAssign.getY 1
pop temp 0
push constant 1
return
`;

const testThisAsArg =
`class FieldAssign {
    method void dispose() {
      do square.dispose();
      do Memory.deAlloc(this);
      return;
   }
}`;

const testThisAsArgExpected =
`function FieldAssign.dispose 0
push argument 0
pop pointer 0
call square.dispose 0
pop temp 0
push pointer 0
call Memory.deAlloc 1
pop temp 0
push constant 0
return
`;

const testStrings =
`class FieldAssign {
    function void main() {
      do Output.printString("test ");
      return;
   }
}
`;

const testStringExpected =
`function FieldAssign.main 0
push constant 5
call String.new 1
push constant 116
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 115
call String.appendChar 2
push constant 116
call String.appendChar 2
push constant 32
call String.appendChar 2
call Output.printString 1
pop temp 0
push constant 0
return
`;

const testArrayAssign =
`class FieldAssign {
    function void main() {
      var Array a; 
      let a[0] = 7;
      return;
   }
}`;

const testArrayAssignExpected =
`function FieldAssign.main 1
push constant 0
push local 0
add
push constant 7
pop temp 0
pop pointer 1
push temp 0
pop that 0
push constant 0
return
`;

const testArrayAccess =
`class FieldAssign {
    function void main() {
      var Array a; 
      var int c;
      let c = a[2];
      return;
   }
}`;

const testArrayAccessExpected =
`function FieldAssign.main 2
push constant 2
push local 0
add
pop pointer 1
push that 0
pop local 1
push constant 0
return
`;

describe('compiler class', () => {
    it('should fill class symbol table', () => {
        const state = compile(classDefn);
        expect(state.lookupSymbol('testField1')).to.eql({ type: 'int', kind: 'field', num: 0 });
        expect(state.lookupSymbol('testField11')).to.eql({ type: 'int', kind: 'field', num: 1 });
        expect(state.lookupSymbol('testField2')).to.eql({ type: 'string', kind: 'field', num: 2 });
        expect(state.getClassName()).to.eql('Main');
    });
    it('shlould create symbol table for functions', () => {
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
    it('should compile do statement', () => {
        const state = compile(seven);
        expect(state.getVMCode()).to.eql(sevenExpected);
    });
    it('should compile if statement', () => {
        const state = compile(ifStatement);
        expect(state.getVMCode()).to.eql(ifStatementExpected);
    });
    it('should compile if-else statement', () => {
        const state = compile(ifElseStatement);
        expect(state.getVMCode()).to.eql(ifElseStatementExpected);
    });
    it('should compile while statement', () => {
        const state = compile(whileStatement);
        expect(state.getVMCode()).to.eql(whileStatementExpected);
    });
    it('should compile booleans correctly', () => {
        const state = compile(booleansTest);
        expect(state.getVMCode()).to.eql(booleanTestExpected);
    });
    it('should compile constructor call', () => {
        const state = compile(constructorCall);
        expect(state.getVMCode()).to.eql(constructorCallExpected);
    });
    it('should compile constructor create', () => {
        const state = compile(constructorCreate);
        expect(state.getVMCode()).to.eql(constructorCreateExpected);
    });
    it('should compile method declaration', () => {
        const state = compile(method);
        expect(state.getVMCode()).to.eql(methodExpected);
    });
    it('should compile method call', () => {
        const state = compile(methodCall);
        expect(state.getVMCode()).to.eql(methodCallExpected);
    });
    it('should call object method', () => {
        const state = compile(objMethodCall);
        expect(state.getVMCode()).to.eql(objMethodCallExpected);
    });
    it('should compile obj do method call', () => {
        const state = compile(doObjMethodCall);
        expect(state.getVMCode()).to.eql(doObjMethodCallExpected);
    });
    it('should use this as a fn argument', () => {
        const state = compile(testThisAsArg);
        expect(state.getVMCode()).to.eql(testThisAsArgExpected);
    });
    it('should compile strings', () => {
        const state = compile(testStrings);
        expect(state.getVMCode()).to.eql(testStringExpected);
    });
    it('should compile simple array assignment', () => {
        const state = compile(testArrayAssign);
        expect(state.getVMCode()).to.eql(testArrayAssignExpected);
    });
    it('should compile array access', () => {
        const state = compile(testArrayAccess);
        expect(state.getVMCode()).to.eql(testArrayAccessExpected);
    });
});
