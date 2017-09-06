const fs = require('fs');
const { expect } = require('chai');
const { parseTokens } = require('../../tokenizer/utils');
const { dumpTokens } = require('../../tokenizer/dump');

const expected =
`<tokens>
<keyword> let </keyword>
<identifier> x </identifier>
<symbol> = </symbol>
<integerConstant> 5 </integerConstant>
<symbol> ; </symbol>
</tokens>
`;

describe('tokenizer utils parseTokens', () => {
    it('should parse tokens', () => {
        const input = `let x = 5;`;
        const result = dumpTokens(parseTokens(input));
        expect(result).to.eql(expected);
    });
    it('should parse Square', () => {
        const rawFile = fs.readFileSync('./tests/fixtures/Main.jack').toString();
        const xmlMain = fs.readFileSync('./tests/fixtures/MainT.xml').toString();
        const tokens = parseTokens(rawFile);
        const xmlResult = dumpTokens(tokens);
        expect(xmlResult).to.eql(xmlMain);
    });
    it('should parse ArrayTest', () => {
        const rawFile = fs.readFileSync('./tests/fixtures/ArrayTest.jack').toString();
        const xmlMain = fs.readFileSync('./tests/fixtures/ArrayTestT.xml').toString();
        const tokens = parseTokens(rawFile);
        const xmlResult = dumpTokens(tokens);
        expect(xmlResult).to.eql(xmlMain);
    });
});
