/* global app, window, $ */

import path from "path"
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import { BreadcrumbsNavigation, BreadcrumbsTour } from "../breadcrumbs"
import Blog from "../blog"
import CatList from "../cat-list"
import Content from "../content"
import Footer from "../footer"
import Gallery from "../gallery"
import Header from "../header"
import HomeGallery from "../home-gallery"
import HomeOverlay from "../home-overlay"
import MapCanvasView from "../map-canvas"
import ReasonsSlider from "../reasons"
import Slideshow from "../slideshow"
import SocialPanel from "../social-panel"
import SubNav from "../sub-nav"
import TourList from "../tour-list"

import { getSlideshowData, contentData } from "../i18n-data"

class PageWrapper extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    app.init()
  }

  render() {
    var {
      blog,
      bodyTagClasses,
      children,
      content,
      hasBreadcrumbs,
      heading,
      homeGallery,
      homeOverlay,
      isTourDetails,
      isRegion,
      mapCanvasCountry,
      locale,
      languages,
      location,
      socialPanel,
      tourListDetails,
      tourList,
      tourListHeading,
      tourListTag,
      tourCategoryData
    } = this.props

    var currentLanguage = locale

    const {
      general_pages,
      blog_category,
      blog_post,
      homeOverlayData,
      imagesSlides,
      countryHighlights,
      regionData,
      strings,
      sitemetadata
    } = contentData[currentLanguage]

    var autoHeading = null
    var tourList = null
    var tourListHeading = null
    var catList = null
    var catListHeading = null

    if (content) {
      var page = general_pages.find(p => p.page_id == content.page_id)
    }

    const isHome =
      content &&
      content.module_id &&
      content.module_id == 1 &&
      content.page_id == 1

    const isBlog = content && content.module_id && content.module_id == 23

    const slideshowFixed = isHome

    var imgGroup = null

    if (content) {
      if (content.module_id == 100 && !tourListDetails) {
        tourListDetails = { sub_category_id: content.page_id }
      }

      if (content.module_id == 1) {
        imgGroup = page.imggrp_id

        if (content.page_id && content.page_id == 1) {
          var highlights = true
        }

        autoHeading = page && page.page_heading
      }

      if (content.module_id == 3 || content.module_id == 23) {
        autoHeading = page && page.page_heading
        if (content.module_id == 23 && blog && blog.category_id) {
          var current_blog_category = blog_category.find(
            b => b.id == blog.category_id
          )
          autoHeading = `${strings.category_archives}: ${
            current_blog_category.label
          }`
          if (blog.post_id) {
            var current_blog_post = blog_post.find(p => p.id == blog.post_id)
            autoHeading = current_blog_post.name
          }
        }
      }
    }

    if (isRegion) {
      var subNav = {
        list: regionData
          .filter(t => t.status === "A" && t.country_id == 1)
          .sort((a, b) => a.rank - b.rank)
          .map(r => {
            const full_url = `/${currentLanguage}/regions/${r.url}`
            return {
              active: location.pathname.replace(/\/?$/i, "") === full_url,
              full_url,
              ...r
            }
          })
      }

      const data = subNav.list.find(l => l.active)

      if (data) {
        autoHeading = data.title
        imgGroup = data.slideshow_id
        var regionGallery = data.gallery_id
        const thumbPath = `/thumbs/galleries/g${regionGallery}/`
        var regionGalleryHeading = data.name + " Gallery"
        var regionGalleryPhotos = imagesSlides
          .filter(i => i.imggrp_id == regionGallery)
          .map(i => ({
            ...i,
            srcThumb: thumbPath + path.basename(i.imgslide_path)
          }))
          .sort((l, r) => {
            return l.imgslide_rank - r.imgslide_rank
          })
      }
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
          {/* -- ==ex_meta_taga== -- */}
          <link rel="shortcut icon" href="/favicon.ico" />
        </Helmet>
        <Header
          location={location.pathname}
          siteTitle={sitemetadata.title}
          languages={languages}
          currentLanguage={currentLanguage}
          contact={sitemetadata.contact}
        />
        <div />
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
              {children}
              {!children &&
                content && <Content language={currentLanguage} {...content} />}
              {isBlog && <Blog language={currentLanguage} {...blog} />}
              {regionGallery && (
                <Gallery
                  heading={regionGalleryHeading}
                  photos={regionGalleryPhotos}
                />
              )}
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
          <Footer language={currentLanguage} />
        </div>
        {videos_html && (
          <span dangerouslySetInnerHTML={{ __html: videos_html }} />
        )}
        {/* ==scripts-load-top== */}
      </React.Fragment>
    )
  }
}

PageWrapper.propTypes = {
  analytics: PropTypes.any,
  bodyTagClasses: PropTypes.string,
  children: PropTypes.node,
  blog: PropTypes.object,
  content: PropTypes.object,
  hasBreadcrumbs: PropTypes.bool,
  heading: PropTypes.node,
  homeGallery: PropTypes.bool,
  homeOverlay: PropTypes.bool,
  isGalleryIndex: PropTypes.bool,
  isTourDetails: PropTypes.bool,
  isRegion: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  mapCanvasCountry: PropTypes.string,
  socialPanel: PropTypes.bool,
  tourListDetails: PropTypes.object,
  tourList: PropTypes.array,
  tourListHeading: PropTypes.string,
  tourListTag: PropTypes.string,
  tourCategoryData: PropTypes.array
}

export default PageWrapper
