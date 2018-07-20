import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../components/page-wrapper"

const IndexPage = ({ location, pathContext }) => (
  <PageWrapper
    location={location}
    locale={pathContext.locale}
    bodyTagClasses="home"
    homeOverlay
    slideshow
    tourListDetails={{
      featured: true
    }}
    reasons
    mapCanvasCountry="Georgia"
    socialPanel
    homeGallery
    content={{
      page_id: 1,
      module_id: 1
    }}
  />
)

IndexPage.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired
}

export default IndexPage
