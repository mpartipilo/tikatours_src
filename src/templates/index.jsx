/* global graphql */
/* global app, window, $ */
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Header from "../components/header"
import Footer from "../components/footer"
import HomeGallery from "../components/home-gallery"
import HomeOverlay from "../components/home-overlay"
import MapCanvasView from "../components/map-canvas"
import ReasonsSlider from "../components/reasons"
import Slideshow from "../components/slideshow"
import SocialPanel from "../components/social-panel"

import { getSlideshowData, contentData } from "../components/i18n-data"

class GeneralPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    app.init()

    $(function() {
      $(window).on("scroll", function() {
        app.modifyHeader()
        app.fadeOverlay()
      })

      $(window).on("resize", function() {
        app.matchHeights($(".t-info"))
      })

      app.initGalleryShuffle("#gallery-shuffle")
    })
  }

  render() {
    const {
      location,
      page,
      data,
      sitemetadata,
      languages,
      currentLanguage,
      slideshowData,
      imagesSlides,
      homeOverlayData,
      countryHighlights
    } = this.props
    return (
      <React.Fragment>
        <Header
          location={location.pathname}
          siteTitle={data.title}
          languages={languages}
          currentLanguage={currentLanguage}
          contact={sitemetadata.contact}
        />
        <div className="push" />
        <HomeOverlay {...homeOverlayData} />
        {slideshowData &&
          slideshowData.length > 0 && (
            <Slideshow fixed={true} slides={slideshowData} />
          )}
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 text-center">
                <h1>{data.heading}</h1>
              </div>
            </div>
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: page.html }} />
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="divider" />
              </div>
            </div>
          </div>
          <ReasonsSlider
            reasons={countryHighlights}
            btnUrl={"/" + currentLanguage + "/georgia-tours"}
            btnText="View Georgia Tours"
          />
          <MapCanvasView countryName="Georgia" />
          <SocialPanel />
          <HomeGallery
            imageSlides={imagesSlides}
            galleryId={data.imggrp_id_gallery}
          />
          <Footer language={currentLanguage} />
        </div>
      </React.Fragment>
    )
  }
}

const IndexPage = ({ location, data, pathContext }) => {
  const { language, imggrp_id: imgGroup } = data.markdownRemark.frontmatter

  if (!data.markdownRemark.frontmatter.language) {
    console.log(`language not set on ${location.pathname}`)
  }

  const {
    sitemetadata,
    imagesSlides,
    homeOverlayData,
    countryHighlights
  } = contentData[language]

  const { slides, videos_html } = getSlideshowData(imagesSlides, imgGroup)

  return (
    <React.Fragment>
      <Helmet
        title={pathContext.title}
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
          class: "home" + (slides ? "" : " no-ss")
        }}
      >
        {/* -- ==ex_meta_taga== -- */}
        <link rel="shortcut icon" href="/favicon.ico" />
      </Helmet>
      <GeneralPage
        location={location}
        page={data.markdownRemark}
        data={data.markdownRemark.frontmatter}
        sitemetadata={sitemetadata}
        languages={pathContext.languages}
        currentLanguage={language}
        slideshowData={slides}
        {...{ homeOverlayData, imagesSlides, countryHighlights }}
      />
    </React.Fragment>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object,
  pathContxt: PropTypes.object,
  data: PropTypes.object
}

export default IndexPage

export const pageQuery = graphql`
  query HomePageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        language
        url
        imggrp_id
        imggrp_id_gallery
      }
    }
  }
`
