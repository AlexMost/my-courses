/* eslint-env mocha */
const { expect } = require('chai');
const { _test, parseVMAST } = require('../parser');
const { Push, Pop, Label, IfGoTo, Func, Return } = require('../types');

const { cleanLine, parseStatement } = _test;

const content =
`
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/MemoryAccess/BasicTest/BasicTest.vm

// Executes pop and push commands using the virtual memory segments.
push constant 10
pop local 0 // comment
`;
const staticContent =
`
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/MemoryAccess/BasicTest/BasicTest.vm

// Executes pop and push commands using the virtual memory segments.
push static 5
`;

describe('parser parseVMAST', () => {
    it('should parse vm code to statements', () => {
        const [push, pop] = parseVMAST(content, 'static.vm');
        expect(push).to.be.an.instanceof(Push);
        expect(pop).to.be.an.instanceof(Pop);
    });

    it('shlould apply meta to statements', () => {
        const filepath = './tests/fixtures/static.vm';
        const [push] = parseVMAST(staticContent, filepath);
        expect(push.getFilename()).to.eql('static');
    });
});

describe('parser cleanLine', () => {
    it('should parse lines without comments', () => {
        const line = 'push constant 10 // comment';
        expect(cleanLine(line)).to.eql('push constant 10');
    });
    it('should return empty string for only comment line', () => {
        const line = '// comment';
        expect(cleanLine(line)).to.eql('');
    });
});

describe('parser parseStatement', () => {
    it('should parse push statement', () => {
        const line = 'push constant 10';
        const stmt = parseStatement(line, 'test', 1);
        expect(stmt).to.be.an.instanceof(Push);
    });

    it('should parse pop statement', () => {
        const line = 'pop local 10';
        const stmt = parseStatement(line, 'test', 1);
        expect(stmt).to.be.an.instanceof(Pop);
    });

    it('should parse label statement', () => {
        const line = 'label MY_LABEL';
        const stmt = parseStatement(line, 'Foo.vm', 1);
        expect(stmt).to.be.an.instanceof(Label);
        expect(stmt.getLabel()).to.be.eql('MY_LABEL.Foo');
    });

    it('should parse if-goto statement', () => {
        const line = 'if-goto MY_LABEL';
        const stmt = parseStatement(line, 'Foo.vm', 1);
        expect(stmt).to.be.an.instanceof(IfGoTo);
        expect(stmt.getLabel()).to.be.eql('MY_LABEL.Foo');
    });

    it('should parse function', () => {
        const line = 'function SimpleFunction.test 2';
        const fn = parseStatement(line, 'SimpleFunction.vm', 1);
        expect(fn).to.be.an.instanceof(Func);
        expect(fn.getLabel()).to.be.eql('SimpleFunction.test');
        expect(fn.getNArgs()).to.be.eql(2);
    });

    it('should parse return', () => {
        const line = 'return';
        const fn = parseStatement(line, 'SimpleFunction.vm', 1);
        expect(fn).to.be.an.instanceof(Return);
    });
});
