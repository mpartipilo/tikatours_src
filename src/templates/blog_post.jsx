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
    contact_data,
    navigation,
    languages,
    title
  } = pathContext

  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }

  const { markdownRemark } = data
  var { frontmatter } = markdownRemark
  const { heading } = frontmatter

  const { blog_post, blog_category } = pathContext

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
          category_id={data.markdownRemark.frontmatter.category_id}
          post_id={data.markdownRemark.frontmatter.post_id}
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
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query BlogPostPageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading: name
        language
        url
        post_id
        category_id
      }
    }
  }
`
