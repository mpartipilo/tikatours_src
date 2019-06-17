import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { NewLayout } from "../components/layout"
import TourList from "../components/tour-list"

import { allImagesSlides, getSlideshowData } from "../components/i18n-data"

// Use this template for tour sub-categories

const TourSubCategoryPageTemplate = ({ location, data, pathContext }) => {
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark
  const {
    language,
    heading,
    imggrp_id: imgGroup,
    imggrp_id_gallery,
    main_category_id,
    sub_category_id
  } = frontmatter
  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }
  const {
    title,
    languages,
    strings,
    navigation,
    contact_data,
    sitemetadata
  } = pathContext
  const { tourMainCategories, tourSubCategories } = data

  if (!navigation) {
    return <pre>No navigation</pre>
  }

  const { imagesSlides } = allImagesSlides[language]
  const slides = getSlideshowData(imagesSlides, imgGroup)

  const tourMainCategoryData = tourMainCategories.edges.map(
    ({ node }) => node.frontmatter
  )

  const tourCategoryData = tourSubCategories.edges.map(
    ({ node }) => node.frontmatter
  )

  const mainCategoryFound =
    main_category_id &&
    tourMainCategoryData.find(c => c.main_category_id == main_category_id)

  const subCategoryFound =
    sub_category_id &&
    tourCategoryData.find(c => c.sub_category_id == sub_category_id)

  var tourListHeading = subCategoryFound.name

  var tourData = data.tours.edges.map(t => t.node.frontmatter)
  var tourList = tourData
    .filter(
      t =>
        t.main_category_id == main_category_id &&
        t.sub_category_id == sub_category_id
    )
    .sort((a, b) => a.rank - b.rank)
    .map(t => ({ ...t, url: `/${language}/${t.url}` }))

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
      {
        page_title: frontmatter.label,
        path: `/${language}/${frontmatter.url}`
      }
    ],
    mainContent: (
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    ),
    postContent: (
      <>
        <TourList
          language={language}
          heading={tourListHeading}
          list={tourList}
          tourCategoryData={tourCategoryData}
          strings={strings}
        />
      </>
    ),
    contact_data
  }

  return <NewLayout {...layoutProps} />
}

TourSubCategoryPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default TourSubCategoryPageTemplate

export const pageQuery = graphql`
  query TourSubCategoryById($id: String!, $language: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        label
        language
        name
        url
        imggrp_id
        main_category_id
        sub_category_id
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

    tours: allMarkdownRemark(
      filter: {
        frontmatter: {
          template: { eq: "tour" }
          language: { eq: $language }
          name: { ne: null }
        }
      }
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
  }
`
