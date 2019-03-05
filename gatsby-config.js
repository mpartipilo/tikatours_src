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
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        ignore: ["react-id-swiper/"] // Ignore files/folders
        // purgeOnly: ['bootstrap/','fontawesome/'] // Purge only these files/folders
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `highlights`,
        path: `${__dirname}/content/json`
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-67419912-1"
      }
    },
    {
      resolve: `gatsby-plugin-recaptcha`,
      options: {
        async: false,
        defer: true,
        args: `?render=explicit`
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    "gatsby-transformer-remark",
    "gatsby-transformer-remark-typed",
    "gatsby-remark-source-name"
  ]
}
