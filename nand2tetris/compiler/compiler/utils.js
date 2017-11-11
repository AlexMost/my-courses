function groupParameterList(ast) {
    return ast.children
    .map((c) => c.getValue())
    .reduce((groups, symbol) => {
        if (symbol !== ',') {
            groups[groups.length - 1].push(symbol);
        } else {
            groups.push([]);
        }
        return groups;
    }, [[]]);
}

module.exports = { groupParameterList };
