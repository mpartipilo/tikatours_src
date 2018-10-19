import React from "react"
import PropTypes from "prop-types"

import { contentData } from "../../components/i18n-data"
import PageWrapper from "../../components/page-wrapper"
import ContactPageForm from "../../components/contact-page-form"

class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    const { location, pathContext } = props
    const { strings } = contentData[pathContext.locale]

    this.state = {
      location,
      pathContext,
      strings
    }
  }

  render() {
    return (
      <PageWrapper
        location={this.state.location}
        languages={this.state.pathContext.languages}
        locale={this.state.pathContext.locale}
        content={{
          page_id: 8,
          module_id: 3
        }}
      >
        <ContactPageForm strings={this.state.strings} />
      </PageWrapper>
    )
  }
}

ContactPage.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired
}

export default ContactPage
