import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Theatre"
    content={{
      page_id: 25,
      module_id: 1
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
