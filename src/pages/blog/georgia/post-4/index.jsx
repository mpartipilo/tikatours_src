import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../components/page-wrapper"

const Page = ({ location, pathContext }) => (
  <PageWrapper
    location={location}
    locale={pathContext.locale}
    content={{
      page_id: 16,
      module_id: 23
    }}
    blog={{
      category_id: 1,
      post_id: 4
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired
}

export default Page
