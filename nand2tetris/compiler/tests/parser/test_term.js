const { expect } = require('chai');
const parseTerm = require('../../parser/term');
const { Tokenizer } = require('../../tokenizer');


const expectedIntegerConst =
`<term>
<integerConstant> 5 </integerConstant>
</term>`;

const expectedStringConst =
`<term>
<stringConstant> 5 </stringConstant>
</term>`;

const expectedKeywordConst =
`<term>
<keyword> true </keyword>
</term>`;

const expectedIdentifier =
`<term>
<identifier> x </identifier>
</term>`;

describe('parser term', () => {
    it('should parse integer constant', () => {
        const input = `5`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseTerm(tokenizer);
        expect(astNode.toXML()).to.eql(expectedIntegerConst);
    });
    it('should parse string constant', () => {
        const input = `"5"`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseTerm(tokenizer);
        expect(astNode.toXML()).to.eql(expectedStringConst);
    });
    it('should parse keyword constant', () => {
        const input = `true`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseTerm(tokenizer);
        expect(astNode.toXML()).to.eql(expectedKeywordConst);
    });
    it('should parse if is identifier', () => {
        const input = `x`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseTerm(tokenizer);
        expect(astNode.toXML()).to.eql(expectedIdentifier);
    });
});
