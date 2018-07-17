import React from "react"

const Layout = ({ children }) => {
  return children()
}
export default Layout

export const query = `
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        languages {
          countryCode
          languageCode
          languageName
        }
        contact {
          email
          telephone
        }
      }
    }
  }
`
