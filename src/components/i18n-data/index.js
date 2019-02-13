import _ from "lodash"

import sitemetadata from "../../../data/json/common/sitemetadata.json"

import general_pages_en from "../../../data/json/en/page/general.json"
import general_pages_zh from "../../../data/json/zh/page/general.json"

import homeOverlayData_en from "../../../data/json/en/general/home-overlay.json"
import homeOverlayData_zh from "../../../data/json/zh/general/home-overlay.json"

import imagesGroups_en from "../../../data/json/en/images/groups.json"
import imagesGroups_zh from "../../../data/json/zh/images/groups.json"

import imagesSlides_en from "../../../data/json/en/images/slides.json"
import imagesSlides_zh from "../../../data/json/zh/images/slides.json"

import countryHighlights_en from "../../../data/json/en/country/highlights.json"
import countryHighlights_zh from "../../../data/json/zh/country/highlights.json"

import contentPageData from "../../../data/json/common/content/content.json"
import contentRowData from "../../../data/json/common/content/row.json"

import content_column_en from "../../../data/json/en/content/column.json"
import content_column_zh from "../../../data/json/zh/content/column.json"

import contact_data_en from "../../../data/json/en/contact/contact.json"
import contact_data_zh from "../../../data/json/zh/contact/contact.json"

import strings_en from "../../../data/json/en/strings.json"
import strings_zh from "../../../data/json/zh/strings.json"

const getSlideshowData = (imagesSlides, groupId) => {
  return imagesSlides
    .filter(f => f.imggrp_id == groupId)
    .sort((a, b) => a.imgslide_rank - b.imgslide_rank)
}

const findInTree = (id, tree) => {
  if (tree.path === id) {
    let path = [tree.path]
    return { result: tree, path }
  } else {
    if (tree.pages) {
      for (let child of tree.pages) {
        let tmp = findInTree(id, child)
        if (tmp && !_.isEmpty(tmp)) {
          tmp.path.unshift(tree.path)
          return tmp
        }
      }
    }
    return null
  }
}

const contentData = {
  en: {
    sitemetadata: sitemetadata,
    content: contentPageData,
    content_row: contentRowData,
    content_column: content_column_en,
    general_pages: general_pages_en,
    homeOverlayData: homeOverlayData_en,
    imagesGroups: imagesGroups_en,
    imagesSlides: imagesSlides_en,
    countryHighlights: countryHighlights_en,
    contact_data: contact_data_en,
    strings: strings_en
  },
  zh: {
    sitemetadata: sitemetadata,
    content: contentPageData,
    content_row: contentRowData,
    content_column: content_column_zh,
    general_pages: general_pages_zh,
    homeOverlayData: homeOverlayData_zh,
    imagesGroups: imagesGroups_zh,
    imagesSlides: imagesSlides_zh,
    countryHighlights: countryHighlights_zh,
    contact_data: contact_data_zh,
    strings: strings_zh
  }
}

const GeneralPageData = ({ pageId, moduleId, language, children }) => {
  const { general_pages } = contentData[language]

  var page = general_pages.find(p => p.page_id == pageId)

  return children({ data: page })
}

export { findInTree, getSlideshowData, contentData, GeneralPageData }
