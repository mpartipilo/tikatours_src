import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { NewLayout } from "../components/layout"
import Blog from "../components/blog"

const BlogPageTemplate = ({ location, data, pathContext }) => {
  const {
    language,
    strings,
    sitemetadata,
    navigation,
    languages,
    title,
    blog_post,
    blog_category,
    contact_data
  } = pathContext

  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }

  const { markdownRemark } = data
  const { frontmatter } = markdownRemark
  const { heading } = frontmatter

  const layoutProps = {
    location: location.pathname,
    strings,
    title,
    languages,
    language,
    sitemetadata,
    navigation,
    slides: null,
    fixed: false,
    heading,
    breadcrumbTrail: null,
    mainContent: (
      <div className="content">
        <Blog
          language={language}
          blog_post={blog_post}
          blog_category={blog_category}
          strings={strings}
        />
      </div>
    ),
    postContent: null,
    contact_data
  }

  return <NewLayout {...layoutProps} />
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
