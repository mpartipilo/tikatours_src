import sitemetadata from "./json/common/sitemetadata.json"

//import imagesGroups from "./json/common/content/images_groups.json"

import general_pages_en from "./json/en/page/general.json"
import general_pages_zh from "./json/zh/page/general.json"

import tourData_en from "./json/en/tour/tour.json"
import tourData_zh from "./json/zh/tour/tour.json"

import tourCategoryData_en from "./json/en/tourcategory/category.json"
import tourCategoryData_zh from "./json/zh/tourcategory/category.json"

import homeOverlayData_en from "./json/en/general/home-overlay.json"
import homeOverlayData_zh from "./json/zh/general/home-overlay.json"

import imagesSlides_en from "./json/en/images/slides.json"
import imagesSlides_zh from "./json/zh/images/slides.json"

import countryHighlights_en from "./json/en/country/highlights.json"
import countryHighlights_zh from "./json/zh/country/highlights.json"

import regionData_en from "./json/en/region/region.json"
import regionData_zh from "./json/zh/region/region.json"

import navigation_en from "./json/en/navigation/navigation.json"
import navigation_zh from "./json/zh/navigation/navigation.json"

import contentData from "./json/common/content/content.json"
import contentRowData from "./json/common/content/row.json"

import content_column_en from "./json/en/content/column.json"
import content_column_zh from "./json/zh/content/column.json"

import contact_data_en from "./json/en/contact/contact.json"
import contact_data_zh from "./json/zh/contact/contact.json"

import strings_en from "./json/en/strings.json"
import strings_zh from "./json/zh/strings.json"

export default {
  en: {
    imagesGroups: [],
    sitemetadata: sitemetadata,
    content: contentData,
    content_row: contentRowData,
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
    imagesGroups: [],
    sitemetadata: sitemetadata,
    content: contentData,
    content_row: contentRowData,
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
