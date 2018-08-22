/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const { languages, localeData } = require("./src/i18n/locales")

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
        localeData,
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

  const indexPage = path.resolve("src/templates/index.jsx")
  const tourMainPage = path.resolve("src/templates/tourMainCategory.jsx")
  const tourSubCategoryPage = path.resolve("src/templates/tourSubCategory.jsx")
  const tourDetailsPage = path.resolve("src/templates/tourDetails.jsx")
  const regionPage = path.resolve("src/templates/regionPage.jsx")
  const blogPostPage = path.resolve("src/templates/blogPostPage.jsx")

  return new Promise((resolve, reject) => {
    resolve()
    //console.log(`Current language: ${value}`)l
    // Create Index page
    //console.log("Creating Index Page")
    //createPage({
    //  path: "/",
    //  component: indexPage
    //})
    // Create tour main categories
    // Create tour subcategories for each main category
    // Create general pages
    /*
    resolve(
      graphql(``).then(result => {
        if (result.errors) {
          reject(new Error(result.errors))
        }

        languages.forEach(({ value }) => {
          console.log(`Current language: ${value}`)

          createPage({
            path: "/",
            component: indexPage
          })

          const localePage = {
            originalPath: path,
            path: `/${value}${path}`,
            context: {
              languages,
              locale: value,
              routed: false,
              originalPath: path
            }
          }

          createPage(localePage)
        })
      })
    )
    */
  })
}

exports.modifyBabelrc = ({ babelrc }) => ({
  ...babelrc,
  plugins: babelrc.plugins.concat(["transform-regenerator"])
})
