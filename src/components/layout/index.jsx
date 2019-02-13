/* global app */
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Header from "../header"
import Footer from "../footer"
import Slideshow from "../slideshow"
import { WhatsHelp } from "../whatshelp"

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

  componentDidMount() {
    app.init()
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
      navigation
    } = this.props
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
        <Footer language={language} />
        <WhatsHelp
          options={{
            facebook: "290339974371704", // Facebook page ID
            whatsapp: "+31627468794", // WhatsApp number
            email: "info@tikatours.com", // Email
            call: "+995 570 70 72 14", // Call phone number
            company_logo_url:
              "//storage.whatshelp.io/widget/a5/a50c/a50c13510f5f1806f76bc4fabcb3d87c/logo.jpg", // URL of company logo (png, jpg, gif)
            greeting_message:
              "Hello, how may we assist you? Send us a message and our team will be in touch shortly.", // Text of greeting message
            call_to_action: "Message or Call Us", // Call to action
            button_color: "#B21F28", // Color of button
            position: "right", // Position may be 'right' or 'left'
            order: "facebook,whatsapp,call,email", // Order of buttons
            ga: true, // Google Analytics enabled
            branding: false, // Show branding string
            mobile: true, // Mobile version enabled
            desktop: true, // Desktop version enabled
            greeting: true, // Greeting message enabled
            shift_vertical: 0, // Vertical position, px
            shift_horizontal: 0, // Horizontal position, px
            domain: "tikatours.com", // site domain
            key: "JV24bhnzT7uNGCGueeRdiA" // pro-widget key
          }}
        />
      </>
    )
  }
}

const LayoutMain = ({ heading, children }) => (
  <>
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>{heading}</h1>
          </div>
        </div>
        {children}
        <div className="row">
          <div className="col-xs-12">
            <div className="divider" />
          </div>
        </div>
      </div>
    </div>
  </>
)

const LayoutSlideshow = ({ fixed, slides, language, children, heading }) => (
  <Slideshow fixed={fixed} slides={slides} language={language}>
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
  sitemetadata: PropTypes.any
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
  children: PropTypes.any,
  heading: PropTypes.any
}

export { Layout, LayoutPage, LayoutSlideshow }
