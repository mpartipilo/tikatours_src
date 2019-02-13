import React from "react"
import PropTypes from "prop-types"

import { contentData, GeneralPageData } from "../../components/i18n-data"
import { LayoutPage } from "../../components/layout"
import ContactPageForm from "../../components/contact-page-form"

const ContactPage = ({ location, pathContext }) => {
  const { language } = pathContext
  const { sitemetadata, strings } = contentData[language]

  return (
    <GeneralPageData pageId={8} moduleId={3} language={language}>
      {({ data }) => (
        <LayoutPage
          location={location.pathname}
          siteTitle={pathContext.title || sitemetadata.title}
          languages={pathContext.languages}
          navigation={pathContext.navigation}
          language={language}
          contact={sitemetadata.contact}
          data={{
            markdownRemark: {
              frontmatter: {
                title: data.page_title,
                heading: data.page_heading
              }
            }
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
  pathContext: PropTypes.object.isRequired
}

export default ContactPage
