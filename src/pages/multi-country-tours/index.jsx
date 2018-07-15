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
    content={{
      page_id: 4,
      module_id: 1
    }}
  />
)

export default Page
