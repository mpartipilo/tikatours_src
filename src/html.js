import React from "react"
import path from "path"

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let cssInline
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style 
          dangerouslySetInnerHTML={{ __html: '@import url("/styles.css")' }}/>
      )
      cssInline = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
          {css}
          <script
            dangerouslySetInnerHTML={{
              __html: `document.cookie='resolution='+Math.max(screen.width,screen.height)+'; path=/';`
            }}
          />
          <script src="/assets/js/libs/modernizr-2.8.3.min.js" />
          <script type="text/javascript" src="/assets/js/libs/jquery.min.js" />
          <script type="text/javascript" src="/assets/js/libs/supersized.js" />
          <script src="/assets/js/libs/vendor.js" />
          <script src="/assets/js/main.js" />
          <script type="text/javascript">
            (function () {
                var options = {
                    facebook: "290339974371704", // Facebook page ID
                    whatsapp: "+995 570 70 72 14", // WhatsApp number
                    email: "info@tikatours.com", // Email
                    call: "+995 570 70 72 14", // Call phone number
                    company_logo_url: "//storage.whatshelp.io/widget/54/54e8/54e841405d2a73f7a8d3103339540050/logo.jpg", // URL of company logo (png, jpg, gif)
                    greeting_message: "Hello, how may we assist you? Send us a message and our team will be in touch shortly.", // Text of greeting message
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
                    key: "JV24bhnzT7uNGCGueeRdiA", // pro-widget key
                };

                var proto = document.location.protocol, host = "whatshelp.io", url = proto + "//static." + host;
                var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
                s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
                var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
            })();
        </script>
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script>{`window.jsVars = {}`}</script>
        </body>
      </html>
    )
  }
}
