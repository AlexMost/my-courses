const fs = require('fs');
const path = require('path');
const { expect } = require('chai');

describe('test ConvertToBin', () => {
    it('should match with the working version', () => {
        const sourcePath = path.resolve(
            __dirname,
            '../fixtures/ConvertToBin/Main.jack');
        const expectedPath = path.resolve(
            __dirname,
            '../fixtures/ConvertToBin/Main.vm'
        );
        const rawFile = fs.readFileSync(sourcePath).toString();
        const { compile } = require('../../compiler/compiler');

        const expectedResult = fs.readFileSync(expectedPath).toString();
        const state = compile(rawFile);
        const vmResult = state.getVMCode();
        expect(vmResult).to.eql(expectedResult);
    });
});
