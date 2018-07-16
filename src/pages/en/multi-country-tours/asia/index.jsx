import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper
    hasBreadcrumbs
    location={location}
    heading="Asia"
    tourList={{
      subCategory: true,
      heading: "Asia",
      toursFilter: data =>
        data
          .filter(t => t.status === "A" && t.sub_category_id === 20)
          .sort((a, b) => a.rank - b.rank)
    }}
    content={{
      page_id: 20,
      module_id: 100
    }}
  />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page
