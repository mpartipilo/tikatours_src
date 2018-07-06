/* global graphql */

import React from "react"
import Helmet from "react-helmet"

import Header from "../components/header"

import "../../assets/sass/main.scss"
import navigation from "../../data/navigation.json"

const Layout = ({ children, data }) => (
  <React.Fragment>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" }
      ]}
      bodyAttributes={{
          class: 'home'
      }}
    />
    <Header
      siteTitle={data.site.siteMetadata.title}
      languages={data.site.siteMetadata.languages}
      contact={data.site.siteMetadata.contact}
      navigation={navigation}
    />
    <div class="push"></div>
    {children()}
  </React.Fragment>
)

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        languages {
          countryCode
          languageCode
          languageName
        }
        contact {
          email
          telephone
        }
      }
    }
  }
`
