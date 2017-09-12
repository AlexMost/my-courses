const fs = require('fs');
const { expect } = require('chai');
const parseAST = require('../../analyzer');


describe('analyzer', () => {
    it('should parse ast for ArrayTest', () => {
        const raw = fs.readFileSync('./tests/fixtures/ArrayTest.jack').toString();
        const AST = parseAST(raw);
        const expected = fs.readFileSync('./tests/fixtures/ArrayTest.xml').toString();
        expect(AST.toXML()).to.eql(expected);
    });
    it('should parse ast for Main.jack', () => {
        const raw = fs.readFileSync('./tests/fixtures/Main.jack').toString();
        const AST = parseAST(raw);
        const expected = fs.readFileSync('./tests/fixtures/Main.xml').toString();
        expect(AST.toXML()).to.eql(expected);
    });
    it('should parse ast for SquareGame.jack', () => {
        const raw = fs.readFileSync('./tests/fixtures/SquareGame.jack').toString();
        const AST = parseAST(raw);
        const expected = fs.readFileSync('./tests/fixtures/SquareGame.xml').toString();
        expect(AST.toXML()).to.eql(expected);
    });
});
