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
      siteTitle={data.site.siteMetadata.title}
      languages={data.site.siteMetadata.languages}
      contact={data.site.siteMetadata.contact}
      navigation={navigation}
    />
    <div className="push" />
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
