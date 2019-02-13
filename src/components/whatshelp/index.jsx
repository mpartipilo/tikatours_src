/* global WhWidgetSendButton */
import React from "react"
import PropTypes from "prop-types"

class WhatsHelp extends React.Component {
  constructor(props) {
    super(props)

    const { options } = props

    this.state = { options }
  }

  componentDidMount() {
    const { options } = this.state

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
    return null
  }
}

WhatsHelp.propTypes = {
  options: PropTypes.object.isRequired
}

export { WhatsHelp }
