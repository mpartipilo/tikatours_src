/* global graphql */

import React from "react"
import Helmet from "react-helmet"

import Header from "../components/header"
import Footer from "../components/footer"
import HomeOverlay from "../components/home-overlay"

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
      bodyAttributes={{
        class: "home"
      }}
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
    <HomeOverlay
      heading="Life changing travel experiences"
      subheading="Luxury Journeys to Georgia, Armenia and Azerbaijan"
      intro={`TikaTours warmly welcomes you to places of extraordinary culture and history, geographical diversity and startling beauty. 

      We are your specialists in luxury journeys to less-travelled destinations, offering trips to the Caucasus region of Georgia, Armenia, and Azerbaijan.`}
      btn_text="About us"
      btn_url="/about"
    />
    <div className="main">
      {children()}
      <Footer />
    </div>
    ==video== ==scripts-load-top== ==slideshow-script== ==analytics==
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
