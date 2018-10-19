/* global graphql */
import React from "react"
import PropTypes from "prop-types"
import { Route } from "react-router-dom"

import { contentData } from "../../components/i18n-data"
import PageWrapper from "../../components/page-wrapper"
import ContactPageForm from "../../components/contact-page-form"

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
        <Route
          render={({ location }) => (
            <Route
              location={location}
              key={location.key}
              path="/:language/:page/:tour_code?"
              render={({
                match: {
                  params: { tour_code }
                }
              }) => (
                <ContactPageForm
                  tours={this.state.options}
                  selectedTour={tour_code}
                  strings={this.state.strings}
                />
              )}
            />
          )}
        />
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
