/* global app, window, $ */

import path from "path"
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import md5 from "md5"

import { BreadcrumbsNavigation, BreadcrumbsTour } from "../breadcrumbs"
import Blog from "../blog"
import CatList from "../cat-list"
import Content from "../content"
import Footer from "../footer"
import Gallery from "../gallery"
import GalleryIndex from "../gallery-index"
import Header from "../header"
import HomeGallery from "../home-gallery"
import HomeOverlay from "../home-overlay"
import MapCanvasView from "../map-canvas"
import ReasonsSlider from "../reasons"
import Slideshow from "../slideshow"
import SocialPanel from "../social-panel"
import SubNav from "../sub-nav"
import TourDetails from "../tour-details"
import TourList from "../tour-list"

import contentData from "../i18n-data"

import "../../../assets/sass/main.scss"

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
  var main_category = tourCategoryData.find(c => c.id == main_category_id)
  var sub_category = tourCategoryData.find(c => c.id == sub_category_id)

  if (main_category && sub_category)
    return `/${language}/${main_category.url}/${sub_category.url}/${url}`

  if (main_category) return `/${language}/${main_category.url}/${url}`

  return null
}

class PageWrapper extends React.Component {
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
    var {
      analytics,
      blog,
      bodyTagClasses,
      children,
      content,
      hasBreadcrumbs,
      heading,
      homeGallery,
      homeOverlay,
      isGalleryIndex,
      isTourDetails,
      isRegion,
      mapCanvasCountry,
      locale,
      location,
      socialPanel,
      tourListDetails
    } = this.props

    const defaultLanguage = "en"
    var currentLanguage = locale || defaultLanguage

    const {
      imagesGroups,
      general_pages,
      blog_category,
      blog_post,
      tourData,
      tourCategoryData,
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
    var tour = null

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

      if (tourListDetails && isHome) {
        tourListHeading = strings.feature_tour_list_heading
        var tourListTag = strings.featured_tour
        tourList = tourData
          .filter(t => t.is_featured == "1")
          .sort((a, b) => a.rank - b.rank)
      }

      if (tourListDetails && !isHome) {
        const subCategoryFound =
          tourListDetails.sub_category_id &&
          tourCategoryData.find(c => c.id == tourListDetails.sub_category_id)

        const mainCategoryFound =
          tourListDetails.main_category_id &&
          tourCategoryData.find(c => c.id == tourListDetails.main_category_id)

        if (mainCategoryFound) {
          catListHeading = mainCategoryFound.sub_heading
          catList = tourCategoryData
            .filter(
              t =>
                t.parent_id == tourListDetails.main_category_id &&
                t.status === "A" &&
                t.rank >= 0
            )
            .sort((a, b) => a.rank - b.rank)

          tourListHeading = mainCategoryFound.name
          tourList = tourData
            .filter(
              t =>
                t.status === "A" &&
                t.main_category_id == tourListDetails.main_category_id
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
                t.sub_category_id == tourListDetails.sub_category_id
            )
            .sort((a, b) => a.rank - b.rank)
        }

        autoHeading =
          autoHeading ||
          (subCategoryFound && subCategoryFound.heading) ||
          (mainCategoryFound && mainCategoryFound.heading)
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
        data &&
        data.sub_category_id &&
        tourCategoryData.find(c => c.id == data.sub_category_id)
      imgGroup = data && data.slideshow_id
      tourListHeading = subCategoryFound
        ? strings.otherTours + subCategoryFound.label
        : ""
      if (tour) {
        tourList = tourData
          .filter(
            t =>
              t.status === "A" &&
              t.sub_category_id == tour.sub_category_id &&
              t.id != data.id
          )
          .sort((a, b) => a.rank - b.rank)
      }

      autoHeading = data && data.heading
    }

    if (isGalleryIndex) {
      var galleryGroups = imagesGroups
        .filter(f => f.is_gallery == 1 && f.add_to_gallery_index == 1)
        .map(g => ({
          ...g,
          gallery_id: md5(g.imggrp_id)
        }))

      var galleryIndexPhotos = imagesSlides
        .filter(f => galleryGroups.find(g => g.imggrp_id == f.imggrp_id))
        .sort((a, b) => a.imgslide_rank - b.imgslide_rank)
        .map(p => ({
          ...p,
          gallery_id: md5(p.imggrp_id),
          srcThumb: `/thumbs/galleries/g${p.imggrp_id}/${path.basename(
            p.imgslide_path
          )}`
        }))
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
          languages={sitemetadata.languages}
          currentLanguage={currentLanguage}
          defaultLanguage={defaultLanguage}
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
          {galleryGroups &&
            galleryIndexPhotos && (
              <GalleryIndex
                groups={galleryGroups}
                photos={galleryIndexPhotos}
              />
            )}
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
  location: PropTypes.object.isRequired,
  mapCanvasCountry: PropTypes.string,
  socialPanel: PropTypes.bool,
  tourListDetails: PropTypes.object
}

export default PageWrapper
