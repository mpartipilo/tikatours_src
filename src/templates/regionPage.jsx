import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../components/page-wrapper"

const GeneralPageTemplate = ({ location, content }) => (
  <PageWrapper location={location} content={content} />
)

GeneralPageTemplate.propTypes = {
  location: PropTypes.object,
  content: PropTypes.object
}

export default GeneralPageTemplate
