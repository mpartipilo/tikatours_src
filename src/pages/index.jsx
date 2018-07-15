import React from "react"
import Link from "gatsby-link"

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
  >
    <div className="col-xs-12 col-sm-6 col-md-6">
      <p>
        TikaTours is your specialist in luxury journeys to places less
        travelled. We welcome you to Georgia, a seductive secret jewel set
        between Europe and Asia with a staggeringly beautiful landscape and deep
        rooted traditions. Georgia weaves a warm embrace around its visitors,
        thrilling adventure seekers and enthralling history hounds.
      </p>
    </div>
    <div className="col-xs-12 col-sm-6 col-md-6">
      <p>
        Ski powdery slopes of unbroken meringue, explore the shimmering
        subtropical coast, touch the dreams of the past in rock-hewn villages
        savour the bottled sunlight in this birthplace of wine, climb forgotten
        mountain trails or slumber the day away in a hot, luxurious mineral
        bath. Tika Tours will help you reach amazing places and create
        unforgettable memories.
      </p>
    </div>
  </PageWrapper>
)

export default IndexPage
