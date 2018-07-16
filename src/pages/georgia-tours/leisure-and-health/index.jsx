import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    hasBreadcrumbs
    location={location}
    heading="Leisure and Health"
    tourList={{
      subCategory: true,
      heading: "Leisure and Health",
      toursFilter: data =>
        data
          .filter(t => t.status === "A" && t.sub_category_id === 11)
          .sort((a, b) => a.rank - b.rank)
    }}
    mapCanvasCountry="Georgia"
    content={{
      page_id: 11,
      module_id: 100
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page