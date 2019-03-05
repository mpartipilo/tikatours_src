import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { contentData, GeneralPageData } from "../../components/i18n-data"
import { LayoutPage } from "../../components/layout"
import ContactPageForm from "../../components/contact-page-form"

const ContactPage = ({ location, pathContext, data }) => {
  const { language } = pathContext
  const { sitemetadata } = data
  const { strings } = contentData[language]

  return (
    <GeneralPageData pageId={8} moduleId={3} language={language}>
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
          <ContactPageForm strings={strings} />
        </LayoutPage>
      )}
    </GeneralPageData>
  )
}

ContactPage.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired
}

export default ContactPage

export const query = graphql`
  query ContactUsQuery($language: String!) {
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
