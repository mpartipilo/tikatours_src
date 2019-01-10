import sitemetadata from "../../../data/json/common/sitemetadata.json"

import imagesGroups from "../../../data/json/common/content/images_groups.json"

import blog_category_en from "../../../data/json/en/blog/category.json"
import blog_category_zh from "../../../data/json/zh/blog/category.json"

import blog_post_en from "../../../data/json/en/blog/blog_post.json"
import blog_post_zh from "../../../data/json/zh/blog/blog_post.json"

import general_pages_en from "../../../data/json/en/page/general.json"
import general_pages_zh from "../../../data/json/zh/page/general.json"

import homeOverlayData_en from "../../../data/json/en/general/home-overlay.json"
import homeOverlayData_zh from "../../../data/json/zh/general/home-overlay.json"

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

function createSlide(m) {
  var src = m.imgslide_path
  var cap = m.imgslide_caption
  var cap_heading = m.caption_heading
  //var alt = m.imgslide_alt
  var button = m.button_label
  var button_url = m.button_url
  var youtube_id = m.youtube_id
  var id = m.imgslide_id

  var button_view = ""

  if (button && button_url) {
    button_view = `<div><a class="btn" href="${button_url}">${button}</a></div>`
  }

  var video_button = ""
  var video_html = ""
  if (youtube_id) {
    video_button = `<div><a href="#" data-href="#slide-${id}" class="btn video-link"><i class="fa fa-youtube-play"></i>watch video</a></div>`
    video_html = `<div class="video-wrap" id="slide-${id}"><span>loading video...</span><div class="text-right"><i class="fa fa-times"></i></div><iframe width="100%" height="95%" data-src="https://www.youtube.com/embed/${youtube_id}?rel=0&autoplay=1&showinfo=1" frameborder="0" allowfullscreen></iframe></div>`
  }

  var capHTML = ""
  if (cap_heading) {
    if (youtube_id) {
      capHTML = `<span>${cap_heading}</span><span class="caption">${cap}</span>${video_button}`
    } else {
      capHTML = `<span>${cap_heading}</span><span class="caption">${cap}</span>${button_view}`
    }
  }

  return {
    slide: { image: src, title: capHTML },
    video_html
  }
}

const getSlideshowData = (imagesSlides, groupId) => {
  var slides = imagesSlides
    .filter(f => f.imggrp_id == groupId)
    .sort((a, b) => a.rank - b.rank)

  var slideData = slides.map(createSlide)

  return {
    slides: slideData.map(s => s.slide),
    videos_html: slideData.map(s => s.video_html).join("\r\n")
  }
}

const contentData = {
  en: {
    imagesGroups: imagesGroups,
    sitemetadata: sitemetadata,
    content: contentPageData,
    content_row: contentRowData,
    blog_category: blog_category_en,
    blog_post: blog_post_en,
    content_column: content_column_en,
    navigation: navigation_en,
    general_pages: general_pages_en,
    homeOverlayData: homeOverlayData_en,
    imagesSlides: imagesSlides_en,
    countryHighlights: countryHighlights_en,
    contact_data: contact_data_en,
    strings: strings_en
  },
  zh: {
    imagesGroups: imagesGroups,
    sitemetadata: sitemetadata,
    content: contentPageData,
    content_row: contentRowData,
    blog_category: blog_category_zh,
    blog_post: blog_post_zh,
    content_column: content_column_zh,
    navigation: navigation_zh,
    general_pages: general_pages_zh,
    homeOverlayData: homeOverlayData_zh,
    imagesSlides: imagesSlides_zh,
    countryHighlights: countryHighlights_zh,
    contact_data: contact_data_zh,
    strings: strings_zh
  }
}

export { getSlideshowData, contentData }
