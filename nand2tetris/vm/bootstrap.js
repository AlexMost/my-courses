const { asmText } = require('./translator/utils');
const { translate } = require('./translator');
const { parseVMAST } = require('./parser');
const EOL = require('os').EOL;

function getBootstrap() {
    const callSysInit = translate(
        parseVMAST('call Sys.init 0', 'Sys.vm'));

    const asm = asmText(`
        // SP = 256
        @256
        D=A
        @SP
        M=D
        ${callSysInit}
    `);
    return `// #### BOOTSTRAP ###${EOL}${asm}${EOL}// ### BOOTSTRAP ###${EOL}`;
}

module.exports = { getBootstrap };
