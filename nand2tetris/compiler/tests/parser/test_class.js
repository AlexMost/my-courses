const { expect } = require('chai');
const parseVarDec = require('../../parser/class');
const { Tokenizer } = require('../../tokenizer');


describe('parser class', () => {
    it('should parse class', () => {
        const input = `
        class Square {
           field int x, y; 
           field int size; 

           constructor Square new(int Ax, int Ay, int Asize) {
              let x = Ax;
              let y = Ay;
              let size = Asize;
              return x;
           }

           method void dispose() {
              return;
           }
       }
        `;
        const tokenizer = new Tokenizer(input);
        const fn = () => parseVarDec(tokenizer);
        expect(fn).to.not.throw();
    });
});
