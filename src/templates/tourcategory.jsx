/* global graphql */
/* global app, window, $ */
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Header from "../components/header"
import Footer from "../components/footer"
import CatList from "../components/cat-list"
import TourList from "../components/tour-list"

import contentData from "../components/i18n-data"

const GeneralPage = ({
  location,
  page,
  data,
  sitemetadata,
  currentLanguage,
  defaultLanguage,
  catListHeading,
  catList,
  tourListHeading,
  tourList,
  tourCategoryData
}) => (
  <React.Fragment>
    <Header
      location={location.pathname}
      siteTitle={sitemetadata.title}
      languages={sitemetadata.languages}
      currentLanguage={currentLanguage}
      defaultLanguage={defaultLanguage}
      contact={sitemetadata.contact}
    />
    <div className="push" />
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>{data.heading}</h1>
          </div>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
        <div className="row">
          <div className="col-xs-12">
            <div className="divider" />
          </div>
        </div>
        {catList && (
          <CatList
            location={location}
            language={currentLanguage}
            list={catList}
            heading={catListHeading}
          />
        )}
      </div>
      {tourList && (
        <TourList
          language={currentLanguage}
          list={tourList}
          heading={tourListHeading}
          tourCategoryData={tourCategoryData}
        />
      )}
      <Footer language={currentLanguage} />
    </div>
  </React.Fragment>
)

class GeneralPageTemplate extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    app.init()

    $(function() {
      $(window).on("scroll", function() {
        app.modifyHeader()
        app.fadeOverlay()
      })

      $(window).on("resize", function() {
        app.matchHeights($(".t-info"))
      })

      app.initGalleryShuffle("#gallery-shuffle")
    })
  }

  render() {
    const { location, data, pathContext } = this.props
    const { sitemetadata, tourCategoryData } = contentData[
      data.markdownRemark.frontmatter.language
    ]
    const defaultLanguage = "en"
    const currentLanguage =
      data.markdownRemark.frontmatter.language || defaultLanguage

    const main_category_id = data.markdownRemark.frontmatter.main_category_id

    const mainCategoryFound =
      main_category_id && tourCategoryData.find(c => c.id == main_category_id)

    if (mainCategoryFound) {
      var catListHeading = mainCategoryFound.sub_heading
      var catList = tourCategoryData
        .filter(
          t =>
            t.parent_id == main_category_id && t.status === "A" && t.rank >= 0
        )
        .sort((a, b) => a.rank - b.rank)

      var tourListHeading = mainCategoryFound.name
      var tourData = data.tours.edges.map(t => t.node.frontmatter)
      var tourList = tourData
        .filter(t => t.main_category_id == main_category_id)
        .sort((a, b) => a.rank - b.rank)
      console.log(JSON.stringify(tourList))
    }

    const props = {
      sitemetadata,
      currentLanguage,
      defaultLanguage,
      catListHeading,
      catList,
      tourListHeading,
      tourList,
      tourCategoryData
    }

    return (
      <React.Fragment>
        <Helmet title={pathContext.title} />
        <GeneralPage
          location={location}
          page={data.markdownRemark}
          data={data.markdownRemark.frontmatter}
          {...props}
        />
      </React.Fragment>
    )
  }
}

GeneralPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default GeneralPageTemplate

export const pageQuery = graphql`
  query TourCategoryById($id: String!, $language: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        language
        url
        imggrp_id
        main_category_id
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
