const { expect } = require('chai');
const parsesoubroutineDec = require('../../parser/subroutineDec');
const { Tokenizer } = require('../../tokenizer');


const expectedSimple =
`<subroutineDec>
  <keyword> function </keyword>
  <keyword> int </keyword>
  <identifier> test </identifier>
  <symbol> ( </symbol>
  <parameterList>
    <keyword> boolean </keyword>
    <identifier> a </identifier>
  </parameterList>
  <symbol> ) </symbol>
  <subroutineBody>
    <symbol> { </symbol>
    <statements>
      <returnStatement>
        <keyword> return </keyword>
        <expression>
          <term>
            <identifier> a </identifier>
          </term>
        </expression>
        <symbol> ; </symbol>
      </returnStatement>
    </statements>
    <symbol> } </symbol>
  </subroutineBody>
</subroutineDec>`;

describe('parser soubroutine declaration', () => {
    it('should parse function', () => {
        const input = `
        function int test(boolean a) {
            return a;
        }
        `;
        const tokenizer = new Tokenizer(input);
        const astNode = parsesoubroutineDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSimple);
    });
});
