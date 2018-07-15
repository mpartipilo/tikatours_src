import React from "react"
import Link from "gatsby-link"

import PageWrapper from "../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    hasBreadcrumbs
    location={location}
    heading="Multi-Country Tours"
    catlist={{
      heading: "Choose your tour destination",
      tourCategoryFilter: data =>
        data
          .filter(t => t.status === "A" && t.parent_id === 2 && t.rank > 0)
          .sort((a, b) => a.rank - b.rank)
    }}
    tourList={{
      heading: "Multi Country Tours",
      toursFilter: data =>
        data
          .filter(t => t.status === "A" && t.main_category_id === 2)
          .sort((a, b) => a.rank - b.rank)
    }}
  >
    <div className="col-xs-12 col-sm-6 col-md-6">
      <p>
        The Caucasus region of Azerbaijan, Georgia and Armenia is a well-kept
        secret, a feast for the eyes, a thrill for the adventurous and paradise
        for culture buffs. A visit to this trio of mysterious, alluring,
        extraordinarily beautiful and wonderfully welcoming countries will weave
        you between dramatic icy peaks, semi-arid desert, exotic modernising
        capitals, ancient castles and quaint villages with traditions as old and
        resolute as the land.
      </p>
    </div>
    <div className="col-xs-12 col-sm-6 col-md-6">
      <p>
        Armenia and Georgia are the two oldest Christian countries, while in the
        Islamic Azerbaijan, the culture reflects Iranian as well as European
        influences. Fortresses, monasteries, mosques and churches dot the
        landscape. Visit the Old City of Baku in Azerbaijan, Armenia&apos;s
        laidback capital Yerevan, and Georgia&apos;s glorious countryside. A
        Tika Tour to the Caucasus is perfect for those who like to get beyond
        the beaten path and enjoy sumptuous hospitality.
      </p>
    </div>
  </PageWrapper>
)

export default Page
