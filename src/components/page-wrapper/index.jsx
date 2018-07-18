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
import Video from "../video"
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

import reasonsData from "../../../data/reasons.json"

const featuredTags = {
  zh: "我们的特色旅游",
  en: "Our featured tours"
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

const PageWrapper = ({
  analytics,
  children,
  heading,
  subNav,
  galleryIndex,
  homeOverlay,
  tourListDetails,
  reasons,
  mapCanvasCountry,
  socialPanel,
  homeGallery,
  slideshow,
  video,
  bodyTagClasses,
  location,
  hasBreadcrumbs,
  content,
  isTourDetails
}) => {
  const defaultLanguage = "en"
  const langRegex = /^\/(en|zh)\/?/i

  var match = location.pathname.match(langRegex)
  var currentLanguage = (match && match[1]) || defaultLanguage

  const general_pages =
    currentLanguage === "zh" ? general_pages_zh : general_pages_en

  const tourData = currentLanguage === "zh" ? tourData_zh : tourData_en

  const tourCategoryData =
    currentLanguage === "zh" ? tourCategoryData_zh : tourCategoryData_en

  const homeOverlayData =
    currentLanguage === "zh" ? homeOverlayData_zh : homeOverlayData_en

  var autoHeading = null
  var tourList = null
  var tourListHeading = null
  var catList = null
  var catListHeading = null

  if (content) {
    if (content.module_id == 100 && !tourListDetails) {
      tourListDetails = { sub_category_id: content.page_id }
    }

    if (content.module_id == 1) {
      var page = general_pages.find(p => p.page_id == content.page_id)
      autoHeading = page && page.page_heading
    }

    if (tourListDetails && tourListDetails.featured) {
      tourListHeading = featuredTags[currentLanguage]
      tourList = tourData
        .filter(t => t.is_featured === "1")
        .sort((a, b) => a.rank - b.rank)
    }

    if (tourListDetails && !tourListDetails.featured) {
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
    var data = tourData.find(t => {
      const tourUrl = fullUrl(
        currentLanguage,
        tourCategoryData,
        t.main_category_id,
        t.sub_category_id,
        t.url
      )
      return tourUrl === location.pathname.replace(/\/?$/i, "")
    })

    autoHeading = data && data.heading
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
      {slideshow && <Slideshow {...slideshow} />}
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
                  subCategory
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
          />
        )}
        {reasons && (
          <ReasonsSlider
            reasons={reasonsData}
            btnUrl={"/" + currentLanguage + "/georgia-tours"}
            btnText="View Georgia Tours"
          />
        )}
        {mapCanvasCountry && <MapCanvasView countryName={mapCanvasCountry} />}
        {socialPanel && <SocialPanel />}
        {homeGallery && <HomeGallery galleryId={5} />}
        <Footer currentLanguage={currentLanguage} />
      </div>
      {video && <Video {...video} />}
      ==scripts-load-top==
      {slideshow && (
        <script>
          {`
    $(function($){
        $.supersized({
            slide_interval: 5000,
            transition_speed:800,
            performance:0,
            slide_links:'blank',
            slides:[        
            ]
        });
        $('.prev').click(function(){api.prevSlide();});
        $('.next').click(function(){api.nextSlide();});
        var hammertime = new Hammer($('.ss-wrap')[0]);
        hammertime.on('swipeleft', function(ev) {
            api.prevSlide();
        });
        hammertime.on('swiperight', function(ev) {
            api.nextSlide();
        });
      });`}
        </script>
      )}
      {analytics && <Analytics {...analytics} />}
    </React.Fragment>
  )
}

PageWrapper.propTypes = {
  analytics: PropTypes.any,
  children: PropTypes.node,
  heading: PropTypes.node,
  subNav: PropTypes.node,
  galleryIndex: PropTypes.any,
  homeOverlay: PropTypes.bool,
  tourListDetails: PropTypes.object,
  reasons: PropTypes.bool,
  mapCanvasCountry: PropTypes.string,
  socialPanel: PropTypes.bool,
  homeGallery: PropTypes.bool,
  slideshow: PropTypes.any,
  video: PropTypes.any,
  bodyTagClasses: PropTypes.string,
  location: PropTypes.object.isRequired,
  hasBreadcrumbs: PropTypes.bool,
  content: PropTypes.object,
  isTourDetails: PropTypes.bool
}

export default PageWrapper
