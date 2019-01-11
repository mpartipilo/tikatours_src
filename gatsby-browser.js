/* global app */
const onClientEntry = () => {
  window.jsVars = {}
}

const onInitialClientRender = () => {
  app.init()
}

export { onClientEntry, onInitialClientRender }
