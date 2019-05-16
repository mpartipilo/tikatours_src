import React from "react"
import PropTypes from "prop-types"
import { Router } from "@reach/router"
import { graphql } from "gatsby"

import { NewLayout } from "../components/layout"
import ContactPageForm from "../components/contact-page-form"

const ContactPageFormWrapper = ({ options, strings, tour_code }) => (
  <ContactPageForm tours={options} selectedTour={tour_code} strings={strings} />
)

const ContactPage = ({ location, data, pathContext }) => {
  const {
    language,
    strings,
    sitemetadata,
    navigation,
    languages,
    title,
    isBooking
  } = pathContext

  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }

  const { contact_data, markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { heading } = frontmatter

  var tag = <ContactPageForm strings={strings} />

  if (isBooking) {
    const { edges } = data.tours

    const options = edges
      .map(o => o.node.frontmatter)
      .filter(o => o.language == language)

    tag = (
      <Router>
        <ContactPageFormWrapper
          path={`/:language/:page/:tour_code`}
          options={options}
          strings={strings}
        />
        <ContactPageFormWrapper
          path={`/:language/:page`}
          options={options}
          strings={strings}
        />
      </Router>
    )
  }

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
    mainContent: tag,
    postContent: null,
    contact_data
  }

  return <NewLayout {...layoutProps} />
}

ContactPage.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired
}

export default ContactPage

export const query = graphql`
  query ContactPageQuery($id: String!, $language: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        title
        language
        url
      }
    }

    tours: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "tour" }, name: { ne: null } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            tour_id
            language
          }
        }
      }
    }

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
  }
`
