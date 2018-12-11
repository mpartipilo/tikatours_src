/* global WhWidgetSendButton */
import React from "react"
import PropTypes from "prop-types"

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var options = {
      facebook: "290339974371704", // Facebook page ID
      whatsapp: "+995 570 70 72 14", // WhatsApp number
      email: "info@tikatours.com", // Email
      call: "+995 570 70 72 14", // Call phone number
      company_logo_url:
        "//storage.whatshelp.io/widget/54/54e8/54e841405d2a73f7a8d3103339540050/logo.jpg", // URL of company logo (png, jpg, gif)
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
    const { children } = this.props
    return children()
  }
}

Layout.propTypes = {
  children: PropTypes.Function
}

export default Layout
