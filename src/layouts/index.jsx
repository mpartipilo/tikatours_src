/* global graphql */

import React from "react"
import Helmet from "react-helmet"

import Header from "../components/header"
import HomeOverlay from "../components/home-overlay"

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
        class: "home"
      }}
    />
    <Header
      siteTitle={data.site.siteMetadata.title}
      languages={data.site.siteMetadata.languages}
      contact={data.site.siteMetadata.contact}
      navigation={navigation}
    />
    <div className="push" />
    <HomeOverlay
      heading="test"
      subheading="test"
      intro="test"
      btn_text="test"
      btn_url="http://google.com/"
    />
    {children()}
    <div className="main">
      <div className="container">
        ==breadcrumbs==
        <div className="row">
          <div className="col-xs-12 text-center ==has-bc==">
            <h1>==heading==</h1>
          </div>
        </div>
        ==sub-nav==
        <div className="content">==content==</div>
        <div className="row">
          <div className="col-xs-12">
            <div className="divider" />
          </div>
        </div>
        ==cat-list==
      </div>
      ==gallery-index== ==tour-list== ==reasons== ==map_canvas_view==
      ==social-panel== ==home-gallery==
      <footer>
        <div className="container-fluid">
          ==footer-nav==
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="contact">
                <div className="row">
                  <div className="col-xs-4">phone:</div>
                  <div className="col-xs-8">==phone==</div>
                </div>
                <div className="row">
                  <div className="col-xs-4">email:</div>
                  <div className="col-xs-8">==email==</div>
                </div>
                <div className="row">
                  <div className="col-xs-4">address:</div>
                  <div className="col-xs-8">==address==</div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-6 credits text-center">
              <img
                src="/img/logos/beyond-logo.png"
                alt="Beyond Limits logo"
                style={{
                  maxHeight: 100,
                  paddingTop: 14,
                  paddingBottom: 14,
                  paddingLeft: 4,
                  paddingRight: 4
                }}
              />
              <a href="/" className="hidden-xs hidden-sm">
                <img
                  src="/img/logos/motif-sml.png"
                  alt="Tika Tours logo"
                  style={{ paddingLeft: 30 }}
                />
              </a>
              <div>
                <small>==copyright== ==credits==</small>
              </div>
            </div>
          </div>
          <div className="row hidden-md hidden-lg">
            <div className="col-xs-12">
              <div className="divider" />
            </div>
          </div>
        </div>
      </footer>
    </div>
    ==video== ==jsVars== ==scripts-load-top==
    <script src="/assets/js/libs/vendor.js" />
    <script async src="/assets/js/main.js" onLoad="app.init()" />
    ==slideshow-script== ==analytics==
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
