import React from "react"
import PropTypes from "prop-types"
import { Router } from "@reach/router"
import { graphql } from "gatsby"

import { LayoutPage } from "../components/layout"
import ContactPageForm from "../components/contact-page-form"

const ContactPageFormWrapper = ({ options, strings, tour_code }) => (
  <ContactPageForm tours={options} selectedTour={tour_code} strings={strings} />
)

const ContactPage = ({ location, pathContext, data }) => {
  const { language, isBooking, strings } = pathContext
  const { sitemetadata } = data

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

  return (
    <LayoutPage
      location={location.pathname}
      siteTitle={pathContext.title || sitemetadata.title}
      languages={pathContext.languages}
      navigation={pathContext.navigation}
      language={language}
      data={data}
      sitemetadata={sitemetadata}
      strings={strings}
    >
      {tag}
    </LayoutPage>
  )
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
