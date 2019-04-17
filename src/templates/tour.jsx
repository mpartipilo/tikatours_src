import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Layout } from "../components/layout"
import Slideshow from "../components/slideshow"
import TourDetails from "../components/tour-details"
import TourList from "../components/tour-list"
import { Breadcrumbs } from "../components/breadcrumbs"

import { contentData, getSlideshowData } from "../components/i18n-data"

const GeneralPage = ({
  location,
  page,
  data,
  sitemetadata,
  languages,
  language,
  slideshowData,
  imagesSlides,
  tourCategoryData,
  tourData,
  tourList,
  tourListHeading,
  tourListTag,
  tour,
  mainCategoryFound,
  subCategoryFound
}) => (
  <React.Fragment>
    <div className="push" />
    <Slideshow fixed={false} slides={slideshowData} language={language}>
      <div className="main">
        <div className="container">
          <Breadcrumbs
            language={language}
            trail={[
              {
                page_title: mainCategoryFound.label,
                path: language + "/" + mainCategoryFound.url
              },
              subCategoryFound
                ? {
                    page_title: subCategoryFound.label,
                    path: language + "/" + subCategoryFound.url
                  }
                : null,
              {
                page_title: tour.name,
                path: language + "/" + tour.url
              }
            ]}
          />
          <div className="row">
            <div className="col-12 text-center has-bc">
              <h1>{data.heading}</h1>
            </div>
          </div>
          <div className="content">
            <TourDetails
              language={language}
              url={location.pathname}
              imagesSlidesData={imagesSlides}
              tourCategoryData={tourCategoryData}
              tour={tour}
            />
          </div>
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
            tag={tourListTag}
            tourCategoryData={tourCategoryData}
          />
        )}
      </div>
    </Slideshow>
  </React.Fragment>
)

class TourDetailPageTemplate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { location, data, pathContext } = this.props
    const language = pathContext.language
    const { imagesSlides, strings } = contentData[language]
    const { sitemetadata } = data

    const imgGroup = data.tour.frontmatter.imggrp_id

    const slides = getSlideshowData(imagesSlides, imgGroup)

    const tourMainCategoryData = data.tourMainCategories.edges.map(
      e => e.node.frontmatter
    )

    const tourCategoryData = data.tourSubCategories.edges.map(
      e => e.node.frontmatter
    )

    var tourData = data.tours.edges.map(t => t.node.frontmatter)

    const { frontmatter } = data.tour

    const tour = {
      id: frontmatter.tour_id,
      name: frontmatter.name,
      long_descr: frontmatter.html,
      sub_category_id: frontmatter.sub_category_id,
      main_category_id: frontmatter.main_category_id,
      is_featured: frontmatter.is_featured || false,
      slideshow_id: frontmatter.imggrp_id,
      gallery_id: frontmatter.gallery_id,
      duration: frontmatter.duration,
      inclusions:
        (frontmatter.inclusions &&
          frontmatter.inclusions.childMarkdownRemark.html) ||
        "",
      itinerary:
        (frontmatter.itinerary &&
          frontmatter.itinerary.childMarkdownRemark.html) ||
        "",
      price_from: frontmatter.price_from
    }

    let mainCategoryFound = {}
    let subCategoryFound = {}

    if (tour.main_category_id) {
      mainCategoryFound = tourMainCategoryData.find(
        c => c.main_category_id == tour.main_category_id
      )
    }

    if (tour.sub_category_id) {
      subCategoryFound = tourCategoryData.find(
        c => c.sub_category_id == tour.sub_category_id
      )
    }

    const props = {
      location,
      sitemetadata,
      languages: pathContext.languages,
      language,
      imagesSlides,
      tourCategoryData,
      tourData,
      slideshowData: slides,
      tour,
      data: frontmatter,
      page: data.tour,
      mainCategoryFound,
      subCategoryFound
    }

    var tourListProps = {}

    if (tour.sub_category_id) {
      const tourList = tourData
        .filter(
          t => t.sub_category_id == tour.sub_category_id && t.tour_id != tour.id
        )
        .sort((a, b) => a.rank - b.rank)
        .map(t => ({ ...t, url: `/${language}/${t.url}` }))
      const tourListHeading = subCategoryFound
        ? strings.otherTours + subCategoryFound.label
        : ""
      const tourListTag = subCategoryFound ? subCategoryFound.label : ""

      tourListProps = {
        tourList,
        tourListHeading,
        tourListTag
      }
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
        <GeneralPage {...props} {...tourListProps} />
      </Layout>
    )
  }
}

TourDetailPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default TourDetailPageTemplate

export const pageQuery = graphql`
  query TourDetailById($id: String!, $language: String!) {
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
  }
`
