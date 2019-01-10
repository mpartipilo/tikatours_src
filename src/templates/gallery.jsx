/* global app, $ */
import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import path from "path"
import md5 from "md5"

import Header from "../components/header"
import Footer from "../components/footer"
import GalleryIndex from "../components/gallery-index"

import { contentData } from "../components/i18n-data"

const GalleryPage = ({
  location,
  page,
  data,
  sitemetadata,
  currentLanguage,
  languages,
  galleryGroups,
  galleryIndexPhotos
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
      </div>
      <GalleryIndex groups={galleryGroups} photos={galleryIndexPhotos} />
      <Footer language={currentLanguage} />
    </div>
  </React.Fragment>
)

class GalleryPageTemplate extends React.Component {
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

    const { sitemetadata, imagesSlides, imagesGroups } = contentData[
      data.markdownRemark.frontmatter.language
    ]
    const defaultLanguage = "en"
    const currentLanguage =
      data.markdownRemark.frontmatter.language || defaultLanguage

    const galleryGroups = imagesGroups
      .filter(f => f.is_gallery == 1 && f.add_to_gallery_index == 1)
      .map(g => ({
        ...g,
        gallery_id: md5(g.imggrp_id)
      }))

    var galleryIndexPhotos = imagesSlides
      .filter(f => galleryGroups.find(g => g.imggrp_id == f.imggrp_id))
      .sort((a, b) => a.imgslide_rank - b.imgslide_rank)
      .map(p => ({
        ...p,
        gallery_id: md5(p.imggrp_id),
        srcThumb: `/thumbs/galleries/g${p.imggrp_id}/${path.basename(
          p.imgslide_path
        )}`
      }))

    return (
      <GalleryPage
        location={location}
        page={data.markdownRemark}
        data={data.markdownRemark.frontmatter}
        sitemetadata={sitemetadata}
        currentLanguage={currentLanguage}
        languages={pathContext.languages}
        galleryGroups={galleryGroups}
        galleryIndexPhotos={galleryIndexPhotos}
      />
    )
  }
}

GalleryPageTemplate.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired,
  data: PropTypes.object
}

export default GalleryPageTemplate

export const pageQuery = graphql`
  query GalleryPageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        heading
        language
        url
      }
    }
  }
`
