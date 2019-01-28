import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Slideshow from "../components/slideshow"

import { getSlideshowData, contentData } from "../components/i18n-data"

const GeneralPage = ({
  location,
  page,
  data,
  sitemetadata,
  languages,
  currentLanguage,
  defaultLanguage,
  slideshowData
}) => (
  <React.Fragment>
    <div className="push" />
    <Slideshow
      fixed={false}
      slides={slideshowData}
      currentLanguage={currentLanguage}
    >
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-center">
              <h1>{data.heading}</h1>
            </div>
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
          <div className="row">
            <div className="col-xs-12">
              <div className="divider" />
            </div>
          </div>
        </div>
      </div>
    </Slideshow>
  </React.Fragment>
)

const GeneralPageTemplate = props => {
  const { location, data, pathContext } = props

  const currentLanguage = pathContext.language

  if (!currentLanguage) {
    console.log(`language not set on ${location.pathname}`)
  }

  const { sitemetadata, imagesSlides } = contentData[currentLanguage]

  const imgGroup = data.markdownRemark.frontmatter.imggrp_id

  const slides = getSlideshowData(imagesSlides, imgGroup)

  return (
    <Layout
      location={location.pathname}
      siteTitle={pathContext.title || sitemetadata.title}
      languages={pathContext.languages}
      language={currentLanguage}
      contact={sitemetadata.contact}
      data={data}
      sitemetadata={sitemetadata}
    >
      <GeneralPage
        location={location}
        page={data.markdownRemark}
        data={data.markdownRemark.frontmatter}
        sitemetadata={sitemetadata}
        languages={pathContext.languages}
        currentLanguage={currentLanguage}
        slideshowData={slides}
      />
    </Layout>
  )
}

GeneralPageTemplate.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired,
  data: PropTypes.object
}

export default GeneralPageTemplate

export const pageQuery = graphql`
  query PageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        language
        url
        imggrp_id
      }
    }
  }
`
