/* global app, $ */
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import path from "path"
import { graphql } from "gatsby"

import Header from "../components/header"
import Footer from "../components/footer"
import Slideshow from "../components/slideshow"
import SubNav from "../components/sub-nav"
import Gallery from "../components/gallery"

import { contentData, getSlideshowData } from "../components/i18n-data"

const RegionPage = ({
  location,
  page,
  data,
  sitemetadata,
  currentLanguage,
  languages,
  slideshowData,
  subnav,
  regionGalleryPhotos,
  regionGalleryHeading
}) => (
  <React.Fragment>
    <Header
      location={location.pathname}
      siteTitle={sitemetadata.title}
      languages={languages}
      currentLanguage={currentLanguage}
      contact={sitemetadata.contact}
    />
    <div className="push" />
    {slideshowData &&
      slideshowData.length > 0 && (
        <Slideshow fixed={false} slides={slideshowData} />
      )}
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>{data.heading}</h1>
          </div>
        </div>
        {subnav && <SubNav {...subnav} />}
        <div className="content">
          <span dangerouslySetInnerHTML={{ __html: page.html }} />
          <div className="row">
            {regionGalleryPhotos && (
              <Gallery
                heading={regionGalleryHeading}
                photos={regionGalleryPhotos}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="divider" />
          </div>
        </div>
      </div>
      <Footer language={currentLanguage} />
    </div>
  </React.Fragment>
)

class RegionPageTemplate extends React.Component {
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

    const currentLanguage = pathContext.language
    const { sitemetadata, imagesSlides, strings } = contentData[currentLanguage]

    var imgGroup = data.markdownRemark.frontmatter.imggrp_id

    const { slides, videos_html } = getSlideshowData(imagesSlides, imgGroup)

    const regionData = data.regions.edges.map(e => e.node.frontmatter)
    var subNav = {
      list: regionData
        .filter(t => t.country_id == data.markdownRemark.frontmatter.country_id)
        .sort((a, b) => a.rank - b.rank)
        .map(r => {
          const full_url = `/${currentLanguage}/${r.url}`
          return {
            id: r.name,
            active: location.pathname.replace(/\/?$/i, "") === full_url,
            full_url,
            label: r.name,
            title: r.name,
            ...r
          }
        })
    }

    const subnavData = data.markdownRemark.frontmatter

    var regionGallery = subnavData.gallery_id
    const thumbPath = `/thumbs/galleries/g${regionGallery}/`
    var regionGalleryHeading = subnavData.name + strings[" Gallery"]
    var regionGalleryPhotos = imagesSlides
      .filter(i => i.imggrp_id == regionGallery)
      .map(i => ({
        ...i,
        srcThumb: thumbPath + path.basename(i.imgslide_path)
      }))
      .sort((l, r) => {
        return l.imgslide_rank - r.imgslide_rank
      })

    return (
      <React.Fragment>
        <Helmet title={pathContext.title || sitemetadata.title} />{" "}
        <RegionPage
          location={location}
          page={data.markdownRemark}
          data={data.markdownRemark.frontmatter}
          sitemetadata={sitemetadata}
          currentLanguage={currentLanguage}
          languages={pathContext.languages}
          slideshowData={slides}
          subnav={subNav}
          subnavData={subnavData}
          regionGalleryPhotos={regionGalleryPhotos}
          regionGalleryHeading={regionGalleryHeading}
        />
      </React.Fragment>
    )
  }
}

RegionPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default RegionPageTemplate

export const pageQuery = graphql`
  query RegionPageById($id: String!, $language: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        language
        url
        imggrp_id
        gallery_id
        country_id
        name
      }
    }

    regions: allMarkdownRemarkRegion(
      filter: {
        frontmatter: {
          template: { eq: "regions" }
          language: { eq: $language }
          name: { ne: null }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            language
            url
            heading
            country_id
            template
            imggrp_id
            gallery_id
            name
            rank
          }
        }
      }
    }
  }
`
