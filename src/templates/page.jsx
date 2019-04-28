import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { LayoutPage } from "../components/layout"

import { getSlideshowData, imagesSlides } from "../components/i18n-data"

const GeneralPageTemplate = props => {
  const { location, data, pathContext } = props
  const { language } = pathContext

  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }

  const { imagesSlides } = imagesSlides[language]
  const { sitemetadata } = data

  const imgGroup = data.markdownRemark.frontmatter.imggrp_id

  const slides = getSlideshowData(imagesSlides, imgGroup)

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
      slides={slides}
      fixed={false}
    >
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
    </LayoutPage>
  )
}

GeneralPageTemplate.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired,
  data: PropTypes.object
}

export default GeneralPageTemplate

export const pageQuery = graphql`
  query PageById($id: String!, $language: String!) {
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
        heading
        title
        language
        url
        imggrp_id
      }
    }
  }
`
