import React, { useRef } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import HomeOverlay from "../home-overlay"
import Header from "../header"
import Footer from "../footer"
import Slideshow from "../slideshow"
import { Breadcrumbs } from "../breadcrumbs"

import "bootstrap/scss/bootstrap.scss"
import "font-awesome/scss/font-awesome.scss"
import "react-id-swiper/lib/styles/scss/swiper.scss"
import "../../../assets/sass/main.scss"

/* 
<div id="jsondata" style={{ display: "none" }}>
{JSON.stringify(data)}
</div> 
*/

const createSlideFromRaw = m => {
  var result = {
    src: m.imgslide_path,
    caption: m.imgslide_caption,
    heading: m.caption_heading
  }
  //var alt = m.imgslide_alt
  return m.youtube_id !== ""
    ? {
        ...result,
        youtubeId: m.youtube_id
      }
    : {
        ...result,
        button: m.button_label,
        buttonUrl: m.button_url
      }
}

const NewLayout = ({
  location,
  strings,
  title,
  languages,
  language,
  sitemetadata,
  navigation,
  is_home,
  overlay,
  slides,
  fixed,
  heading,
  mainContent,
  postDividerContent,
  postContent,
  contact_data,
  breadcrumbTrail
}) => {
  const mainDivRef = useRef(null)
  const ssRef = useRef(null)
  const fixedRef = useRef(fixed)

  const classes = []
  if (is_home) classes.push("home")
  if (!slides) classes.push("no-ss")
  const classNames = classes.join(" ")

  return (
    <>
      <Helmet
        bodyAttributes={{
          class: classNames
        }}
        title={title}
      >
        <link rel="shortcut icon" href="/favicon.ico" />
      </Helmet>

      <Header
        location={location}
        siteTitle={title}
        languages={languages}
        currentLanguage={language}
        contact={sitemetadata.contact}
        navigation={navigation}
      />
      <div className="push" />
      {overlay && (
        <HomeOverlay
          {...overlay}
          visibleChanged={s => {
            fixedRef.current = s
            if (mainDivRef.current) {
              mainDivRef.current.style = s ? "top: 100%" : "top: auto"
            }
            if (ssRef.current) {
              if (s) {
                ssRef.current.classList.add("fixed")
              } else {
                ssRef.current.classList.remove("fixed")
              }
            }
          }}
        />
      )}
      {slides && (
        <Slideshow
          fixed={fixedRef.current}
          ref={ssRef}
          slides={slides.map(createSlideFromRaw)}
          language={language}
          strings={strings}
        />
      )}
      <div className="main" ref={mainDivRef}>
        <div className="container">
          <Breadcrumbs trail={breadcrumbTrail} />
          <div className={`row text-center${breadcrumbTrail ? " has-bc" : ""}`}>
            <div className="col-12">
              <h1>{heading}</h1>
            </div>
          </div>
          {mainContent}
          <div className="row">
            <div className="col-12">
              <div className="divider" />
            </div>
          </div>
          {postDividerContent}
        </div>
        {postContent}
      </div>
      <Footer {...{ contact_data, language, strings }} />
    </>
  )
}

NewLayout.propTypes = {
  children: PropTypes.any,
  strings: PropTypes.object.isRequired,
  overlay: PropTypes.any,
  navigation: PropTypes.object.isRequired,
  slides: PropTypes.array,
  breadcrumbs: PropTypes.array,
  indexGallery: PropTypes.array,
  indexReasons: PropTypes.array
}

export { NewLayout }
