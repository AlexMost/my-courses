const { expect } = require('chai');
const parseVarDec = require('../../parser/subroutineBody');
const { Tokenizer } = require('../../tokenizer');


const expectedSimple =
`<subroutineBody>
<symbol> { </symbol>
<statements>
<returnStatement>
<keyword> return </keyword>
<expression>
<term>
<identifier> x </identifier>
</term>
</expression>
<symbol> ; </symbol>
</returnStatement>
</statements>
<symbol> } </symbol>
</subroutineBody>`;

const expectedWithVars =
`<subroutineBody>
<symbol> { </symbol>
<varDec>
<keyword> var </keyword>
<keyword> int </keyword>
<identifier> a </identifier>
<symbol> ; </symbol>
</varDec>
<statements>
<letStatement>
<keyword> let </keyword>
<identifier> a </identifier>
<symbol> = </symbol>
<expression>
<term>
<integerConstant> 5 </integerConstant>
</term>
</expression>
<symbol> ; </symbol>
</letStatement>
<returnStatement>
<keyword> return </keyword>
<expression>
<term>
<identifier> x </identifier>
</term>
</expression>
<symbol> ; </symbol>
</returnStatement>
</statements>
<symbol> } </symbol>
</subroutineBody>`;

describe('parser subroutineBody', () => {
    it('should parse subroutine body without var declarations', () => {
        const input = `{
            return x;
        }`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSimple);
    });
    it('should parse subroutine body with var declarations', () => {
        const input = `{
            var int a;
            let a = 5;
            return x;
        }`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedWithVars);
    });
});
