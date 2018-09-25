const pixrem = require("pixrem")
const cssnext = require("postcss-cssnext")

module.exports = {
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
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `general_pages`,
        path: `${__dirname}/content/content`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tour`,
        path: `${__dirname}/content/tour`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tour`,
        path: `${__dirname}/content/blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tour`,
        path: `${__dirname}/content/regions`
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    "gatsby-transformer-remark",
    "gatsby-remark-source-name"
  ]
}
