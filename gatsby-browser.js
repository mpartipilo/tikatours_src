/* global app */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

window.jsVars = {}

exports.onInitialClientRender = () => {
  if (typeof app !== `undefined`) {
    app.init()
  }
}

exports.onRouteUpdate = function({ location }) {
  if (typeof app !== `undefined`) {
    app.init()
  }
}
