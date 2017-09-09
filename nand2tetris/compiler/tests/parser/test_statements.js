const { expect } = require('chai');
const parseStatements = require('../../parser/statements');
const { Tokenizer } = require('../../tokenizer');


const expectedSimple =
`<statements>
<letStatement>
<keyword> let </keyword>
<identifier> s </identifier>
<symbol> = </symbol>
<expression>
<term>
<identifier> i </identifier>
</term>
</expression>
<symbol> ; </symbol>
</letStatement>
<letStatement>
<keyword> let </keyword>
<identifier> s </identifier>
<symbol> = </symbol>
<expression>
<term>
<identifier> j </identifier>
</term>
</expression>
<symbol> ; </symbol>
</letStatement>
<letStatement>
<keyword> let </keyword>
<identifier> a </identifier>
<symbol> [ </symbol>
<expression>
<term>
<identifier> i </identifier>
</term>
</expression>
<symbol> ] </symbol>
<symbol> = </symbol>
<expression>
<term>
<identifier> j </identifier>
</term>
</expression>
<symbol> ; </symbol>
</letStatement>
</statements>`;

describe('parser statements', () => {
    it('should parse simple statement', () => {
        const input = `
        let s = i;
        let s = j;
        let a[i] = j;
        `;
        const tokenizer = new Tokenizer(input);
        const astNode = parseStatements(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSimple);
    });
    it('should not throw', () => {
        const input = `
        if (i) {
            let s = i;
            let s = j;
            let a[i] = j;
        }
        else {              // There is no else keyword in the Square files.
            let i = i;
            let j = j;
            let i = i;
            while(i) {
                let i = 1;
            }
        }
        `;
        const tokenizer = new Tokenizer(input);
        const fn = () => parseStatements(tokenizer);
        expect(fn).to.not.throw();
    });
});
