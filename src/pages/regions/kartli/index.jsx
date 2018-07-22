import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../components/page-wrapper"

const Page = ({ location, pathContext }) => (
  <PageWrapper
    location={location}
    locale={pathContext.locale}
    mapCanvasCountry="Georgia"
    content={{
      page_id: 6,
      module_id: 36
    }}
    isRegion
  />
)

Page.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired
}

export default Page
