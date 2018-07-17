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
    }
  ]
}
