const crypto = require(`crypto`)
const Case = require(`case`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createParentChildLink } = actions

  // We only care about MarkdownRemark content.
  if (node.internal.type !== "MarkdownRemark") {
    return
  }

  const fileNode = getNode(node.parent)

  const { sourceInstanceName } = fileNode
  const soureceInstanceNameNormal = Case.pascal(sourceInstanceName)

  const markdownNode = {
    id: `${node.id}${soureceInstanceNameNormal}`,
    children: [node.id],
    parent: fileNode.id,
    internal: {
      type: `MarkdownRemark${soureceInstanceNameNormal}`
    }
  }

  markdownNode.frontmatter = {
    ...node.frontmatter,
    _PARENT: fileNode.id
  }

  markdownNode.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(markdownNode.frontmatter))
    .digest(`hex`)

  createNode(markdownNode)
  createParentChildLink({ parent: markdownNode, child: node })
}
