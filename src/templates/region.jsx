/* global graphql */
import React from "react"
import PropTypes from "prop-types"

import Header from "../components/header"
import Footer from "../components/footer"
import Slideshow from "../components/slideshow"
import SubNav from "../components/sub-nav"

import contentData from "../components/i18n-data"

const RegionPage = ({
  location,
  page,
  data,
  sitemetadata,
  currentLanguage,
  defaultLanguage,
  slideshowData,
  subnav
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
        {subnav && <SubNav {...subnav} />}
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
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

const RegionPageTemplate = ({ location, data }) => {
  const { sitemetadata, imagesSlides, regionData } = contentData[
    data.markdownRemark.frontmatter.language
  ]
  const defaultLanguage = "en"
  const currentLanguage =
    data.markdownRemark.frontmatter.language || defaultLanguage

  var imgGroup = data.markdownRemark.frontmatter.imggrp_id

  const { slides, videos_html } = getSlideshowData(imagesSlides, imgGroup)

  var subNav = {
    list: regionData
      .filter(
        t =>
          t.status === "A" &&
          t.country_id == data.markdownRemark.frontmatter.country_id
      )
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

  const subnavData = subNav.list.find(l => l.active)

  //if (subnavData) {
  //  autoHeading = data.title
  //  imgGroup = data.slideshow_id
  //  var regionGallery = data.gallery_id
  //  const thumbPath = `/thumbs/galleries/g${regionGallery}/`
  //  var regionGalleryHeading = data.name + " Gallery"
  //  var regionGalleryPhotos = imagesSlides
  //    .filter(i => i.imggrp_id == regionGallery)
  //    .map(i => ({
  //      ...i,
  //      srcThumb: thumbPath + path.basename(i.imgslide_path)
  //    }))
  //    .sort((l, r) => {
  //      return l.imgslide_rank - r.imgslide_rank
  //    })
  //}

  return (
    <RegionPage
      location={location}
      page={data.markdownRemark}
      data={data.markdownRemark.frontmatter}
      sitemetadata={sitemetadata}
      currentLanguage={currentLanguage}
      defaultLanguage={defaultLanguage}
      slideshowData={slides}
      subnav={subNav}
    />
  )
}

RegionPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object
}

export default RegionPageTemplate

export const pageQuery = graphql`
  query RegionPageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        language
        url
        imggrp_id
        country_id
      }
    }
  }
`
