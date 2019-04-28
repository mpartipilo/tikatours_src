import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { LayoutPage } from "../components/layout"
import Blog from "../components/blog"

const BlogPageTemplate = ({ pathContext, location, data }) => {
  const defaultLanguage = "en"
  const language = data.markdownRemark.frontmatter.language || defaultLanguage
  const { sitemetadata, contact_data } = data

  const { blog_post, blog_category, strings } = pathContext

  const blog_post_filtered = blog_post.filter(
    p => p.category_id == data.markdownRemark.frontmatter.id
  )

  var { heading, ...frontmatter } = data.markdownRemark.frontmatter
  frontmatter = {
    heading: `${strings["category_archives"]}: ${heading}`,
    ...frontmatter
  }

  return (
    <LayoutPage
      location={location.pathname}
      siteTitle={pathContext.title || sitemetadata.title}
      languages={pathContext.languages}
      navigation={pathContext.navigation}
      language={language}
      contact={sitemetadata.contact}
      data={{ markdownRemark: { frontmatter }, contact_data }}
      sitemetadata={sitemetadata}
      fixed={false}
    >
      <div className="content">
        <Blog
          language={language}
          blog_post={blog_post_filtered}
          blog_category={blog_category}
          category_id={data.markdownRemark.frontmatter.id}
        />
      </div>
    </LayoutPage>
  )
}

BlogPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query BlogCategoryPageById($id: String!, $language: String!) {
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

    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        id
        heading: label
        language
        url
      }
    }
  }
`
