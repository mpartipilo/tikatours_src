function makeNavigationTree(tree, parent) {
  var nodes = tree.filter(f => f.parentPath == parent)
  if (nodes.length === 0) return null
  return nodes.map(n => {
    delete n.parentPath
    const children = makeNavigationTree(tree, n.path)
    return {
      ...n,
      pages: children
    }
  })
}

module.exports = { makeNavigationTree }
