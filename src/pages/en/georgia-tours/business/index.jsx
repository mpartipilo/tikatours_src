import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    hasBreadcrumbs
    heading="Business"
    location={location}
    tourList={{
      subCategory: true,
      heading: "Business",
      toursFilter: data =>
        data
          .filter(t => t.status === "A" && t.sub_category_id === 14)
          .sort((a, b) => a.rank - b.rank)
    }}
    mapCanvasCountry="Georgia"
    content={{
      page_id: 14,
      module_id: 100
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
