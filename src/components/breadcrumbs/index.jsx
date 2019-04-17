import React from "react"
import { Link } from "gatsby"

const BreadcrumbsTemplate = ({ rootUrl, trail }) => (
  <div className="row hidden-xs">
    <div className="col-12">
      <ul className="breadcrumbs text-center">
        <li>
          <Link to={rootUrl} title="home" />
        </li>
        {trail
          .map((t, idx) => (
            <li key={t.path}>
              <i className="fa fa-angle-right" />
              <Link
                to={t.path}
                className={idx + 1 == trail.length ? "active" : null}
                title={t.page_title}
              >
                {t.page_title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  </div>
)

const Breadcrumbs = ({language, trail}) => {
  return (
    <BreadcrumbsTemplate rootUrl={"/" + language} trail={trail.filter(t => t.path.replace(/\/$/i, "") != "/" + language)} />
  )
}

export { Breadcrumbs }
