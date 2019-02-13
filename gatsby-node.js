const _ = require("lodash")
const path = require("path")
const { languages } = require("./src/i18n/locales")
const globalNavigation = {
  en: require("./data/json/en/navigation/navigation.json"),
  zh: require("./data/json/zh/navigation/navigation.json")
}

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
          language: value,
          routed: true,
          originalPath: page.path,
          navigation: globalNavigation[value]
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

  const templates = {
    blog: path.resolve("src/templates/blog.jsx"),
    blog_post: path.resolve("src/templates/blog_post.jsx"),
    blogcategory: path.resolve("src/templates/blog_category.jsx"),
    gallery: path.resolve("src/templates/gallery.jsx"),
    regions: path.resolve("src/templates/region.jsx"),
    tourcategory: path.resolve("src/templates/tourcategory.jsx"),
    toursubcategory: path.resolve("src/templates/toursubcategory.jsx"),
    tour: path.resolve("src/templates/tour.jsx"),
    home: path.resolve("src/templates/index.jsx"),
    page: path.resolve("src/templates/page.jsx")
  }

  return new Promise((resolve, reject) => {
    const redirect = path.resolve("src/i18n/redirect.js")

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

          allBlogCategories: allMarkdownRemark(
            filter: { frontmatter: { template: { eq: "blogcategory" } } }
          ) {
            edges {
              node {
                frontmatter {
                  id
                  template
                  label
                  url
                  title
                  meta_keywords
                  meta_description
                  status
                  rank
                  language
                }
                id
              }
            }
          }

          allBlogPosts: allMarkdownRemark(
            filter: { frontmatter: { template: { eq: "blog_post" } } }
          ) {
            edges {
              node {
                id
                frontmatter {
                  language
                  url
                  post_id
                  title
                  name
                  category_id
                  date_posted
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

          var component = templates.page

          if (
            page.node.frontmatter.url == "" ||
            page.node.frontmatter.url == "/"
          ) {
            component = templates.home
          }

          if (templates[page.node.frontmatter.template]) {
            component = templates[page.node.frontmatter.template]
          }

          const context = {
            id: page.node.id,
            slug: page.node.frontmatter.url,
            title: page.node.frontmatter.title,
            url: page.node.frontmatter.url,
            language: page.node.frontmatter.language,
            languages,
            navigation: globalNavigation[page.node.frontmatter.language]
          }

          if (
            page.node.frontmatter.template === "blog" ||
            page.node.frontmatter.template == "blogcategory" ||
            page.node.frontmatter.template == "blog_post"
          ) {
            context.blog_post = result.data.allBlogPosts.edges
              .filter(e => e.node.frontmatter.language == context.language)
              .map(e => ({
                id: e.node.id,
                long_description: e.node.html,
                ...e.node.frontmatter
              }))

            context.blog_category = result.data.allBlogCategories.edges
              .filter(e => e.node.frontmatter.language == context.language)
              .map(e => e.node.frontmatter)
          }

          createPage({
            path: `${page.node.frontmatter.language}/${
              page.node.frontmatter.url
            }`,
            component: component,
            context
          })
        })
      })
    )
  })
}
