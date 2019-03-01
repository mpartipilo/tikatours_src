import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Layout } from "../components/layout"
import Slideshow from "../components/slideshow"
import TourDetails from "../components/tour-details"

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
  tour
}) => (
  <React.Fragment>
    <div className="push" />
    <Slideshow
      fixed={false}
      slides={slideshowData}
      language={language}
    >
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>{data.heading}</h1>
            </div>
          </div>
          <div className="content">
            <TourDetails
              language={language}
              url={location.pathname}
              imagesSlidesData={imagesSlides}
              tourCategoryData={tourCategoryData}
              tourData={tourData}
              tour={tour}
            />
          </div>
          <div className="row">
            <div className="col-12">
              <div className="divider" />
            </div>
          </div>
        </div>
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
    const { imagesSlides } = contentData[language]
    const { sitemetadata } = data

    const imgGroup = data.tour.frontmatter.imggrp_id

    const slides = getSlideshowData(imagesSlides, imgGroup)

    const tourCategoryData = data.tourSubCategories.edges.map(
      e => e.node.frontmatter
    )

    var tourData = data.tours.edges.map(t => t.node.frontmatter)

    const props = {
      sitemetadata,
      languages: pathContext.languages,
      language,
      imagesSlides,
      tourCategoryData,
      tourData,
      slideshowData: slides
    }

    const { frontmatter } = data.tour

    const tour = {
      id: frontmatter.tour_id,
      long_descr: data.tour.html,
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
        <GeneralPage
          location={location}
          page={data.tour}
          data={data.tour.frontmatter}
          {...props}
          tour={tour}
        />
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
