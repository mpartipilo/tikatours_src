import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    hasBreadcrumbs
    location={location}
    heading="Family"
    tourList={{
      subCategory: true,
      heading: "Family",
      toursFilter: data =>
        data
          .filter(t => t.status === "A" && t.sub_category_id === 13)
          .sort((a, b) => a.rank - b.rank)
    }}
    mapCanvasCountry="Georgia"
    content={{
      page_id: 13,
      module_id: 100
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
