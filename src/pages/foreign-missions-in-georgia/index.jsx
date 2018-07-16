import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Foreign Missions in Georgia"
    content={{
      page_id: 32,
      module_id: 1
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
