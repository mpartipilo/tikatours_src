const _ = require("lodash")
const path = require("path")
const { languages } = require("./src/i18n/locales")
const { makeNavigationTree } = require("./src/utils/navigation")

exports.createPages = async ({ graphql, actions }) => {
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
    page: path.resolve("src/templates/page.jsx"),
    contact: path.resolve("src/templates/contact.jsx")
  }

  const redirect = path.resolve("src/i18n/redirect.js")

  for (const { value: lang } of languages) {
    const navigationPathRegex = `/^\\/${lang}/`
    const result = await graphql(
      `
        query($language: String!, $navigationPathRegex: String!) {
          sitemetadata: metadataJson {
            title
            contact {
              email
              telephone
            }
          }

          contact_data: contactJson(lang: { eq: $language }) {
            phone
            email
            address
            copyright
            credits
            navFooter {
              title
              url
            }
          }

          allNavigation: allNavigationJson(
            filter: { path: { regex: $navigationPathRegex } }
          ) {
            edges {
              node {
                path
                title
                parentPath
              }
            }
          }

          allPages: allMarkdownRemark(
            filter: {
              frontmatter: { url: { ne: null }, language: { eq: $language } }
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

          allBlogCategories: allMarkdownRemark(
            filter: {
              frontmatter: {
                template: { eq: "blogcategory" }
                language: { eq: $language }
              }
            }
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
            filter: {
              frontmatter: {
                template: { eq: "blog_post" }
                language: { eq: $language }
              }
            }
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
              frontmatter: {
                template: { eq: "tour" }
                url: { ne: null }
                language: { eq: $language }
              }
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

          allStrings: stringsJson(lang: { eq: $language }) {
            strings {
              book_tour
              more_info
              view_this_tour
              featured_tour
              feature_tour_list_heading
              otherTours
              category_archives
              required_fields
              tour_name
              first_name
              last_name
              email
              phone_mobile
              message
              captcha
              submit
              enter_text_you_see_above
              required_tname
              required_fname
              required_lname
              required_email
              required_captcha
              from_euro
              per_person
              phone
              address
              bookings
              tour_overview
              itinerary
              inclusions
              recent_posts
              categories
              posted_on
              _in_
              tour_gallery
              _Gallery
              Thank_you
              watch_video
              loading_video
              All_images
              Send_us_an_email
              Be_Social
              Where_in_the_world_is__country__
              Click_to_see_map
              Click_to_hide_map
              Georgia
            }
          }
        }
      `,
      { language: lang, navigationPathRegex }
    )

    if (result.errors) {
      console.log(result.errors)
      return
    }

    const {
      sitemetadata,
      contact_data,
      allStrings,
      allNavigation
    } = result.data

    const navNodes = allNavigation.edges.map(e => e.node)
    const navigationTree = makeNavigationTree(navNodes, "/")[0]

    const globalStrings = allStrings.strings

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

      if (page.node.frontmatter.url == "" || page.node.frontmatter.url == "/") {
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
        sitemetadata,
        contact_data,
        navigation: navigationTree,
        strings: globalStrings
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

      const createPageOptions = {
        path: `/${page.node.frontmatter.language}/${page.node.frontmatter.url}`,
        component: component,
        context
      }

      if (
        page.node.frontmatter.template === "contact" &&
        page.node.frontmatter.url === "bookings"
      ) {
        context.isBooking = true
        createPageOptions.matchPath = `/${page.node.frontmatter.language}/${
          page.node.frontmatter.url
        }/*`
      }

      createPage(createPageOptions)
    })
  }
}
