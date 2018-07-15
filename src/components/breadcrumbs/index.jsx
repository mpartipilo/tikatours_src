import React from "react"

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

export { Breadcrumbs, BreadcrumbsNavigation }
