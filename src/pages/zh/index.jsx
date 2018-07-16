import React from "react"

import PageWrapper from "../../components/page-wrapper"
import homeOverlayData from "../../../data/home-overlay_zh.json"
import reasonsData from "../../../data/reasons.json"

const IndexPage = ({ location }) => (
  <PageWrapper
    location={location}
    bodyTagClasses="home"
    homeOverlay={homeOverlayData}
    slideshow
    tourList={{
      heading: "我们的特色旅游",
      toursFilter: data =>
        data.filter(t => t.is_featured === "1").sort((a, b) => a.rank - b.rank)
    }}
    reasons={reasonsData}
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
