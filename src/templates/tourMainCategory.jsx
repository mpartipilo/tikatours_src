import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../components/page-wrapper"

const TourMainCategoryTemplate = ({
  path,
  page_id,
  module_id,
  main_category_id
}) => (
  <PageWrapper
    hasBreadcrumbs
    location={path}
    tourListDetails={{
      main_category_id
    }}
    mapCanvasCountry="Georgia"
    content={{
      page_id,
      module_id
    }}
  />
)

TourMainCategoryTemplate.propTypes = {
  path: PropTypes.string,
  page_id: PropTypes.number,
  module_id: PropTypes.number,
  main_category_id: PropTypes.number
}

export default TourMainCategoryTemplate
