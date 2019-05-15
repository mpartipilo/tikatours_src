import React from "react"
import PropTypes from "prop-types"
import path from "path"
import { graphql } from "gatsby"

import { NewLayout } from "../components/layout"
import SubNav from "../components/sub-nav"
import Gallery from "../components/gallery"

import { allImagesSlides, getSlideshowData } from "../components/i18n-data"

const RegionPage = ({
  html,
  subnav,
  regionGalleryPhotos,
  regionGalleryHeading
}) => (
  <React.Fragment>
    {subnav && <SubNav {...subnav} />}
    <div className="content">
      <span dangerouslySetInnerHTML={{ __html: html }} />
      <div className="row">
        {regionGalleryPhotos && (
          <Gallery
            heading={regionGalleryHeading}
            photos={regionGalleryPhotos}
          />
        )}
      </div>
    </div>
  </React.Fragment>
)

const RegionPageTemplate = ({ location, data, pathContext }) => {
  const {
    language,
    strings,
    sitemetadata,
    navigation,
    languages,
    title
  } = pathContext

  if (!language) {
    console.log(`language not set on ${location.pathname}`)
  }

  const { contact_data, markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { heading, gallery_id, name } = frontmatter

  const { imagesSlides } = allImagesSlides[language]
  var imgGroup = data.markdownRemark.frontmatter.imggrp_id
  const slides = getSlideshowData(imagesSlides, imgGroup)

  const regionData = data.regions.edges.map(e => e.node.frontmatter)
  var subnav = {
    list: regionData
      .filter(t => t.country_id == data.markdownRemark.frontmatter.country_id)
      .sort((a, b) => a.rank - b.rank)
      .map(r => {
        const full_url = `/${language}/${r.url}`
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

  var regionGallery = gallery_id
  const thumbPath = `/thumbs/galleries/g${regionGallery}/`
  var regionGalleryHeading = name + strings["_Gallery"]
  var regionGalleryPhotos = imagesSlides
    .filter(i => i.imggrp_id == regionGallery)
    .map(i => ({
      ...i,
      srcThumb: thumbPath + path.basename(i.imgslide_path)
    }))
    .sort((l, r) => {
      return l.imgslide_rank - r.imgslide_rank
    })

  const regionPageProps = {
    html,
    subnav,
    regionGalleryPhotos,
    regionGalleryHeading
  }

  const layoutProps = {
    location: location.pathname,
    strings,
    title,
    languages,
    language,
    sitemetadata,
    navigation,
    slides,
    fixed: false,
    heading,
    breadcrumbTrail: null,
    mainContent: <RegionPage {...regionPageProps} />,
    postContent: null,
    contact_data
  }

  return <NewLayout {...layoutProps} />
}

RegionPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  pathContext: PropTypes.object
}

export default RegionPageTemplate

export const pageQuery = graphql`
  query RegionPageById($id: String!, $language: String!) {
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
