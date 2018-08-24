import React from "react"

import contentData from "../i18n-data"

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

const Breadcrumbs = props => (
  <div className="row hidden-xs">
    <div className="col-xs-12">
      <ul className="breadcrumbs text-center">
        <li>
          <a href={"/" + props.language} title="home" />
        </li>
        {props.trail
          .filter(t => t.path.replace(/\/$/i, "") != "/" + props.language)
          .map(t => (
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

const BreadcrumbsNavigation = props => {
  var flatNav = {}

  const { language, page } = props
  var { navigation } = contentData[language]

  flatten(navigation, flatNav, undefined)

  var trail = []
  var currentNode = flatNav[page.replace(/\/?$/i, "")]
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
  const main_category = tourCategoryData.find(c => c.id == main_category_id)
  const sub_category = tourCategoryData.find(c => c.id == sub_category_id)

  if (!main_category || !sub_category) return null

  const tourUrl = `/${language}/${main_category.url}/${sub_category.url}/${url}`

  return tourUrl
}

const BreadcrumbsTour = ({ language, page }) => {
  const { tourData, tourCategoryData } = contentData[language]

  const filteredTourData = tourData.filter(
    c => c.main_category_id && c.sub_category_id
  )

  var data = filteredTourData.find(t => {
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
      c => c.id == data.main_category_id
    )
    var sub_category = tourCategoryData.find(c => c.id == data.sub_category_id)

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
