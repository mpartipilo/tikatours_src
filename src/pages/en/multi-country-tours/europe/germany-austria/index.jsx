import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Christmas season in Germany and Austria"
    isTourDetails
    hasBreadcrumbs
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
