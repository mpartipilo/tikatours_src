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
        name: `data_common`,
        path: `${__dirname}/data/common`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data_en`,
        path: `${__dirname}/data/en`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data_zh`,
        path: `${__dirname}/data/zh`
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    "gatsby-transformer-remark"
  ]
}
