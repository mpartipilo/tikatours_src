/* global app, window, $ */
/* global WhWidgetSendButton */
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Header from "../header"
import Footer from "../footer"

import "../../../assets/sass/main.scss"

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    app.init()

    var options = {
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
    }

    var proto = document.location.protocol,
      host = "whatshelp.io",
      url = proto + "//static." + host
    var s = document.createElement("script")
    s.type = "text/javascript"
    s.async = true
    s.src = url + "/widget-send-button/js/init.js"
    s.onload = function() {
      WhWidgetSendButton.init(host, proto, options)
    }
    var x = document.getElementsByTagName("script")[0]
    x.parentNode.insertBefore(s, x)
  }

  render() {
    const {
      children,
      language,
      languages,
      sitemetadata,
      data,
      siteTitle
    } = this.props
    return (
      <>
        <Helmet title={siteTitle} />
        <Header
          location={location.pathname}
          siteTitle={data.title}
          languages={languages}
          currentLanguage={language}
          contact={sitemetadata.contact}
        />
        {children}
        <Footer language={language} />
      </>
    )
  }
}

export default Layout

Layout.propTypes = {
  children: PropTypes.any
}
