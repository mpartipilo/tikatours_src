import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    content={{
      page_id: 6,
      module_id: 1
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
