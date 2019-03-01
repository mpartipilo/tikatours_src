import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Layout } from "../components/layout"
import CatList from "../components/cat-list"
import TourList from "../components/tour-list"

import { contentData } from "../components/i18n-data"

const TourCategoryPage = ({
  location,
  page,
  data,
  sitemetadata,
  languages,
  currentLanguage,
  catListHeading,
  catList,
  tourListHeading,
  tourList,
  tourCategoryData
}) => (
  <React.Fragment>
    <div className="push" />
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
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
          language={currentLanguage}
          list={tourList}
          heading={tourListHeading}
          tourCategoryData={tourCategoryData}
        />
      )}
    </div>
  </React.Fragment>
)

const GeneralPageTemplate = ({ location, data, pathContext }) => {
  const currentLanguage = pathContext.language
  const { sitemetadata } = data

  const mainCategoryFound = data.markdownRemark.frontmatter
  const main_category_id = mainCategoryFound.main_category_id

  const tourCategoryData = data.tourSubCategories.edges.map(
    e => e.node.frontmatter
  )

  var catListHeading = mainCategoryFound.sub_heading
  var catList = tourCategoryData
    .filter(t => t.main_category_id == main_category_id && t.rank >= 0)
    .sort((a, b) => a.rank - b.rank)
    .map(c => ({ ...c, url: `/${currentLanguage}/${c.url}` }))

  var tourListHeading = mainCategoryFound.name
  var tourData = data.tours.edges.map(t => t.node.frontmatter)
  var tourList = tourData
    .filter(t => t.main_category_id == main_category_id)
    .sort((a, b) => a.rank - b.rank)
    .map(t => ({ ...t, url: `/${currentLanguage}/${t.url}` }))

  const props = {
    sitemetadata,
    languages: pathContext.languages,
    currentLanguage,
    catListHeading,
    catList,
    tourListHeading,
    tourList,
    tourCategoryData
  }

  return (
    <Layout
      location={location.pathname}
      siteTitle={pathContext.title}
      languages={pathContext.languages}
      navigation={pathContext.navigation}
      language={currentLanguage}
      contact={sitemetadata.contact}
      data={data}
      sitemetadata={sitemetadata}
    >
      <TourCategoryPage
        location={location}
        page={data.markdownRemark}
        data={data.markdownRemark.frontmatter}
        {...props}
      />
    </Layout>
  )
}

GeneralPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default GeneralPageTemplate

export const pageQuery = graphql`
  query TourCategoryById($id: String!, $language: String!) {
    sitemetadata: metadataJson {
      title
      contact {
        email
        telephone
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
