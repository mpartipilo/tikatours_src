/* global graphql */

import React from "react"
import Helmet from "react-helmet"

import Header from "../components/header"

import "../../assets/sass/main.scss"

const Layout = ({ children, data, location }) => {
  const defaultLanguage = "en"
  var langRegex = /^\/(en|zh)\/?/i
  var currentLanguage = location.pathname.match(langRegex)[1] || defaultLanguage

  return (
    <React.Fragment>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          {
            name: "description",
            content: "==mdescr=="
          },
          { name: "keywords", content: "==mkeyw==" },
          { name: "http-equiv", content: "" },
          { name: "author", content: "==mauthor==" },
          { name: "HandheldFriendly", content: "True" },
          { name: "MobileOptimized", content: "320" },
          {
            name: "viewport",
            content:
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
          },
          { "http-equiv": "cleartype", content: "on" }
        ]}
      >
        /* -- ==ex_meta_taga== -- */
        <link rel="shortcut icon" href="/favicon.ico" />
      </Helmet>
      <Header
        location={location}
        siteTitle={data.site.siteMetadata.title}
        languages={data.site.siteMetadata.languages}
        currentLanguage={currentLanguage}
        defaultLanguage={defaultLanguage}
        contact={data.site.siteMetadata.contact}
      />
      <div className="push" />
      {children()}
    </React.Fragment>
  )
}
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
