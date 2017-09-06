const { expect } = require('chai');
const { Tokenizer } = require('../../tokenizer');

describe('tokenizer test', () => {
    it('should parse tokens', () => {
        const input = `
        class Bar {
        	method Fraction foo(int y) {
        		return y + 1; // single line comment
        	}
        }
        `;

        const expectedValues = [
        	'class',
		  	'Bar',
		  	'{',
			'method',
			'Fraction',
			'foo',
			'(',
			'int',
			'y',
			')',
			'{',
			'return',
			'y',
			'+',
			1,
			';',
			'}',
			'}' 
		]

        const tokenizer = new Tokenizer(input);
        const tokensValues = tokenizer._tokens.map((t) => t.getValue());
        expect(tokensValues).to.eql(expectedValues);
    });

    it('should strip multiline comments', () => {
        const input = `
        class Bar {
        	/** multiline
        	* comment 
        	*/
        	method Fraction foo(int y) {
        		return y + 1; // single line comment
        	}
        }
        `;

        const expectedValues = [
        	'class',
		  	'Bar',
		  	'{',
			'method',
			'Fraction',
			'foo',
			'(',
			'int',
			'y',
			')',
			'{',
			'return',
			'y',
			'+',
			1,
			';',
			'}',
			'}' 
		]

        const tokenizer = new Tokenizer(input);
        const tokensValues = tokenizer._tokens.map((t) => t.getValue());
        expect(tokensValues).to.eql(expectedValues);
    });
});
