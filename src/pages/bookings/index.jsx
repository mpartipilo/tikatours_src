import React from "react"
import PropTypes from "prop-types"
import { Router } from "@reach/router"
import { graphql } from "gatsby"

import { contentData } from "../../components/i18n-data"
import PageWrapper from "../../components/page-wrapper"
import ContactPageForm from "../../components/contact-page-form"

const ContactPageFormWrapper = ({ options, strings, tour_code }) => (
  <ContactPageForm tours={options} selectedTour={tour_code} strings={strings} />
)

class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    const { location, pathContext, data } = props
    const { strings } = contentData[pathContext.locale]
    const { edges } = data.allMarkdownRemark

    this.state = {
      location,
      pathContext,
      strings,
      options: edges
        .map(o => o.node.frontmatter)
        .filter(o => o.language == pathContext.locale)
    }
  }

  render() {
    return (
      <PageWrapper
        location={this.state.location}
        languages={this.state.pathContext.languages}
        locale={this.state.pathContext.locale}
        content={{
          page_id: 15,
          module_id: 1
        }}
      >
        <Router>
          <ContactPageFormWrapper
            path={`${location}/:language/:page/:tour_code?`}
            options={this.state.options}
            strings={this.state.strings}
          />
        </Router>
      </PageWrapper>
    )
  }
}

ContactPage.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default ContactPage

export const query = graphql`
  query BookingsQuery {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "tour" }, name: { ne: null } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            tour_id
            language
          }
        }
      }
    }
  }
`
