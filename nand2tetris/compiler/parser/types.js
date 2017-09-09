const EOL = require('os').EOL;

class ASTNode {
	constructor(type, children) {
		this.type = type;
		this.children = children;
	}
	toXML() {
		const childXML = this.children.map((ch) => ch.toXML()).join(EOL);
		return `<${this.type}>${EOL}${childXML}${EOL}</${this.type}>${EOL}`
	}
}

module.exports = { ASTNode };
