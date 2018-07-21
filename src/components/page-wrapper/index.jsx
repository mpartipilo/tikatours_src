/* global app */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Header from "../header"
import ReasonsSlider from "../reasons"
import { BreadcrumbsNavigation, BreadcrumbsTour } from "../breadcrumbs"
import Content from "../content"
import Footer from "../footer"
import HomeOverlay from "../home-overlay"
import TourList from "../tour-list"
import TourDetails from "../tour-details"
import MapCanvasView from "../map-canvas"
import SocialPanel from "../social-panel"
import Slideshow from "../slideshow"
import SubNav from "../sub-nav"
import CatList from "../cat-list"
import HomeGallery from "../home-gallery"
import GalleryIndex from "../gallery-index"
import Analytics from "../analytics"

import "../../../assets/sass/main.scss"

import sitemetadata from "../../../data/sitemetadata.json"

import general_pages_en from "../../../data/general_pages_en.json"
import general_pages_zh from "../../../data/general_pages_zh.json"

import tourData_en from "../../../data/tour_en.json"
import tourData_zh from "../../../data/tour_zh.json"

import tourCategoryData_en from "../../../data/tour_category_en.json"
import tourCategoryData_zh from "../../../data/tour_category_zh.json"

import homeOverlayData_en from "../../../data/home-overlay_en.json"
import homeOverlayData_zh from "../../../data/home-overlay_zh.json"

import imagesSlides_en from "../../../data/images_slides_en.json"
import imagesSlides_zh from "../../../data/images_slides_zh.json"

import countryHighlights_en from "../../../data/country_highlights_en.json"
import countryHighlights_zh from "../../../data/country_highlights_zh.json"

const featuredTags = {
  zh: "featured tour",
  en: "featured tour"
}

const featuredListHeading = {
  zh: "我们的特色旅游",
  en: "Our featured tours"
}

const textsIntl = {
  zh: {
    otherTours: "Other "
  },
  en: {
    otherTours: "Other "
  }
}

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

const fullUrl = (
  language,
  tourCategoryData,
  main_category_id,
  sub_category_id,
  url
) => {
  var main_category = tourCategoryData.find(c => c.id === main_category_id)
  var sub_category = tourCategoryData.find(c => c.id === sub_category_id)

  if (!main_category || !sub_category) return null

  return `/${language}/${main_category.url}/${sub_category.url}/${url}`
}

class PageWrapper extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    app.init()
  }

  render() {
    var {
      analytics,
      bodyTagClasses,
      children,
      content,
      galleryIndex,
      hasBreadcrumbs,
      heading,
      homeGallery,
      homeOverlay,
      isTourDetails,
      mapCanvasCountry,
      locale,
      location,
      socialPanel,
      subNav,
      tourListDetails
    } = this.props

    const defaultLanguage = "en"
    var currentLanguage = locale || defaultLanguage

    const general_pages =
      currentLanguage === "zh" ? general_pages_zh : general_pages_en

    const tourData = currentLanguage === "zh" ? tourData_zh : tourData_en

    const tourCategoryData =
      currentLanguage === "zh" ? tourCategoryData_zh : tourCategoryData_en

    const homeOverlayData =
      currentLanguage === "zh" ? homeOverlayData_zh : homeOverlayData_en

    const imagesSlides =
      currentLanguage === "zh" ? imagesSlides_zh : imagesSlides_en

    const countryHighlights =
      currentLanguage === "zh" ? countryHighlights_zh : countryHighlights_en

    var autoHeading = null
    var tourList = null
    var tourListHeading = null
    var catList = null
    var catListHeading = null
    var tour = null

    const isHome =
      content &&
      content.module_id &&
      content.module_id == 1 &&
      content.page_id == 1

    const slideshowFixed = isHome

    var imgGroup = null

    if (content) {
      if (content.module_id == 100 && !tourListDetails) {
        tourListDetails = { sub_category_id: content.page_id }
      }

      if (content.module_id == 1) {
        var page = general_pages.find(p => p.page_id == content.page_id)
        imgGroup = page.imggrp_id

        if (content.page_id && content.page_id == 1) {
          var highlights = true
        }

        autoHeading = page && page.page_heading
      }

      if (tourListDetails && isHome) {
        tourListHeading = featuredListHeading[currentLanguage]
        var tourListTag = featuredTags[currentLanguage]
        tourList = tourData
          .filter(t => t.is_featured === "1")
          .sort((a, b) => a.rank - b.rank)
      }

      if (tourListDetails && !isHome) {
        const subCategoryFound =
          tourListDetails.sub_category_id &&
          tourCategoryData.find(c => c.id === tourListDetails.sub_category_id)

        const mainCategoryFound =
          tourListDetails.main_category_id &&
          tourCategoryData.find(c => c.id === tourListDetails.main_category_id)

        if (mainCategoryFound) {
          catListHeading = mainCategoryFound.sub_heading
          catList = tourCategoryData
            .filter(
              t =>
                t.parent_id === tourListDetails.main_category_id &&
                t.status === "A" &&
                t.rank > 0
            )
            .sort((a, b) => a.rank - b.rank)

          tourListHeading = mainCategoryFound.name
          tourList = tourData
            .filter(
              t =>
                t.status === "A" &&
                t.main_category_id === tourListDetails.main_category_id
            )
            .sort((a, b) => a.rank - b.rank)
        }

        if (subCategoryFound) {
          imgGroup = subCategoryFound.slideshow_id
          tourListHeading = subCategoryFound.label
          tourList = tourData
            .filter(
              t =>
                t.status === "A" &&
                t.sub_category_id === tourListDetails.sub_category_id
            )
            .sort((a, b) => a.rank - b.rank)
        }

        autoHeading =
          autoHeading ||
          (subCategoryFound && subCategoryFound.heading) ||
          (mainCategoryFound && mainCategoryFound.heading)
      }
    }

    if (isTourDetails) {
      const data = tourData.find(t => {
        const tourUrl = fullUrl(
          currentLanguage,
          tourCategoryData,
          t.main_category_id,
          t.sub_category_id,
          t.url
        )
        return tourUrl === location.pathname.replace(/\/?$/i, "")
      })
      tour = data
      const subCategoryFound =
        data.sub_category_id &&
        tourCategoryData.find(c => c.id === data.sub_category_id)
      imgGroup = data && data.slideshow_id
      tourListHeading =
        textsIntl[currentLanguage].otherTours + subCategoryFound.label
      tourList = tourData
        .filter(
          t =>
            t.status === "A" &&
            t.sub_category_id === tour.sub_category_id &&
            t.id != data.id
        )
        .sort((a, b) => a.rank - b.rank)

      autoHeading = data && data.heading
    }

    if (imgGroup) {
      var { slides: slideshowData, videos_html } = getSlideshowData(
        imagesSlides,
        imgGroup
      )

      var slideshow = slideshowData && slideshowData.length > 0
    }

    return (
      <React.Fragment>
        <Helmet
          title={sitemetadata.title}
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
            class: (bodyTagClasses || "") + (slideshow ? "" : " no-ss")
          }}
        >
          /* -- ==ex_meta_taga== -- */
          <link rel="shortcut icon" href="/favicon.ico" />
        </Helmet>
        <Header
          location={location}
          siteTitle={sitemetadata.title}
          languages={sitemetadata.languages}
          currentLanguage={currentLanguage}
          defaultLanguage={defaultLanguage}
          contact={sitemetadata.contact}
        />
        <div className="push" />
        {homeOverlay && <HomeOverlay {...homeOverlayData} />}
        {slideshow &&
          slideshowData &&
          slideshowData.length > 0 && (
            <Slideshow fixed={slideshowFixed} slides={slideshowData} />
          )}
        <div className="main">
          <div className="container">
            {hasBreadcrumbs &&
              !isTourDetails && (
                <BreadcrumbsNavigation
                  language={currentLanguage}
                  page={location.pathname}
                />
              )}
            {hasBreadcrumbs &&
              isTourDetails && (
                <BreadcrumbsTour
                  language={currentLanguage}
                  page={location.pathname}
                />
              )}
            <div className="row">
              <div
                className={
                  "col-xs-12 text-center" + (hasBreadcrumbs ? " has-bc" : "")
                }
              >
                {heading && <h1>{heading}</h1>}
                {!heading && autoHeading && <h1>{autoHeading}</h1>}
              </div>
            </div>
            {subNav && <SubNav {...subNav} />}
            <div className="content">
              {!content && children}
              {!content &&
                isTourDetails && (
                  <TourDetails
                    language={currentLanguage}
                    url={location.pathname}
                    imagesSlidesData={imagesSlides}
                    tourCategoryData={tourCategoryData}
                    tourData={tourData}
                    tour={tour}
                  />
                )}
              {content && <Content language={currentLanguage} {...content} />}
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="divider" />
              </div>
            </div>
            {catList && (
              <CatList
                location={location}
                language={currentLanguage}
                list={catList}
                heading={catListHeading}
              />
            )}
          </div>
          {galleryIndex && <GalleryIndex {...galleryIndex} />}
          {tourList && (
            <TourList
              language={currentLanguage}
              list={tourList}
              heading={tourListHeading}
              tag={tourListTag}
              tourCategoryData={tourCategoryData}
            />
          )}
          {highlights && (
            <ReasonsSlider
              reasons={countryHighlights}
              btnUrl={"/" + currentLanguage + "/georgia-tours"}
              btnText="View Georgia Tours"
            />
          )}
          {mapCanvasCountry && <MapCanvasView countryName={mapCanvasCountry} />}
          {socialPanel && <SocialPanel />}
          {homeGallery && (
            <HomeGallery imageSlides={imagesSlides} galleryId={5} />
          )}
          <Footer currentLanguage={currentLanguage} />
        </div>
        {videos_html && (
          <span dangerouslySetInnerHTML={{ __html: videos_html }} />
        )}
        ==scripts-load-top==
        {analytics && <Analytics {...analytics} />}
      </React.Fragment>
    )
  }
}

PageWrapper.propTypes = {
  analytics: PropTypes.any,
  bodyTagClasses: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.object,
  galleryIndex: PropTypes.any,
  hasBreadcrumbs: PropTypes.bool,
  heading: PropTypes.node,
  homeGallery: PropTypes.bool,
  homeOverlay: PropTypes.bool,
  isTourDetails: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  mapCanvasCountry: PropTypes.string,
  socialPanel: PropTypes.bool,
  subNav: PropTypes.node,
  tourListDetails: PropTypes.object
}

export default PageWrapper
