/* global graphql */
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Header from "../components/header"
import Footer from "../components/footer"
import Slideshow from "../components/slideshow"

import { getSlideshowData, contentData } from "../components/i18n-data"

const GeneralPage = ({
  location,
  page,
  data,
  sitemetadata,
  currentLanguage,
  defaultLanguage,
  slideshowData
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
    {slideshowData &&
      slideshowData.length > 0 && (
        <Slideshow fixed={false} slides={slideshowData} />
      )}
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
      <Footer language={currentLanguage} />
    </div>
  </React.Fragment>
)

const GeneralPageTemplate = props => {
  const { location, data, pathContext } = props

  const defaultLanguage = "en"
  const currentLanguage =
    data.markdownRemark.frontmatter.language || defaultLanguage

  if (!data.markdownRemark.frontmatter.language) {
    console.log(`language not set on ${location.pathname}`)
  }

  const { sitemetadata, imagesSlides } = contentData[currentLanguage]

  const imgGroup = data.markdownRemark.frontmatter.imggrp_id

  const { slides, videos_html } = getSlideshowData(imagesSlides, imgGroup)

  return (
    <React.Fragment>
      <Helmet title={pathContext.title} />
      <GeneralPage
        location={location}
        page={data.markdownRemark}
        data={data.markdownRemark.frontmatter}
        sitemetadata={sitemetadata}
        currentLanguage={currentLanguage}
        defaultLanguage={defaultLanguage}
        slideshowData={slides}
      />
    </React.Fragment>
  )
}

GeneralPageTemplate.propTypes = {
  location: PropTypes.object,
  pathContxt: PropTypes.object,
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
