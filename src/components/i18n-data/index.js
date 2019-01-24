import sitemetadata from "../../../data/json/common/sitemetadata.json"

import blog_category_en from "../../../data/json/en/blog/category.json"
import blog_category_zh from "../../../data/json/zh/blog/category.json"

import blog_post_en from "../../../data/json/en/blog/blog_post.json"
import blog_post_zh from "../../../data/json/zh/blog/blog_post.json"

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

import navigation_en from "../../../data/json/en/navigation/navigation.json"
import navigation_zh from "../../../data/json/zh/navigation/navigation.json"

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
    .sort((a, b) => a.rank - b.rank)
    .sort((a, b) => a.imgslide_rank - b.imgslide_rank)
}

const contentData = {
  en: {
    sitemetadata: sitemetadata,
    content: contentPageData,
    content_row: contentRowData,
    blog_category: blog_category_en,
    blog_post: blog_post_en,
    content_column: content_column_en,
    navigation: navigation_en,
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
    blog_category: blog_category_zh,
    blog_post: blog_post_zh,
    content_column: content_column_zh,
    navigation: navigation_zh,
    general_pages: general_pages_zh,
    homeOverlayData: homeOverlayData_zh,
    imagesGroups: imagesGroups_zh,
    imagesSlides: imagesSlides_zh,
    countryHighlights: countryHighlights_zh,
    contact_data: contact_data_zh,
    strings: strings_zh
  }
}

export { getSlideshowData, contentData }
