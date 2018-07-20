import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../components/page-wrapper"

const Page = ({ location, pathContext }) => (
  <PageWrapper
    hasBreadcrumbs
    location={location}
    locale={pathContext.locale}
    tourListDetails={{
      main_category_id: 1
    }}
    mapCanvasCountry="Georgia"
    content={{
      page_id: 3,
      module_id: 1
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired
}

export default Page
