import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../components/page-wrapper"

const Page = ({ location, pathContext }) => (
  <PageWrapper
    location={location}
    locale={pathContext.locale}
    isTourDetails
    hasBreadcrumbs
    mapCanvasCountry="Georgia"
  />
)

Page.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired
}

export default Page
