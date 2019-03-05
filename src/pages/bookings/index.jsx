import React from "react"
import PropTypes from "prop-types"
import { Router } from "@reach/router"
import { graphql } from "gatsby"

import { contentData, GeneralPageData } from "../../components/i18n-data"
import { LayoutPage } from "../../components/layout"
import ContactPageForm from "../../components/contact-page-form"

const ContactPageFormWrapper = ({ options, strings, tour_code }) => (
  <ContactPageForm tours={options} selectedTour={tour_code} strings={strings} />
)

const ContactPage = ({ location, data, pathContext }) => {
  const { language } = pathContext
  const { strings } = contentData[language]
  const { sitemetadata } = data
  const { edges } = data.allMarkdownRemark

  const options = edges
    .map(o => o.node.frontmatter)
    .filter(o => o.language == pathContext.locale)

  return (
    <GeneralPageData pageId={15} moduleId={1} language={language}>
      {({ data: gpdata }) => (
        <LayoutPage
          location={location.pathname}
          siteTitle={pathContext.title || sitemetadata.title}
          languages={pathContext.languages}
          navigation={pathContext.navigation}
          language={language}
          data={{
            markdownRemark: {
              frontmatter: {
                title: gpdata.page_title,
                heading: gpdata.page_heading
              }
            },
            ...data
          }}
          sitemetadata={sitemetadata}
        >
          <Router>
            <ContactPageFormWrapper
              path={`${location}/:language/:page/:tour_code?`}
              options={options}
              strings={strings}
            />
          </Router>
        </LayoutPage>
      )}
    </GeneralPageData>
  )
}

ContactPage.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default ContactPage

export const query = graphql`
  query BookingsQuery($language: String!) {
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

    allMarkdownRemark(
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
  }
`
