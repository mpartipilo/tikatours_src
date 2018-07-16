import React from "react"

import tourData from "../../../data/tour.json"
import tourCategoryData from "../../../data/tour_category.json"
import navigation from "../../../data/navigation.json"

const Breadcrumbs = props => (
  <div className="row hidden-xs">
    <div className="col-xs-12">
      <ul className="breadcrumbs text-center">
        <li>
          <a href="/" title="home" />
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
  flatten(navigation, flatNav, undefined)
  var trail = []
  var currentNode = flatNav[props.page]
  trail.push(currentNode)
  while (currentNode.parent_path) {
    currentNode = flatNav[currentNode.parent_path]
    trail.push(currentNode)
  }

  trail = trail.reverse()

  return <Breadcrumbs trail={trail} location={props.page} />
}

const fullUrl = (main_category_id, sub_category_id, url) => {
  var main_category = tourCategoryData.find(c => c.id === main_category_id)
  var sub_category = tourCategoryData.find(c => c.id === sub_category_id)

  if (!main_category || !sub_category) return null

  return `/${main_category.url}/${sub_category.url}/${url}`
}

const BreadcrumbsTour = props => {
  const data = tourData.find(
    t => fullUrl(t.main_category_id, t.sub_category_id, t.url) === props.page
  )

  var main_category = tourCategoryData.find(c => c.id === data.main_category_id)
  var sub_category = tourCategoryData.find(c => c.id === data.sub_category_id)

  var trail = []
  trail.push({ path: `/${main_category.url}`, page_title: main_category.name })
  trail.push({
    path: `/${main_category.url}/${sub_category.url}`,
    page_title: sub_category.name
  })
  trail.push({
    path: `/${main_category.url}/${sub_category.url}/${data.url}`,
    page_title: data.name
  })

  return <Breadcrumbs trail={trail} location={props.page} />
}

export { Breadcrumbs, BreadcrumbsNavigation, BreadcrumbsTour }
