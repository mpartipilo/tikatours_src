import React from "react"

import PageWrapper from "../../components/page-wrapper"

const IndexPage = ({ location }) => (
  <PageWrapper
    location={location}
    bodyTagClasses="home"
    homeOverlay
    slideshow
    tourListDetails={{
      fweatured: true
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

export default IndexPage
