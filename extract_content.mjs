import fs from "fs"
import mkdirp from "mkdirp"
import TurndownService from "turndown"

import contentData from "./src/components/i18n-data"

import { languages, contentMap, tourMap, blogMap } from "./extract_content_map"

const turndownService = new TurndownService()

const regexSplitLongParagraph = /(.{1,80}[^\s]*)/gi

turndownService.addRule("paragraphLength", {
  filter: ["p"],
  replacement: function(text) {
    return (
      "\r\n" +
      text
        .match(regexSplitLongParagraph)
        .map(t => t.trim())
        .join("\r\n") +
      "\r\n"
    )
  }
})

function getPageData(
  cmap,
  {
    strings,
    general_pages,
    regionData,
    blog_category,
    blog_post,
    tourCategoryData
  }
) {
  if (cmap.content.module_id == 1)
    return general_pages.find(p => p.page_id == cmap.content.page_id)

  if (cmap.content.module_id == 36) {
    var data = regionData.find(r => r.id == cmap.content.page_id)

    return {
      page_heading: data.heading,
      country_id: data.country_id,
      imggrp_id: data.gallery_id
    }
  }

  if (cmap.content.module_id == 23) {
    const page = general_pages.find(p => p.page_id == cmap.content.page_id)
    var result = {
      page_heading: page.page_heading
    }
    if (cmap.blog && cmap.blog.category_id) {
      const current_blog_category = blog_category.find(
        b => b.id == cmap.blog.category_id
      )
      result = {
        page_heading: `${strings.category_archives}: ${
          current_blog_category.label
        }`
      }
      if (cmap.blog.post_id) {
        var current_blog_post = blog_post.find(p => p.id == cmap.blog.post_id)
        result = {
          page_heading: current_blog_post.name
        }
      }
    }
    return result
  }

  if (cmap.content.module_id == 100) {
    const tourListDetails = { sub_category_id: cmap.content.page_id }
    const subCategoryFound =
      tourListDetails.sub_category_id &&
      tourCategoryData.find(c => c.id == tourListDetails.sub_category_id)

    const mainCategoryFound =
      subCategoryFound &&
      tourCategoryData.find(c => c.id == subCategoryFound.parent_id)

    return {
      page_heading: subCategoryFound && subCategoryFound.heading,
      main_category_id: (mainCategoryFound && mainCategoryFound.id) || null,
      sub_category_id: subCategoryFound.id,
      imggrp_id: subCategoryFound.slideshow_id
    }
  }
}

////
// GENERAL PAGES
////
languages.forEach(language => {
  contentMap.forEach(cm => {
    const {
      general_pages,
      regionData,
      tourCategoryData,
      content,
      content_row,
      content_column,
      blog_category,
      blog_post,
      strings
    } = contentData[language]

    const page = getPageData(cm, {
      general_pages,
      tourCategoryData,
      regionData,
      blog_category,
      blog_post,
      strings
    })

    const content_index = content.find(
      c =>
        c.page_id == cm.content.page_id && c.module_id == cm.content.module_id
    )

    if (content_index) {
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
          key: "heading",
          value: page.page_heading
        }
      ]

      if (cm.subNav) {
        frontmatter.push({
          key: "subnav",
          value: "\r\n" + cm.subNav.map(n => `    - ${n}`).join("\r\n")
        })
      }

      if (page.country_id > 0) {
        frontmatter.push({
          key: "country_id",
          value: page.country_id
        })
      }

      if (page.imggrp_id > 0) {
        frontmatter.push({
          key: "imggrp_id",
          value: page.imggrp_id
        })
      }

      if (cm.template) {
        frontmatter.push({
          key: "template",
          value: cm.template
        })
      }

      if (cm.tourDetails) {
        frontmatter.push({
          key: "main_category_id",
          value: cm.tourDetails.main_category_id
        })
      }

      if (cm.content.module_id == 100) {
        if (page.main_category_id) {
          frontmatter.push({
            key: "main_category_id",
            value: page.main_category_id
          })
        }

        if (page.sub_category_id) {
          frontmatter.push({
            key: "sub_category_id",
            value: page.sub_category_id
          })
        }
      }

      var output = `---
${frontmatter.map(f => `${f.key}: ${f.value}`).join("\r\n")}
---
`
      output =
        output +
        rows
          .map(
            r => `<div class="row content-row"><!-- ${r.id} (${r.rank})-->
${r.columns
              .map(
                c => `<div class="${c.css_class}"><!-- ${c.id} -->

${turndownService.turndown(c.content)}

</div>
`
              )
              .join("\r\n")}
</div>
`
          )
          .join("\r\n")

      const targetDir = `./content/${cm.url}`
      mkdirp.sync(targetDir)

      const targetFile = `${targetDir}/index.${language}.md`
      fs.writeFileSync(targetFile, output)
    }
  })
})

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
${turndownService.turndown(data.long_description)}
`

    const targetDir = `./blog/${cm.url}`
    mkdirp.sync(targetDir)

    const targetFileBlogPost = `${targetDir}/index.${language}.md`

    fs.writeFileSync(targetFileBlogPost, outputBlog)
  })
})

////
// TOUR PAGES
////
const fullUrl = (tourCategoryData, main_category_id, sub_category_id, url) => {
  var main_category = tourCategoryData.find(c => c.id == main_category_id)
  var sub_category = tourCategoryData.find(c => c.id == sub_category_id)

  if (main_category && sub_category)
    return `${main_category.url}/${sub_category.url}/${url}`

  if (main_category) return `${main_category.url}/${url}`

  return null
}

languages.forEach(language => {
  tourMap.forEach(cm => {
    const { tourCategoryData, tourData } = contentData[language]

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
    }

    frontmatter.push({
      key: "tour_id",
      value: data.id
    })

    frontmatter.push({
      key: "heading",
      value: data.heading
    })

    frontmatter.push({
      key: "short_descr",
      value: data.short_descr
    })

    frontmatter.push({
      key: "price_from",
      value: data.price_from
    })

    frontmatter.push({
      key: "duration",
      value: data.duration
    })

    if (data.country_id) {
      frontmatter.push({
        key: "country_id",
        value: data.country_id
      })
    }

    if (data.is_featured) {
      frontmatter.push({
        key: "is_featured",
        value: true
      })
    }

    if (data.main_category_id) {
      frontmatter.push({
        key: "main_category_id",
        value: data.main_category_id
      })
    }

    if (data.sub_category_id) {
      frontmatter.push({
        key: "sub_category_id",
        value: data.sub_category_id
      })
    }

    if (data.slideshow_id) {
      frontmatter.push({
        key: "gallery_id",
        value: data.gallery_id
      })
    }

    if (data.slideshow_id) {
      frontmatter.push({
        key: "imggrp_id",
        value: data.slideshow_id
      })
    }

    if (data.itinerary) {
      frontmatter.push({
        key: "itinerary",
        value: `./itinerary.${language}.md`
      })
    }

    if (data.inclusions) {
      frontmatter.push({
        key: "inclusions",
        value: `./inclusions.${language}.md`
      })
    }

    var output = `---
${frontmatter.map(f => `${f.key}: ${f.value}`).join("\r\n")}
---
`
    var outputOverview = `${output}${turndownService.turndown(data.long_descr)}`
    var outputItinerary = `---
tour_id: ${data.id}
template: "tour_itinerary"
---
${turndownService.turndown(data.itinerary)}`
    var outputInclusions = `---
tour_id: ${data.id}
template: "tour_inclusions"
---
${turndownService.turndown(data.inclusions)}`

    const targetDir = `./tour/${cm.url}`
    mkdirp.sync(targetDir)

    const targetFileOverview = `${targetDir}/index.${language}.md`
    const targetFileItinerary = `${targetDir}/itinerary.${language}.md`
    const targetFileInclusions = `${targetDir}/inclusions.${language}.md`

    fs.writeFileSync(targetFileOverview, outputOverview)
    fs.writeFileSync(targetFileItinerary, outputItinerary)
    fs.writeFileSync(targetFileInclusions, outputInclusions)
  })
})
