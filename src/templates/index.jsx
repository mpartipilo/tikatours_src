import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import format from "string-format"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import HomeGallery from "../components/home-gallery"
import HomeOverlay from "../components/home-overlay"
import MapCanvasView from "../components/map-canvas"
import ReasonsSlider from "../components/reasons"
import Slideshow from "../components/slideshow"
import SocialPanel from "../components/social-panel"
import TourList from "../components/tour-list"

import { getSlideshowData, contentData } from "../components/i18n-data"

class GeneralPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      overlayVisible: true
    }
  }

  render() {
    const {
      location,
      page,
      data,
      sitemetadata,
      languages,
      currentLanguage,
      slides,
      imagesSlides,
      homeOverlayData,
      countryHighlights,
      strings,
      tourCategoryData,
      tourList,
      tourListHeading,
      tourListTag
    } = this.props

    return (
      <>
        <div className="push" />
        <HomeOverlay
          {...homeOverlayData}
          onOverlayVisibleChanged={visible =>
            this.setState({ overlayVisible: visible })
          }
        />
        <Slideshow
          fixed={this.state.overlayVisible}
          slides={slides}
          currentLanguage={currentLanguage}
        >
          <div
            className="main"
            style={{ top: this.state.overlayVisible ? "100%" : "auto" }}
          >
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
            <TourList
              language={currentLanguage}
              heading={tourListHeading}
              list={tourList}
              tourCategoryData={tourCategoryData}
              tag={tourListTag}
            />
            <ReasonsSlider
              reasons={countryHighlights}
              title={format(
                strings["Reasons to Visit Georgia"],
                countryHighlights.length
              )}
              btnUrl={"/" + currentLanguage + "/georgia-tours"}
              btnText={strings["View Georgia Tours"]}
            />
            <MapCanvasView
              countryName="Georgia"
              currentLanguage={currentLanguage}
            />
            <SocialPanel currentLanguage={currentLanguage} />
            <HomeGallery
              imageSlides={imagesSlides}
              galleryId={data.imggrp_id_gallery}
            />
          </div>
        </Slideshow>
      </>
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
    countryHighlights,
    strings
  } = contentData[language]

  var tourData = data.tours.edges.map(t => t.node.frontmatter)
  var tourList = tourData
    .sort((a, b) => a.rank - b.rank)
    .map(t => ({ ...t, url: `/${language}/${t.url}` }))

  const slides = getSlideshowData(imagesSlides, imgGroup)

  return (
    <React.Fragment>
      <Helmet
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
      <Layout
        location={location.pathname}
        siteTitle={pathContext.title}
        languages={pathContext.languages}
        language={language}
        contact={sitemetadata.contact}
        data={data}
        sitemetadata={sitemetadata}
      >
        <GeneralPage
          location={location}
          page={data.markdownRemark}
          data={data.markdownRemark.frontmatter}
          sitemetadata={sitemetadata}
          languages={pathContext.languages}
          currentLanguage={language}
          tourListHeading={strings["feature_tour_list_heading"]}
          tourListTag={strings["featured_tour"]}
          {...{
            slides,
            homeOverlayData,
            imagesSlides,
            countryHighlights,
            tourList,
            strings
          }}
        />
      </Layout>
    </React.Fragment>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object,
  data: PropTypes.object
}

export default IndexPage

export const pageQuery = graphql`
  query HomePageById($id: String!, $language: String!) {
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

    tourMainCategories: allMarkdownRemarkTourcategory(
      filter: { frontmatter: { language: { eq: $language } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            language
            url
            template
            heading
            name
            label
            image_path
            imggrp_id
            main_category_id
            rank
          }
        }
      }
    }

    tourSubCategories: allMarkdownRemarkToursubcategory(
      filter: { frontmatter: { language: { eq: $language } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            language
            url
            template
            heading
            name
            label
            image_path
            imggrp_id
            main_category_id
            sub_category_id
            rank
          }
        }
      }
    }

    tours: allMarkdownRemark(
      filter: {
        frontmatter: {
          template: { eq: "tour" }
          language: { eq: $language }
          name: { ne: null }
          is_featured: { eq: true }
        }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            is_featured
            name
            tour_id
            language
            short_descr
            url
            rank
            duration
            price_from
            main_category_id
            sub_category_id
            image_path
          }
        }
      }
    }
  }
`
