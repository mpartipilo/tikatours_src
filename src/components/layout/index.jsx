import React, { useState } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import HomeOverlay from "../home-overlay"
import Header from "../header"
import Footer from "../footer"
import Slideshow from "../slideshow"
import { Breadcrumbs } from "../breadcrumbs"

import "bootstrap/scss/bootstrap.scss"
import "font-awesome/scss/font-awesome.scss"
import "react-id-swiper/src/styles/scss/swiper.scss"
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

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      children,
      language,
      languages,
      location,
      sitemetadata,
      data,
      siteTitle,
      navigation,
      strings
    } = this.props
    const { contact_data } = data
    return (
      <>
        <Helmet title={siteTitle} />
        <Header
          location={location}
          siteTitle={data.title}
          languages={languages}
          currentLanguage={language}
          contact={sitemetadata.contact}
          navigation={navigation}
        />
        {children}
        <Footer {...{ contact_data, language, strings }} />
      </>
    )
  }
}

const LayoutMain = ({ heading, children }) => (
  <>
    <div className="main">
      <div className="container">
        <div className="row text-center">
          <div className="col-12">
            <h1>{heading}</h1>
          </div>
        </div>
        {children}
        <div className="row">
          <div className="col-12">
            <div className="divider" />
          </div>
        </div>
      </div>
    </div>
  </>
)

const LayoutSlideshow = ({
  fixed,
  slides,
  language,
  children,
  heading,
  strings
}) => (
  <>
    <Slideshow
      fixed={fixed}
      slides={slides.map(createSlideFromRaw)}
      language={language}
      strings={strings}
    />
    <LayoutMain heading={heading}>{children}</LayoutMain>
  </>
)

const LayoutPage = ({ children, ...props }) => {
  const { data } = props
  const { heading } = data.markdownRemark.frontmatter

  let LayoutInternal = LayoutMain
  if (props.slides) {
    LayoutInternal = LayoutSlideshow
  }
  return (
    <Layout {...props}>
      <div className="push" />
      <LayoutInternal heading={heading} {...props}>
        {children}
      </LayoutInternal>
    </Layout>
  )
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
  const [overlayVisible, setOverlayVisible] = useState(fixed)

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
        <HomeOverlay {...overlay} visibleChanged={s => setOverlayVisible(s)} />
      )}
      {slides && (
        <Slideshow
          fixed={overlayVisible}
          slides={slides.map(createSlideFromRaw)}
          language={language}
          strings={strings}
        />
      )}
      <div className="main" style={{ top: overlayVisible ? "100%" : "auto" }}>
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

Layout.propTypes = {
  children: PropTypes.any,
  data: PropTypes.any,
  language: PropTypes.any,
  languages: PropTypes.any,
  location: PropTypes.string.isRequired,
  navigation: PropTypes.any.isRequired,
  siteTitle: PropTypes.any,
  sitemetadata: PropTypes.any,
  strings: PropTypes.object.isRequired
}

LayoutMain.propTypes = {
  children: PropTypes.any,
  heading: PropTypes.any
}

LayoutPage.propTypes = {
  children: PropTypes.any,
  data: PropTypes.any,
  language: PropTypes.any,
  languages: PropTypes.any,
  navigation: PropTypes.any.isRequired,
  siteTitle: PropTypes.any,
  sitemetadata: PropTypes.any,
  slides: PropTypes.array
}

LayoutSlideshow.propTypes = {
  fixed: PropTypes.any,
  slides: PropTypes.any,
  language: PropTypes.any,
  strings: PropTypes.object.isRequired,
  children: PropTypes.any,
  heading: PropTypes.any
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

export { Layout, LayoutPage, LayoutSlideshow, NewLayout }
