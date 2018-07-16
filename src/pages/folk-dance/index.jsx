import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Folk Dance"
    content={{
      page_id: 26,
      module_id: 1
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page