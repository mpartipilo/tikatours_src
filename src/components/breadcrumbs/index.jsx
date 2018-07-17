import React from "react"

import tourData_en from "../../../data/tour_en.json"
import tourData_zh from "../../../data/tour_zh.json"

import tourCategoryData_en from "../../../data/tour_category_en.json"
import tourCategoryData_zh from "../../../data/tour_category_zh.json"

import navigation_en from "../../../data/navigation_en.json"
import navigation_zh from "../../../data/navigation_zh.json"

const Breadcrumbs = props => (
  <div className="row hidden-xs">
    <div className="col-xs-12">
      <ul className="breadcrumbs text-center">
        <li>
          <a href={"/" + props.language} title="home" />
        </li>
        {props.trail.filter(t => t.path != "/").map(t => (
          <li key={t.path}>
            <i className="fa fa-angle-right" />
            <a
              href={t.path}
              className={t.path == props.location ? "active" : null}
              title={t.page_title}
            >
              {t.page_title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

function flatten(data, results, parent) {
  results[data.path] = {
    path: data.path,
    page_title: data.title,
    parent_path: parent ? parent.path : null
  }

  if (!data.hasOwnProperty("pages")) {
    return
  }

  data.pages.forEach(page => flatten(page, results, data))
}

const BreadcrumbsNavigation = props => {
  var flatNav = {}

  var navigation = props.language === "zh" ? navigation_zh : navigation_en

  flatten(navigation, flatNav, undefined)
  var trail = []
  var currentNode = flatNav[props.page.replace(/\/?$/i, "")]
  trail.push(currentNode)
  while (currentNode.parent_path) {
    currentNode = flatNav[currentNode.parent_path]
    trail.push(currentNode)
  }

  trail = trail.reverse()

  return (
    <Breadcrumbs
      trail={trail}
      location={props.page}
      language={props.language}
    />
  )
}

const fullUrl = (
  language,
  tourCategoryData,
  main_category_id,
  sub_category_id,
  url
) => {
  const main_category = tourCategoryData.find(c => c.id === main_category_id)
  const sub_category = tourCategoryData.find(c => c.id === sub_category_id)

  if (!main_category || !sub_category) return null

  const tourUrl = `/${language}/${main_category.url}/${sub_category.url}/${url}`

  return tourUrl
}

const BreadcrumbsTour = ({ language, page }) => {
  const tourData = (language === "zh" ? tourData_zh : tourData_en).filter(
    c => c.main_category_id && c.sub_category_id
  )
  const tourCategoryData =
    language === "zh" ? tourCategoryData_zh : tourCategoryData_en

  var data = tourData.find(t => {
    const tourUrl = fullUrl(
      language,
      tourCategoryData,
      t.main_category_id,
      t.sub_category_id,
      t.url
    )
    return tourUrl === page.replace(/\/?$/i, "")
  })

  var trail = []

  if (data) {
    var main_category = tourCategoryData.find(
      c => c.id === data.main_category_id
    )
    var sub_category = tourCategoryData.find(c => c.id === data.sub_category_id)

    trail.push({
      path: `/${language}/${main_category.url}`,
      page_title: main_category.name
    })
    trail.push({
      path: `/${language}/${main_category.url}/${sub_category.url}`,
      page_title: sub_category.name
    })
    trail.push({
      path: `/${language}/${main_category.url}/${sub_category.url}/${data.url}`,
      page_title: data.name
    })
  }

  return <Breadcrumbs trail={trail} location={page} language={language} />
}

export { Breadcrumbs, BreadcrumbsNavigation, BreadcrumbsTour }
