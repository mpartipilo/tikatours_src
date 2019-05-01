import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Header from "../header"
import Footer from "../footer"
import Slideshow from "../slideshow"
import { WhatsHelp } from "../whatshelp"

import "normalize-scss/sass/_normalize.scss"
import "bootstrap/scss/bootstrap.scss"
import "font-awesome/scss/font-awesome.scss"
import "react-id-swiper/src/styles/scss/swiper.scss"
import "../../../assets/sass/main.scss"

/* 
<div id="jsondata" style={{ display: "none" }}>
{JSON.stringify(data)}
</div> 
*/

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
        <Footer {...{contact_data, language, strings}} />
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

const LayoutSlideshow = ({ fixed, slides, language, children, heading, strings }) => (
  <Slideshow fixed={fixed} slides={slides} language={language} strings={strings}>
    <LayoutMain heading={heading}>{children}</LayoutMain>
  </Slideshow>
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

export { Layout, LayoutPage, LayoutSlideshow }
