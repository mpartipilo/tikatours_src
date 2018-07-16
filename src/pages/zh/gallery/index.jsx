import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../../components/page-wrapper"

const Page = ({ location }) => (
  <PageWrapper location={location} heading="Gallery" />
)

Page.propTypes = {
  location: PropTypes.object
}

export default Page