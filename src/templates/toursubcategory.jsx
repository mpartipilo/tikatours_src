import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Layout } from "../components/layout"
import Slideshow from "../components/slideshow"
import TourList from "../components/tour-list"
import { Breadcrumbs } from "../components/breadcrumbs"

import { imagesSlides, getSlideshowData } from "../components/i18n-data"

// Use this template for tour sub-categories

const TourSubCategoryPage = ({
  page,
  data,
  language,
  slides,
  tourCategoryData,
  tourList,
  tourListHeading,
  mainCategoryFound
}) => (
    <React.Fragment>
      <div className="push" />
      <Slideshow fixed={false} slides={slides} language={language}>
        <div className="main">
          <div className="container">
            <Breadcrumbs
              language={language}
              trail={[
                {
                  page_title: mainCategoryFound.label,
                  path: (language + "/" + mainCategoryFound.url)
                },
                {
                  page_title: data.label,
                  path: (language + "/" + data.url)
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
          </div>
          {tourList && (
            <TourList
              language={language}
              list={tourList}
              heading={tourListHeading}
              tourCategoryData={tourCategoryData}
            />
          )}
        </div>
      </Slideshow>
    </React.Fragment>
  )

class TourSubCategoryPageTemplate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { location, data, pathContext } = this.props
    const language = pathContext.language
    const { imagesSlides } = imagesSlides[language]
    const { sitemetadata } = data

    const imgGroup = data.markdownRemark.frontmatter.imggrp_id

    const slides = getSlideshowData(imagesSlides, imgGroup)

    const tourMainCategoryData = data.tourMainCategories.edges.map(
      e => e.node.frontmatter
    )

    const tourCategoryData = data.tourSubCategories.edges.map(
      e => e.node.frontmatter
    )

    const main_category_id = data.markdownRemark.frontmatter.main_category_id
    const sub_category_id = data.markdownRemark.frontmatter.sub_category_id

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

    const props = {
      sitemetadata,
      languages: pathContext.languages,
      language,
      slideshowData: slides,
      tourCategoryData,
      tourData,
      tourListHeading,
      tourList,
      mainCategoryFound
    }

    return (
      <Layout
        location={location.pathname}
        siteTitle={pathContext.title || sitemetadata.title}
        languages={pathContext.languages}
        navigation={pathContext.navigation}
        language={language}
        contact={sitemetadata.contact}
        data={data}
        sitemetadata={sitemetadata}
      >
        <TourSubCategoryPage
          location={location}
          page={data.markdownRemark}
          data={data.markdownRemark.frontmatter}
          slides={slides}
          {...props}
        />
      </Layout>
    )
  }
}

TourSubCategoryPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default TourSubCategoryPageTemplate

export const pageQuery = graphql`
  query TourSubCategoryById($id: String!, $language: String!) {
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
