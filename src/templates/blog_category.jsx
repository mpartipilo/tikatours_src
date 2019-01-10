import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import path from "path"
import md5 from "md5"

import Header from "../components/header"
import Footer from "../components/footer"
import Blog from "../components/blog"

import contentData from "../components/i18n-data"

const BlogPage = ({
  location,
  page,
  data,
  sitemetadata,
  currentLanguage,
  defaultLanguage,
  blog
}) => (
  <React.Fragment>
    <Header
      location={location.pathname}
      siteTitle={sitemetadata.title}
      languages={sitemetadata.languages}
      currentLanguage={currentLanguage}
      defaultLanguage={defaultLanguage}
      contact={sitemetadata.contact}
    />
    <div className="push" />
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>{data.heading}</h1>
          </div>
        </div>
        <div className="content">
          <Blog language={currentLanguage} {...blog} />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="divider" />
          </div>
        </div>
      </div>
      <Footer language={currentLanguage} />
    </div>
  </React.Fragment>
)

const BlogPageTemplate = ({ location, data }) => {
  const { sitemetadata } = contentData[data.markdownRemark.frontmatter.language]
  const defaultLanguage = "en"
  const currentLanguage =
    data.markdownRemark.frontmatter.language || defaultLanguage

  return (
    <BlogPage
      location={location}
      page={data.markdownRemark}
      data={data.markdownRemark.frontmatter}
      sitemetadata={sitemetadata}
      currentLanguage={currentLanguage}
      defaultLanguage={defaultLanguage}
    />
  )
}

BlogPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query BlogCategoryPageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        language
        url
      }
    }
  }
`
