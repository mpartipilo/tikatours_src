import React from "react"
import Link from "gatsby-link"

import PageWrapper from "../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Georgia Tours"
    catlist={{
      heading: "Choose your tour style",
      tourCategoryFilter: data =>
        data
          .filter(t => t.parent_id === 1 && t.status === "A" && t.rank > 0)
          .sort((a, b) => a.rank - b.rank)
    }}
    tourList={{
      heading: "Georgia Tours",
      toursFilter: data =>
        data
          .filter(t => t.status === "A" && t.main_category_id === 1)
          .sort((a, b) => a.rank - b.rank)
    }}
    mapCanvasCountry="Georgia"
  >
    <div className="col-xs-12 col-sm-6 col-md-6">
      <p>
        Let Tika Tours unveil Georgia&apos;s many charms and reveal her secrets.
        Travel to the startlingly beautiful Caucasus mountain villages for a
        luxury adventure of a lifetime, relaxing at wooded alpine resorts with a
        sumptuous soak in a regenerative mineral cocktail. Discover elegant
        cities, their eclectic art and architecture and Georgia&apos;s world
        class wine and cuisine. The arresting landscape is the perfect setting
        for romantic stolen kisses and exhilarating family holidays.
      </p>
    </div>
    <div className="col-xs-12 col-sm-6 col-md-6">
      <p>
        Join with Tika Tours to explore Georgia&apos;s potential business and
        investment opportunities first hand or trust our extensive experience to
        facilitate your conference, symposium or team building adventure.
        We&apos;ll expose you to authentic insider experiences, uncommon
        cultural interactions, haunting natural beauty, and a host of
        extraordinary moments. Wherever your Georgian adventure takes you,
        we&apos;ll ensure your journey is singular, innovative and utterly
        unforgettable. You won&apos;t want to leave.
      </p>
    </div>
  </PageWrapper>
)

export default Page
