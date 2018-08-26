import sitemetadata from "../../../data/common/sitemetadata.json"

import imagesGroups from "../../../data/common/content/images_groups.json"

import blog_category_en from "../../../data/en/blog/category.json"
import blog_category_zh from "../../../data/zh/blog/category.json"

import blog_post_en from "../../../data/en/blog/blog_post.json"
import blog_post_zh from "../../../data/zh/blog/blog_post.json"

import general_pages_en from "../../../data/en/page/general.json"
import general_pages_zh from "../../../data/zh/page/general.json"

import tourData_en from "../../../data/en/tour/tour.json"
import tourData_zh from "../../../data/zh/tour/tour.json"

import tourCategoryData_en from "../../../data/en/tourcategory/category.json"
import tourCategoryData_zh from "../../../data/zh/tourcategory/category.json"

import homeOverlayData_en from "../../../data/en/general/home-overlay.json"
import homeOverlayData_zh from "../../../data/zh/general/home-overlay.json"

import imagesSlides_en from "../../../data/en/images/slides.json"
import imagesSlides_zh from "../../../data/zh/images/slides.json"

import countryHighlights_en from "../../../data/en/country/highlights.json"
import countryHighlights_zh from "../../../data/zh/country/highlights.json"

import regionData_en from "../../../data/en/region/region.json"
import regionData_zh from "../../../data/zh/region/region.json"

import navigation_en from "../../../data/en/navigation/navigation.json"
import navigation_zh from "../../../data/zh/navigation/navigation.json"

import contentData from "../../../data/common/content/content.json"
import contentRowData from "../../../data/common/content/row.json"

import content_column_en from "../../../data/en/content/column.json"
import content_column_zh from "../../../data/zh/content/column.json"

import contact_data_en from "../../../data/en/contact/contact.json"
import contact_data_zh from "../../../data/zh/contact/contact.json"

import strings_en from "../../../data/en/strings.json"
import strings_zh from "../../../data/zh/strings.json"

export default {
  en: {
    imagesGroups: imagesGroups,
    sitemetadata: sitemetadata,
    content: contentData,
    content_row: contentRowData,
    blog_category: blog_category_en,
    blog_post: blog_post_en,
    content_column: content_column_en,
    navigation: navigation_en,
    general_pages: general_pages_en,
    tourData: tourData_en,
    tourCategoryData: tourCategoryData_en,
    homeOverlayData: homeOverlayData_en,
    imagesSlides: imagesSlides_en,
    countryHighlights: countryHighlights_en,
    regionData: regionData_en,
    contact_data: contact_data_en,
    strings: strings_en
  },
  zh: {
    imagesGroups: imagesGroups,
    sitemetadata: sitemetadata,
    content: contentData,
    content_row: contentRowData,
    blog_category: blog_category_zh,
    blog_post: blog_post_zh,
    content_column: content_column_zh,
    navigation: navigation_zh,
    general_pages: general_pages_zh,
    tourData: tourData_zh,
    tourCategoryData: tourCategoryData_zh,
    homeOverlayData: homeOverlayData_zh,
    imagesSlides: imagesSlides_zh,
    countryHighlights: countryHighlights_zh,
    regionData: regionData_zh,
    contact_data: contact_data_zh,
    strings: strings_zh
  }
}
