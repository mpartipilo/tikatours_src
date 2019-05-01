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
    "gatsby-remark-source-name",
    {
      resolve: `gatsby-plugin-whatshelp`,
      options: {
        facebook: "290339974371704", // Facebook page ID
        whatsapp: "+31627468794", // WhatsApp number
        email: "info@tikatours.com", // Email
        call: "+995 570 70 72 14", // Call phone number
        company_logo_url:
          "//storage.whatshelp.io/widget/a5/a50c/a50c13510f5f1806f76bc4fabcb3d87c/logo.jpg", // URL of company logo (png, jpg, gif)
        greeting_message:
          "Hello, how may we assist you? Send us a message and our team will be in touch shortly.", // Text of greeting message
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
        key: "JV24bhnzT7uNGCGueeRdiA" // pro-widget key
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        ignore: ["react-id-swiper/"], // Ignore files/folders
        purgeOnly: ['bootstrap/','fontawesome/'] // Purge only these files/folders
      }
    },
  ]
}
