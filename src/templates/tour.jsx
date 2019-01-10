/* global app, window, $ */
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"

import Header from "../components/header"
import Footer from "../components/footer"
import Slideshow from "../components/slideshow"
import TourDetails from "../components/tour-details"

import { contentData, getSlideshowData } from "../components/i18n-data"

const GeneralPage = ({
  location,
  page,
  data,
  sitemetadata,
  languages,
  currentLanguage,
  slideshowData,
  imagesSlides,
  tourCategoryData,
  tourData,
  tour
}) => (
  <React.Fragment>
    <Header
      location={location.pathname}
      siteTitle={sitemetadata.title}
      languages={languages}
      currentLanguage={currentLanguage}
      contact={sitemetadata.contact}
    />
    <div className="push" />
    {slideshowData &&
      slideshowData.length > 0 && (
        <Slideshow fixed={false} slides={slideshowData} />
      )}
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>{data.heading}</h1>
          </div>
        </div>
        <div className="content">
          <TourDetails
            language={currentLanguage}
            url={location.pathname}
            imagesSlidesData={imagesSlides}
            tourCategoryData={tourCategoryData}
            tourData={tourData}
            tour={tour}
          />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="divider" />
          </div>
        </div>
      </div>
      <Footer language={currentLanguage} />
    </div>
  </React.Fragment>
)

class TourDetailPageTemplate extends React.Component {
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
    const { location, data, pathContext } = this.props
    const currentLanguage = pathContext.language
    const { imagesSlides, sitemetadata } = contentData[currentLanguage]

    const imgGroup = data.tour.frontmatter.imggrp_id

    const { slides, videos_html } = getSlideshowData(imagesSlides, imgGroup)

    const tourCategoryData = data.tourSubCategories.edges.map(
      e => e.node.frontmatter
    )

    var tourData = data.tours.edges.map(t => t.node.frontmatter)

    const props = {
      sitemetadata,
      languages: pathContext.languages,
      currentLanguage,
      imagesSlides,
      tourCategoryData,
      tourData,
      slideshowData: slides
    }

    const { frontmatter } = data.tour

    const tour = {
      id: frontmatter.tour_id,
      long_descr: data.tour.html,
      sub_category_id: frontmatter.sub_category_id,
      main_category_id: frontmatter.main_category_id,
      is_featured: frontmatter.is_featured || false,
      slideshow_id: frontmatter.imggrp_id,
      gallery_id: frontmatter.gallery_id,
      duration: frontmatter.duration,
      inclusions:
        (frontmatter.inclusions &&
          frontmatter.inclusions.childMarkdownRemark.html) ||
        "",
      itinerary:
        (frontmatter.itinerary &&
          frontmatter.itinerary.childMarkdownRemark.html) ||
        "",
      price_from: frontmatter.price_from
    }

    return (
      <React.Fragment>
        <Helmet title={pathContext.title || sitemetadata.title} />
        <GeneralPage
          location={location}
          page={data.tour}
          data={data.tour.frontmatter}
          {...props}
          tour={tour}
        />
      </React.Fragment>
    )
  }
}

TourDetailPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default TourDetailPageTemplate

export const pageQuery = graphql`
  query TourDetailById($id: String!, $language: String!) {
    tour: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        tour_id
        heading
        language
        url
        imggrp_id
        gallery_id
        duration
        price_from
        main_category_id
        sub_category_id
        itinerary {
          childMarkdownRemark {
            html
          }
        }
        inclusions {
          childMarkdownRemark {
            html
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
        }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
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
  }
`
