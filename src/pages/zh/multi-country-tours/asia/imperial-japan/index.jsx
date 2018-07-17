import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Imperial Japan"
    isTourDetails
    hasBreadcrumbs
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
