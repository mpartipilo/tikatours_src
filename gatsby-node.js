/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require("lodash")
const path = require("path")
const { languages } = require("./src/i18n/locales")

exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage, deletePage } = boundActionCreators

  if (page.path.includes("404")) {
    return Promise.resolve()
  }

  const redirect = path.resolve("src/i18n/redirect.js")

  return new Promise(resolve => {
    const redirectPage = {
      ...page,
      component: redirect,
      context: {
        languages,
        locale: "",
        routed: false,
        redirectPage: page.path
      }
    }
    deletePage(page)
    createPage(redirectPage)

    languages.forEach(({ value }) => {
      const localePage = {
        ...page,
        originalPath: page.path,
        path: `/${value}${page.path}`,
        context: {
          languages,
          locale: value,
          routed: true,
          originalPath: page.path
        }
      }
      createPage(localePage)
    })

    resolve()
  })
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const generalPage = path.resolve("src/templates/page.jsx")
    const galleryPage = path.resolve("src/templates/gallery.jsx")
    const regionPage = path.resolve("src/templates/region.jsx")
    const tourCategoryPage = path.resolve("src/templates/tourcategory.jsx")
    const tourSubCategoryPage = path.resolve(
      "src/templates/toursubcategory.jsx"
    )
    const tourDetailPage = path.resolve("src/templates/tour.jsx")
    resolve(
      graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                id
                frontmatter {
                  language
                  url
                  template
                }
                html
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const pages = result.data.allMarkdownRemark.edges

        _.each(pages, (page, index) => {
          const previous =
            index === pages.length - 1 ? null : pages[index + 1].node
          const next = index === 0 ? null : pages[index - 1].node

          var component = generalPage

          if (page.node.frontmatter.template == "gallery") {
            component = galleryPage
          }

          if (page.node.frontmatter.template == "regions") {
            component = regionPage
          }

          if (page.node.frontmatter.template == "tourcategory") {
            component = tourCategoryPage
          }

          if (page.node.frontmatter.template == "toursubcategory") {
            component = tourSubCategoryPage
          }

          if (page.node.frontmatter.template == "tour") {
            component = tourDetailPage
          }

          createPage({
            path: `${page.node.frontmatter.language}/${
              page.node.frontmatter.url
            }`,
            component: component,
            context: {
              id: page.node.id,
              slug: page.node.frontmatter.url,
              url: page.node.frontmatter.url,
              language: page.node.frontmatter.language,
              previous,
              next
            }
          })
        })
      })
    )
  })
}

exports.modifyBabelrc = ({ babelrc }) => ({
  ...babelrc,
  plugins: babelrc.plugins.concat(["transform-regenerator"])
})
