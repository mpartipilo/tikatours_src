import fs from "fs"
import mkdirp from "mkdirp"
import yaml from "yaml"

import contentData from "./i18-data"

import { languages, contentMap, tourMap, blogMap } from "./extract_content_map"
import turndown from "./process_common"

languages.forEach(language => {
  // General pages, tour categories and tour subcategories
  contentMap.forEach(cm => {
    const frontmatter = getFrontMatter(language, cm, contentData[language])

    Object.keys(frontmatter).forEach(
      key => frontmatter[key] == null && delete frontmatter[key]
    )

    const content = getPageContent(cm, contentData[language])

    if (frontmatter.template === "temp") {
      return
    }

    const output = "---\n" + yaml.stringify(frontmatter) + "---\n" + content

    const url = cm.url || "homepage"
    const template = cm.template || "pages"
    const targetDir = `./extracted/content/${template}/${url}`
    mkdirp.sync(targetDir)

    const targetFile = `${targetDir}/index.${language}.md`
    fs.writeFileSync(targetFile, output)
  })

  // Tours
  tourMap.forEach(cm => {
    const { tourCategoryData, tourData } = contentData[language]
    const data = tourData.find(t => {
      const tourUrl = fullUrl(
        tourCategoryData,
        t.main_category_id,
        t.sub_category_id,
        t.url
      )
      return tourUrl === cm.url
    })

    if (!data) {
      console.log(`No data found for url ${cm.url}`)
      process.exit(1)
    }

    const frontmatter = getFrontMatter(language, cm, data)

    Object.keys(frontmatter).forEach(
      key => frontmatter[key] == null && delete frontmatter[key]
    )

    const content = getTourContent(cm, data)

    const frontmatterItinerary = {
      language: language,
      template: "tour_itinerary",
      tour_id: +data.id
    }

    const frontmatterInclusions = {
      language: language,
      template: "tour_inclusions",
      tour_id: +data.id
    }

    const outputOverview =
      "---\n" + yaml.stringify(frontmatter) + "---\n" + content.overview
    const outputItinerary =
      "---\n" +
      yaml.stringify(frontmatterItinerary) +
      "---\n" +
      content.itinerary
    const outputInclusions =
      "---\n" +
      yaml.stringify(frontmatterInclusions) +
      "---\n" +
      content.inclusions

    const targetDir = `./extracted/content/${cm.template}/${cm.url}`
    mkdirp.sync(targetDir)

    const targetFileOverview = `${targetDir}/index.${language}.md`
    const targetFileItinerary = `${targetDir}/itinerary.${language}.md`
    const targetFileInclusions = `${targetDir}/inclusions.${language}.md`

    fs.writeFileSync(targetFileOverview, outputOverview)
    fs.writeFileSync(targetFileItinerary, outputItinerary)
    fs.writeFileSync(targetFileInclusions, outputInclusions)
  })
})

function getFrontMatterGeneralPage(language, map, { general_pages }) {
  const data = general_pages.find(p => p.page_id == map.content.page_id)

  var result = {
    heading: data.page_heading,
    title: data.page_title
  }

  if (data.country_id != 0) {
    result.country_id = +data.country_id
  }

  if (data.imggrp_id != 0) {
    result.imggrp_id = +data.imggrp_id
  }

  if (data.page_rank != 0) {
    result.rank = +data.page_rank
  }

  return result
}

function getFrontMatterRegions(language, map, contentData) {
  if (map.content.module_id == 1) {
    return getFrontMatterGeneralPage(language, map, contentData)
  }

  const { regionData } = contentData
  var data = regionData.find(r => r.id == map.content.page_id)

  return (({
    heading,
    title,
    country_id,
    slideshow_id,
    gallery_id,
    name,
    rank,
    short_descr,
    latitude,
    longitude,
    formatted_address,
    image_path
  }) => ({
    heading,
    title,
    country_id: +country_id,
    imggrp_id: +slideshow_id,
    gallery_id: +gallery_id,
    name,
    rank: +rank,
    short_descr,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    formatted_address,
    image_path
  }))(data)
}

function getFrontMatterTourCategory(language, map, data) {
  const pageFrontMatter = getFrontMatterGeneralPage(language, map, data)

  const { tourCategoryData } = data

  const mainCategoryFound = tourCategoryData.find(
    c => c.id == map.tourDetails.main_category_id
  )

  return {
    ...pageFrontMatter,
    name: mainCategoryFound.name,
    image_path: mainCategoryFound.image_path,
    main_category_id: map.tourDetails.main_category_id,
    sub_heading: mainCategoryFound.sub_heading
  }
}

function getFrontMatterTourSubCategory(language, map, { tourCategoryData }) {
  const tourListDetails = { sub_category_id: map.content.page_id }

  const subCategoryFound = tourCategoryData.find(
    c => c.id == tourListDetails.sub_category_id
  )

  const mainCategoryFound =
    subCategoryFound &&
    tourCategoryData.find(c => c.id == subCategoryFound.parent_id)

  return {
    heading: subCategoryFound.heading,
    title: subCategoryFound.title,
    name: subCategoryFound.name,
    image_path: subCategoryFound.image_path,
    imggrp_id: +subCategoryFound.slideshow_id,
    main_category_id: (mainCategoryFound && +mainCategoryFound.id) || null,
    sub_category_id: +subCategoryFound.id,
    rank: +subCategoryFound.rank
  }
}

function getFrontMatterTour(language, map, tour) {
  return {
    itinerary: `./itinerary.${language}.md`,
    inclusions: `./inclusions.${language}.md`,
    tour_id: +tour.id,
    rank: +tour.rank,
    price_from: +tour.price_from,
    image_path: tour.image_path,
    country_id: +tour.country_id,
    is_featured: tour.is_featured == "1" ? true : null,
    main_category_id: +tour.main_category_id,
    sub_category_id: +tour.sub_category_id,
    gallery_id: +tour.gallery_id,
    imggrp_id: +tour.slideshow_id,
    heading: tour.heading,
    name: tour.name,
    title: tour.title,
    short_descr: tour.short_descr,
    duration: tour.duration
  }
}

function getFrontMatter(language, map, contentData) {
  const templates = {
    gallery: getFrontMatterGeneralPage,
    regions: getFrontMatterRegions,
    tourcategory: getFrontMatterTourCategory,
    toursubcategory: getFrontMatterTourSubCategory,
    tour: getFrontMatterTour
  }

  const frontmatterExtractor =
    templates[map.template] || getFrontMatterGeneralPage

  if (!templates[map.template]) {
    return {
      template: "temp"
    }
  }

  var commonProps = {
    language,
    url: map.url
  }

  if (map.template) {
    commonProps.template = map.template
  }

  return {
    ...commonProps,
    ...frontmatterExtractor(language, map, contentData)
  }
}

function getPageContent(map, { content, content_row, content_column }) {
  const content_index = content.find(
    c =>
      c.page_id == map.content.page_id && c.module_id == map.content.module_id
  )

  const rows = content_row
    .filter(row => row.content_id == content_index.id)
    .sort((a, b) => parseInt(a.rank, 10) - parseInt(b.rank, 10))
    .map(r => ({
      id: r.id,
      rank: r.rank,
      columns: content_column
        .filter(c => c.content_row_id == r.id)
        .sort((a, b) => parseInt(a.rank, 10) - parseInt(b.rank, 10))
        .map(c => ({
          id: c.id,
          content: c.content,
          css_class: c.css_class
        }))
    }))

  return rows
    .map(
      r => `<div class="row content-row"><!-- ${r.id} (${r.rank})-->
${r.columns
        .map(
          c => `<div class="${c.css_class}"><!-- ${c.id} -->

${turndown.turndown(c.content)}

</div>
`
        )
        .join("\r\n")}
</div>
`
    )
    .join("\r\n")
}

function getTourContent(map, tourData) {
  return {
    overview: turndown.turndown(tourData.long_descr),
    itinerary: turndown.turndown(tourData.itinerary),
    inclusions: turndown.turndown(tourData.inclusions)
  }
}

function fullUrl(tourCategoryData, main_category_id, sub_category_id, url) {
  var main_category = tourCategoryData.find(c => c.id == main_category_id)
  var sub_category = tourCategoryData.find(c => c.id == sub_category_id)

  if (main_category && sub_category)
    return `${main_category.url}/${sub_category.url}/${url}`

  if (main_category) return `${main_category.url}/${url}`

  return null
}

process.exit()

////
// BLOG PAGES
////
languages.forEach(language => {
  blogMap.forEach(cm => {
    const { blog_post, blog_category } = contentData[language]

    const frontmatter = [
      {
        key: "language",
        value: language
      },
      {
        key: "url",
        value: cm.url
      },
      {
        key: "template",
        value: cm.template
      }
    ]

    const data = blog_post
      .sort((a, b) => b.date_posted.localeCompare(a.date_posted))
      .reduce((result, post) => {
        const category = blog_category.find(c => c.id == post.category_id)
        return result.concat([
          {
            ...post,
            category,
            post_url: `blog/${category.url}/${post.url}`
          }
        ])
      }, [])
      .find(p => p.post_url == cm.url)

    if (!data) {
      console.log(`No data found for url ${cm.url}`)
    }

    frontmatter.push({
      key: "post_id",
      value: data.id
    })

    frontmatter.push({
      key: "title",
      value: data.title
    })

    frontmatter.push({
      key: "name",
      value: data.name
    })

    frontmatter.push({
      key: "category_id",
      value: data.category_id
    })

    var outputBlog = `---
${frontmatter.map(f => `${f.key}: ${f.value}`).join("\r\n")}
---
${turndown.turndown(data.long_description)}
`

    const targetDir = `./extracted/${cm.url}`
    mkdirp.sync(targetDir)

    const targetFileBlogPost = `${targetDir}/index.${language}.md`

    fs.writeFileSync(targetFileBlogPost, outputBlog)
  })
})
