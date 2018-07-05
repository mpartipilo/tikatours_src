const pixrem = require("pixrem")
const cssnext = require("postcss-cssnext")
const ISO6391 = require("iso-639-1")

const mapFlagLanguage = [
  {
    lang: "en",
    flag: "US"
  },
  {
    lang: "es",
    flag: "ES"
  },
  {
    lang: "ka",
    flag: "GE"
  }
]

module.exports = {
  siteMetadata: {
    title: "Tika Tours | Tours of Georgia, Armenia and Azerbaijan",
    contact: {
      email: "info@tikatours.com",
      telephone: "+995 570 70 72 14"
    },
    languages: mapFlagLanguage.map(l => ({
      countryCode: l.flag,
      languageCode: l.lang,
      languageName: ISO6391.getNativeName(l.lang)
    }))
  },
  plugins: [
    "gatsby-plugin-react-next",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [
          pixrem(),
          cssnext({
            browsers: ["last 2 versions"]
          })
        ],
        precision: 8
      }
    }
  ]
}
