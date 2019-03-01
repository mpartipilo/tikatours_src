import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import path from "path"
import md5 from "md5"

import { Layout } from "../components/layout"
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
      </div>
      <GalleryIndex
        groups={galleryGroups}
        photos={galleryIndexPhotos}
        currentLanguage={currentLanguage}
      />
    </div>
  </React.Fragment>
)

const GalleryPageTemplate = ({ location, data, pathContext }) => {
  const { sitemetadata } = data
  const defaultLanguage = "en"
  const currentLanguage =
    data.markdownRemark.frontmatter.language || defaultLanguage
  const { imagesSlides, imagesGroups } = contentData[currentLanguage]

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
    </Layout>
  )
}

GalleryPageTemplate.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired,
  data: PropTypes.object
}

export default GalleryPageTemplate

export const pageQuery = graphql`
  query GalleryPageById($id: String!, $language: String!) {
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
        language
        url
      }
    }
  }
`
