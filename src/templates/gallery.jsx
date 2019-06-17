import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import path from "path"
import md5 from "md5"

import { NewLayout } from "../components/layout"
import GalleryIndex from "../components/gallery-index"

import { allImagesSlides, allImagesGroups } from "../components/i18n-data"

const GalleryPageTemplate = ({ location, pathContext, data }) => {
  const {
    language,
    strings,
    sitemetadata,
    contact_data,
    navigation,
    languages,
    title
  } = pathContext

  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }

  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { heading } = frontmatter

  const { imagesGroups } = allImagesGroups[language]
  const { imagesSlides } = allImagesSlides[language]

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
    breadcrumbTrail: null,
    mainContent: (
      <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
    ),
    postContent: (
      <GalleryIndex
        groups={galleryGroups}
        photos={galleryIndexPhotos}
        strings={strings}
      />
    ),
    contact_data
  }

  return <NewLayout {...layoutProps} />
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
