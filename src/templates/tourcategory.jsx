import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { NewLayout } from "../components/layout"
import CatList from "../components/cat-list"
import TourList from "../components/tour-list"

const TourCategoryPage = ({
  location,
  page,
  data,
  sitemetadata,
  languages,
  language,
  catListHeading,
  catList,
  tourListHeading,
  tourList,
  tourCategoryData,
  strings
}) => (
  <React.Fragment>
    <div className="push" />
    <div className="main">
      <div className="container">
        <Breadcrumbs
          language={language}
          trail={[
            { path: `/${language}`, page_title: "home" },
            {
              page_title: data.label,
              path: language + "/" + data.url
            }
          ]}
        />
        <div className="row">
          <div className="col-12 text-center has-bc">
            <h1>{data.heading}</h1>
          </div>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
        <div className="row">
          <div className="col-12">
            <div className="divider" />
          </div>
        </div>
        {catList && <CatList list={catList} heading={catListHeading} />}
      </div>
      {tourList && (
        <TourList
          language={language}
          list={tourList}
          heading={tourListHeading}
          tourCategoryData={tourCategoryData}
          strings={strings}
        />
      )}
    </div>
  </React.Fragment>
)

const TourCategoryTemplate = ({ location, data, pathContext }) => {
  const { markdownRemark, contact_data } = data
  const { frontmatter: mainCategoryFound } = markdownRemark
  const {
    language,
    heading,
    name,
    imggrp_id: imgGroup,
    imggrp_id_gallery,
    main_category_id,
    sub_heading
  } = mainCategoryFound
  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }
  const { title, languages, strings, navigation, sitemetadata } = pathContext
  const { tourMainCategories, tourSubCategories, tours } = data

  const tourCategoryData = tourSubCategories.edges.map(
    ({ node }) => node.frontmatter
  )

  var catListHeading = sub_heading
  var catList = tourCategoryData
    .filter(t => t.main_category_id == main_category_id && t.rank >= 0)
    .sort((a, b) => a.rank - b.rank)
    .map(c => ({ ...c, url: `/${language}/${c.url}` }))

  var tourListHeading = name
  var tourData = tours.edges.map(t => t.node.frontmatter)
  var tourList = tourData
    .filter(t => t.main_category_id == main_category_id)
    .sort((a, b) => a.rank - b.rank)
    .map(t => ({ ...t, url: `/${language}/${t.url}` }))

  var tourFullCategoryData = tourCategoryData.concat(
    tourMainCategories.edges.map(({ node }) => node.frontmatter)
  )

  const layoutProps = {
    location: location.pathname,
    strings,
    title,
    languages,
    language,
    sitemetadata,
    navigation,
    slides: null,
    fixed: false,
    heading,
    breadcrumbTrail: [
      { path: `/${language}`, page_title: "home" },
      {
        page_title: mainCategoryFound.label,
        path: `/${language}/${mainCategoryFound.url}`
      }
    ],
    mainContent: (
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    ),
    postDividerContent: catList ? (
      <CatList list={catList} heading={catListHeading} />
    ) : null,
    postContent: (
      <>
        <TourList
          language={language}
          heading={tourListHeading}
          list={tourList}
          tourCategoryData={tourFullCategoryData}
          strings={strings}
        />
      </>
    ),
    contact_data
  }

  return <NewLayout {...layoutProps} />
}

TourCategoryTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default TourCategoryTemplate

export const pageQuery = graphql`
  query TourCategoryById($id: String!, $language: String!) {
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

    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        label
        name
        language
        url
        imggrp_id
        main_category_id
        sub_heading
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
            short_descr
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
