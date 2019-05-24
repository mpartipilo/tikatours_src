import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { NewLayout, LayoutPage } from "../components/layout"
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
    blog_category
  } = pathContext

  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }

  const { contact_data, markdownRemark } = data
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

const BlogPageTemplateOld = ({ pathContext, location, data }) => {
  const { sitemetadata } = data
  const defaultLanguage = "en"
  const language = data.markdownRemark.frontmatter.language || defaultLanguage

  const { blog_post, blog_category, strings } = pathContext

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
      strings={strings}
    >
      <div className="content">
        <Blog
          language={language}
          blog_post={blog_post}
          blog_category={blog_category}
          strings={strings}
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
  query BlogPageById($id: String!, $language: String!) {
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
        title
        heading
        language
        url
      }
    }
  }
`
