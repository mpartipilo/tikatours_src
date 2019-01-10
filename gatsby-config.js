const path = require("path")
const pixrem = require("pixrem")
const cssnext = require("postcss-cssnext")

module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
        includePaths: [path.resolve(__dirname, "node_modules")]
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
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
        path: `${__dirname}/content/content/pages`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `general_pages`,
        path: `${__dirname}/content/content/gallery`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tour`,
        path: `${__dirname}/content/content/tour`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tourcategory`,
        path: `${__dirname}/content/content/tourcategory`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `toursubcategory`,
        path: `${__dirname}/content/content/toursubcategory`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `region`,
        path: `${__dirname}/content/content/regions`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-67419912-1"
      }
    },
    "gatsby-plugin-recaptcha",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    "gatsby-transformer-remark",
    "gatsby-transformer-remark-typed",
    "gatsby-remark-source-name"
  ]
}
