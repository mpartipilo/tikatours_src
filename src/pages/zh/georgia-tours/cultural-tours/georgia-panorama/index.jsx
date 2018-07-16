import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../../components/page-wrapper"
import TourDetails from "../../../../../components/tour-details"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Georgian Panorama"
    isTourDetails
    hasBreadcrumbs
    mapCanvasCountry="Georgia"
  >
    <TourDetails url={location.pathname} subCategory />
  </PageWrapper>
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
