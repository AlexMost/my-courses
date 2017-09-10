const EOL = require('os').EOL;

class ASTNode {
    constructor(type, children = []) {
        this.type = type;
        this.children = children;
    }
    toXML() {
        if (this.children.length) {
            const childXML = this.children.map((ch) => ch.toXML()).join(EOL);
            return `<${this.type}>${EOL}${childXML}${EOL}</${this.type}>`;
        }
        return `<${this.type}>${EOL}</${this.type}>`;
    }
}

module.exports = { ASTNode };
