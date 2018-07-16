import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    hasBreadcrumbs
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
    content={{
      page_id: 3,
      module_id: 1
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
