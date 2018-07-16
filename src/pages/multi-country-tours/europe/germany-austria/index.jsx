import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../components/page-wrapper"
import TourDetails from "../../../../components/tour-details"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Christmas season in Germany and Austria"
    isTourDetails
    hasBreadcrumbs
  >
    <TourDetails url={location.pathname} subCategory />
  </PageWrapper>
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
