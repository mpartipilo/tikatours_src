import React from "react"

import PageWrapper from "../components/page-wrapper"

import reasonsData from "../../data/reasons.json"

const IndexPage = () => (
  <PageWrapper
    bodyTagClasses="home"
    homeOverlay={{
      heading: "Life changing travel experiences",
      subheading: "Luxury Journeys to Georgia, Armenia and Azerbaijan",
      intro: `TikaTours warmly welcomes you to places of extraordinary culture and history, geographical diversity and startling beauty. 

      We are your specialists in luxury journeys to less-travelled destinations, offering trips to the Caucasus region of Georgia, Armenia, and Azerbaijan.`,
      btn_text: "About us",
      btn_url: "/about"
    }}
    heading="Welcome to Tika Tours"
    slideshow
    tourList={{
      heading: "Our Featured Tours",
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
