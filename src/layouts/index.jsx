/* global graphql */

import React from "react"
import Helmet from "react-helmet"

import Header from "../components/header"

import "../../assets/sass/main.scss"

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" }
      ]}
    />
    <Header
      siteTitle={data.site.siteMetadata.title}
      languages={data.site.siteMetadata.languages}
      contact={data.site.siteMetadata.contact}
    />
    {children()}
  </div>
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
