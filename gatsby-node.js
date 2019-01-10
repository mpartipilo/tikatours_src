const _ = require("lodash")
const path = require("path")
const { languages } = require("./src/i18n/locales")

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

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

      if (localePage.originalPath === `/bookings/`) {
        const bookingPage = {
          ...localePage,
          matchPath: `/${value}${page.path}:path`
        }
        createPage(bookingPage)
      } else {
        createPage(localePage)
      }
    })

    resolve()
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const redirect = path.resolve("src/i18n/redirect.js")
    const homePage = path.resolve("src/templates/index.jsx")
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
          allPages: allMarkdownRemark(
            filter: { frontmatter: { url: { ne: null } } }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
                  language
                  url
                  template
                }
                html
              }
            }
          }

          allTours: allMarkdownRemark(
            filter: {
              frontmatter: { template: { eq: "tour" }, url: { ne: null } }
            }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
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

        const pages = result.data.allPages.edges

        const allUrl = _.uniqBy(pages, p => p.node.frontmatter.url).map(
          p => p.node.frontmatter.url
        )

        _.each(allUrl, page => {
          const redirectPage = {
            path: page || "/",
            component: redirect,
            context: {
              languages,
              locale: "",
              routed: false,
              redirectPage: page
            }
          }
          createPage(redirectPage)
        })

        _.each(pages, (page, index) => {
          if (!page.node.frontmatter.language) {
            console.log("Page without language: " + page.node.id)
            return
          }

          var component = generalPage

          if (
            page.node.frontmatter.url == "" ||
            page.node.frontmatter.url == "/"
          ) {
            component = homePage
          }

          if (page.node.frontmatter.template == "blog") {
            return
          }

          if (page.node.frontmatter.template == "blogcategory") {
            return
          }

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
              title: page.node.frontmatter.title,
              url: page.node.frontmatter.url,
              language: page.node.frontmatter.language,
              languages
            }
          })
        })
      })
    )
  })
}
