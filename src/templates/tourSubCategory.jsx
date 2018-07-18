import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../components/page-wrapper"

const TourSubCategoryTemplate = ({ path, page_id }) => (
  <PageWrapper
    hasBreadcrumbs
    location={path}
    mapCanvasCountry="Georgia"
    content={{
      page_id,
      module_id: 100
    }}
  />
)

TourSubCategoryTemplate.propTypes = {
  path: PropTypes.string,
  page_id: PropTypes.number
}

export default TourSubCategoryTemplate
