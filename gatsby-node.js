/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

const languages = ["en", "zh"]

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const indexPage = path.resolve("src/templates/index.jsx")
  const tourMainPage = path.resolve("src/templates/tourMainCategory.jsx")
  languages.forEach(lang => {
    // Create Index page for each language
    createPage({
      path: `/${lang}`,
      component: indexPage
    })

    // Create tour main categories

    // Create tour subcategories for each main category

    // Create general pages
  })
}
