import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Explore Historical Rome"
    isTourDetails
    hasBreadcrumbs
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
