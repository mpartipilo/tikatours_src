import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    hasBreadcrumbs
    location={location}
    tourListDetails={{
      main_category_id: 2,
      sub_category_id: 16
    }}
    content={{
      page_id: 16,
      module_id: 100
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
