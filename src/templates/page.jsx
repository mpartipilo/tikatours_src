import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { NewLayout } from "../components/layout"

import { getSlideshowData, allImagesSlides } from "../components/i18n-data"

const GeneralPageTemplate = ({ location, data, pathContext }) => {
  const {
    language,
    strings,
    contact_data,
    sitemetadata,
    navigation,
    languages,
    title
  } = pathContext

  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }

  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { heading } = frontmatter

  const { imagesSlides } = allImagesSlides[language]
  const imgGroup = data.markdownRemark.frontmatter.imggrp_id
  const slides = getSlideshowData(imagesSlides, imgGroup)

  const layoutProps = {
    location: location.pathname,
    strings,
    title,
    languages,
    language,
    sitemetadata,
    navigation,
    slides,
    fixed: false,
    heading,
    breadcrumbTrail: null,
    mainContent: (
      <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
    ),
    postContent: null,
    contact_data
  }

  return <NewLayout {...layoutProps} />
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
        title
        language
        url
        imggrp_id
      }
    }
  }
`
