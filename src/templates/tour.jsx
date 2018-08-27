/* global graphql */
/* global app, window, $ */
import React from "react"
import PropTypes from "prop-types"

import Header from "../components/header"
import Footer from "../components/footer"
import Slideshow from "../components/slideshow"
import TourDetails from "../components/tour-details"

import contentData from "../components/i18n-data"

const GeneralPage = ({
  location,
  page,
  data,
  sitemetadata,
  currentLanguage,
  defaultLanguage,
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
      languages={sitemetadata.languages}
      currentLanguage={currentLanguage}
      defaultLanguage={defaultLanguage}
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

function createSlide(m) {
  var src = m.imgslide_path
  var cap = m.imgslide_caption
  var cap_heading = m.caption_heading
  //var alt = m.imgslide_alt
  var button = m.button_label
  var button_url = m.button_url
  var youtube_id = m.youtube_id
  var id = m.imgslide_id

  var button_view = ""

  if (button && button_url) {
    button_view = `<div><a class="btn" href="${button_url}">${button}</a></div>`
  }

  var video_button = ""
  var video_html = ""
  if (youtube_id) {
    video_button = `<div><a href="#" data-href="#slide-${id}" class="btn video-link"><i class="fa fa-youtube-play"></i>watch video</a></div>`
    video_html = `<div class="video-wrap" id="slide-${id}"><span>loading video...</span><div class="text-right"><i class="fa fa-times"></i></div><iframe width="100%" height="95%" data-src="https://www.youtube.com/embed/${youtube_id}?rel=0&autoplay=1&showinfo=1" frameborder="0" allowfullscreen></iframe></div>`
  }

  var capHTML = ""
  if (cap_heading) {
    if (youtube_id) {
      capHTML = `<span>${cap_heading}</span><span class="caption">${cap}</span>${video_button}`
    } else {
      capHTML = `<span>${cap_heading}</span><span class="caption">${cap}</span>${button_view}`
    }
  }

  return {
    slide: { image: src, title: capHTML },
    video_html
  }
}

function getSlideshowData(imagesSlides, groupId) {
  var slides = imagesSlides
    .filter(f => f.imggrp_id == groupId)
    .sort((a, b) => a.rank - b.rank)

  var slideData = slides.map(createSlide)

  return {
    slides: slideData.map(s => s.slide),
    videos_html: slideData.map(s => s.video_html).join("\r\n")
  }
}

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
    const { location, data } = this.props
    const {
      sitemetadata,
      imagesSlides,
      tourCategoryData,
      tourData
    } = contentData[data.markdownRemark.frontmatter.language]
    const defaultLanguage = "en"
    const currentLanguage =
      data.markdownRemark.frontmatter.language || defaultLanguage

    const imgGroup = data.markdownRemark.frontmatter.imggrp_id

    const { slides, videos_html } = getSlideshowData(imagesSlides, imgGroup)

    const props = {
      sitemetadata,
      currentLanguage,
      defaultLanguage,
      imagesSlides,
      tourCategoryData,
      tourData,
      slideshowData: slides
    }

    const { frontmatter } = data.markdownRemark

    const tour = {
      id: frontmatter.tour_id,
      long_descr: data.markdownRemark.html,
      sub_category_id: frontmatter.sub_category_id,
      main_category_id: frontmatter.main_category_id,
      is_featured: frontmatter.is_featured || false,
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
      <GeneralPage
        location={location}
        page={data.markdownRemark}
        data={data.markdownRemark.frontmatter}
        {...props}
        tour={tour}
      />
    )
  }
}

TourDetailPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object
}

export default TourDetailPageTemplate

export const pageQuery = graphql`
  query TourDetailById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        tour_id
        heading
        language
        url
        imggrp_id
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
  }
`
