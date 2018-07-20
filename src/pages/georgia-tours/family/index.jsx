import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../components/page-wrapper"

const Page = ({ location, pathContext }) => (
  <PageWrapper
    hasBreadcrumbs
    location={location}
    locale={pathContext.locale}
    mapCanvasCountry="Georgia"
    content={{
      page_id: 13,
      module_id: 100
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired
}

export default Page
