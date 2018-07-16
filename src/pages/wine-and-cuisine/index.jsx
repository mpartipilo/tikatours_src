import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    location={location}
    heading="Wine & Cuisine"
    content={{
      page_id: 23,
      module_id: 1
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
