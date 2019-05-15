import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { NewLayout } from "../components/layout"
import TourDetails from "../components/tour-details"
import TourList from "../components/tour-list"

import { allImagesSlides, getSlideshowData } from "../components/i18n-data"

const TourDetailPageTemplate = ({ location, data, pathContext }) => {
  const { tour, contact_data } = data
  const { frontmatter, html: tourOverview } = tour
  const {
    tour_id,
    name,
    language,
    heading,
    imggrp_id: imgGroup,
    gallery_id,
    main_category_id,
    sub_category_id,
    duration,
    inclusions,
    itinerary,
    price_from,
    is_featured
  } = frontmatter
  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }
  const { title, languages, strings, navigation, sitemetadata } = pathContext
  const { tourMainCategories, tourSubCategories } = data

  if (!navigation) {
    return <pre>No navigation</pre>
  }

  const { imagesSlides } = allImagesSlides[language]
  const slides = getSlideshowData(imagesSlides, imgGroup)

  var tourData = data.tours.edges.map(({ node }) => node.frontmatter)

  const tourDetails = {
    id: tour_id,
    name: name,
    long_descr: tourOverview,
    sub_category_id: sub_category_id,
    main_category_id: main_category_id,
    is_featured: is_featured || false,
    slideshow_id: imgGroup,
    gallery_id: gallery_id,
    duration: duration,
    inclusions: inclusions ? inclusions.childMarkdownRemark.html : "",
    itinerary: itinerary ? itinerary.childMarkdownRemark.html : "",
    price_from: price_from
  }

  const tourMainCategoryData = tourMainCategories.edges.map(
    ({ node }) => node.frontmatter
  )

  const tourCategoryData = tourSubCategories.edges.map(
    ({ node }) => node.frontmatter
  )

  let mainCategoryFound = {}
  let subCategoryFound = null

  if (main_category_id) {
    mainCategoryFound = tourMainCategoryData.find(
      c => c.main_category_id == main_category_id
    )
  }

  if (sub_category_id) {
    subCategoryFound = tourCategoryData.find(
      c => c.sub_category_id == sub_category_id
    )
  }

  var tourListProps = {}

  if (sub_category_id) {
    const list = tourData
      .filter(t => t.sub_category_id == sub_category_id && t.tour_id != tour.id)
      .map(t => ({ ...t, url: `/${language}/${t.url}` }))
    const heading = subCategoryFound
      ? strings.otherTours + subCategoryFound.label
      : ""
    const tag = subCategoryFound ? subCategoryFound.label : ""

    tourListProps = {
      list,
      heading,
      tag
    }
  } else if (main_category_id) {
    const list = tourData
      .filter(
        t => t.main_category_id == main_category_id && t.tour_id != tour.id
      )
      .map(t => ({ ...t, url: `/${language}/${t.url}` }))
    const heading = mainCategoryFound
      ? strings.otherTours + mainCategoryFound.label
      : ""
    const tag = mainCategoryFound ? mainCategoryFound.label : ""

    tourListProps = {
      list,
      heading,
      tag
    }
  }

  const layoutProps = {
    location: location.pathname,
    strings,
    title,
    languages,
    language,
    sitemetadata,
    navigation,
    slides,
    fixed: false,
    heading,
    breadcrumbTrail: [
      { path: `/${language}`, page_title: "home" },
      {
        page_title: mainCategoryFound.label,
        path: `/${language}/${mainCategoryFound.url}`
      },
      subCategoryFound
        ? {
            page_title: subCategoryFound.label,
            path: `/${language}/${subCategoryFound.url}`
          }
        : null,
      {
        page_title: frontmatter.name,
        path: `/${language}/${frontmatter.url}`
      }
    ].filter(t => t),
    mainContent: (
      <TourDetails
        language={language}
        url={location.pathname}
        imagesSlidesData={imagesSlides}
        tourCategoryData={tourCategoryData}
        tour={tourDetails}
        strings={strings}
      />
    ),
    postContent: (
      <TourList
        language={language}
        tourCategoryData={tourCategoryData}
        strings={strings}
        {...tourListProps}
      />
    ),
    contact_data
  }

  return <NewLayout {...layoutProps} />
}

TourDetailPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default TourDetailPageTemplate

export const pageQuery = graphql`
  query TourDetailById($id: String!, $language: String!) {
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

    tour: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        tour_id
        name
        heading
        language
        url
        imggrp_id
        gallery_id
        duration
        price_from
        main_category_id
        sub_category_id
        itinerary {
          childMarkdownRemark {
            html
          }
        }
        inclusions {
          childMarkdownRemark {
            html
          }
        }
      }
    }

    tours: allMarkdownRemark(
      filter: {
        frontmatter: {
          template: { eq: "tour" }
          language: { eq: $language }
          name: { ne: null }
        }
      }
      sort: { fields: frontmatter___rank, order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
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

    tourMainCategories: allMarkdownRemarkTourcategory(
      filter: { frontmatter: { language: { eq: $language } } }
      sort: { fields: frontmatter___rank, order: ASC }
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
      sort: { fields: frontmatter___rank, order: ASC }
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
  }
`
