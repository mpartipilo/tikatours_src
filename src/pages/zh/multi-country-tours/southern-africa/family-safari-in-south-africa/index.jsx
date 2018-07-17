import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../../components/page-wrapper"
import TourDetails from "../../../../../components/tour-details"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Family Safari in South Africa"
    isTourDetails
    hasBreadcrumbs
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
