import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { LayoutPage } from "../components/layout"
import Blog from "../components/blog"

import { contentData } from "../components/i18n-data"

const BlogPageTemplate = ({ pathContext, location, data }) => {
  const { sitemetadata } = contentData[data.markdownRemark.frontmatter.language]
  const defaultLanguage = "en"
  const language = data.markdownRemark.frontmatter.language || defaultLanguage

  const { blog_post, blog_category } = pathContext

  return (
    <LayoutPage
      location={location.pathname}
      siteTitle={pathContext.title || sitemetadata.title}
      languages={pathContext.languages}
      navigation={pathContext.navigation}
      language={language}
      contact={sitemetadata.contact}
      data={data}
      sitemetadata={sitemetadata}
      fixed={false}
    >
      <div className="content">
        <Blog
          language={language}
          blog_post={blog_post}
          blog_category={blog_category}
        />
      </div>
    </LayoutPage>
  )
}

BlogPageTemplate.propTypes = {
  pathContext: PropTypes.object,
  location: PropTypes.object,
  data: PropTypes.object
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query BlogPageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading
        language
        url
      }
    }
  }
`
