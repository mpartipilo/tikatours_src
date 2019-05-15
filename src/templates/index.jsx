import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import format from "string-format"
import { graphql } from "gatsby"

import { NewLayout } from "../components/layout"
import HomeGallery from "../components/home-gallery"
import MapCanvasView from "../components/map-canvas"
import ReasonsSlider from "../components/reasons"
import SocialPanel from "../components/social-panel"
import TourList from "../components/tour-list"

import { getSlideshowData, allImagesSlides } from "../components/i18n-data"

const CountryHighlights = ({
  language,
  highlights,
  title_count,
  actionLabel,
  actionUrl
}) => (
  <ReasonsSlider
    reasons={highlights}
    title={format(title_count, highlights.length)}
    btnUrl={`/${language}${actionUrl}`}
    btnText={actionLabel}
  />
)

const IndexPage = ({ location, data, pathContext }) => {
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark
  const {
    language,
    heading,
    imggrp_id: imgGroup,
    imggrp_id_gallery
  } = frontmatter
  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }
  const { imagesSlides } = allImagesSlides[language]
  const { title, languages, strings, navigation, sitemetadata } = pathContext

  if (!navigation) {
    return <pre>No navigation</pre>
  }

  const { highlightsJson, homeOverlayJson, tours, contact_data } = data
  const homeOverlayData = homeOverlayJson.data

  var tourData = tours.edges.map(t => t.node.frontmatter)
  var tourList = tourData.map(t => ({ ...t, url: `/${language}/${t.url}` }))

  const slides = getSlideshowData(imagesSlides, imgGroup)

  const layoutProps = {
    location: location.pathname,
    strings,
    title,
    languages,
    language,
    sitemetadata,
    navigation,
    is_home: true,
    overlay: homeOverlayData,
    slides,
    fixed: true,
    heading,
    mainContent: (
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    ),
    postContent: (
      <>
        <TourList
          language={language}
          heading={strings["feature_tour_list_heading"]}
          list={tourList}
          tag={strings["featured_tour"]}
          strings={strings}
        />
        <CountryHighlights {...highlightsJson} />
        <MapCanvasView countryName="Georgia" strings={strings} />
        <SocialPanel language={language} strings={strings} />
        <HomeGallery imageSlides={imagesSlides} galleryId={imggrp_id_gallery} />
      </>
    ),
    contact_data
  }

  return (
    <>
      <Helmet
        meta={[
          {
            name: "description",
            content: "==mdescr=="
          },
          { name: "keywords", content: "==mkeyw==" },
          { name: "http-equiv", content: "" },
          { name: "author", content: "==mauthor==" },
          { name: "HandheldFriendly", content: "True" },
          { name: "MobileOptimized", content: "320" },
          {
            name: "viewport",
            content:
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
          },
          { "http-equiv": "cleartype", content: "on" }
        ]}
      />
      <NewLayout {...layoutProps} />
    </>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object,
  data: PropTypes.object
}

export default IndexPage

export const pageQuery = graphql`
  query HomePageById($id: String!, $language: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        language
        url
        imggrp_id
        imggrp_id_gallery
      }
    }

    tourMainCategories: allMarkdownRemarkTourcategory(
      filter: { frontmatter: { language: { eq: $language } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            language
            url
            template
            heading
            name
            label
            image_path
            imggrp_id
            main_category_id
            rank
          }
        }
      }
    }

    tourSubCategories: allMarkdownRemarkToursubcategory(
      filter: { frontmatter: { language: { eq: $language } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            language
            url
            template
            heading
            name
            label
            image_path
            imggrp_id
            main_category_id
            sub_category_id
            rank
          }
        }
      }
    }

    contact_data: contactJson(lang: { eq: $language }) {
      phone
      email
      address
      copyright
      credits
      navFooter {
        title
        url
      }
    }

    highlightsJson(lang: { eq: $language }) {
      actionUrl
      actionLabel
      title_count
      highlights {
        id
        highlight
      }
    }

    homeOverlayJson(lang: { eq: $language }) {
      data {
        heading
        subheading
        intro
        btn_text
        btn_url
      }
    }

    tours: allMarkdownRemark(
      sort: { fields: [frontmatter___rank], order: ASC }
      filter: {
        frontmatter: {
          template: { eq: "tour" }
          language: { eq: $language }
          name: { ne: null }
          is_featured: { eq: true }
        }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            is_featured
            name
            tour_id
            language
            short_descr
            url
            rank
            duration
            price_from
            main_category_id
            sub_category_id
            image_path
          }
        }
      }
    }
  }
`
