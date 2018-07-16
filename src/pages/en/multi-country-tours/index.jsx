import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    hasBreadcrumbs
    location={location}
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

Page.propTypes = {
  location: PropTypes.object
}

export default Page
