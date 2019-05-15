import React from "react"
import { Link } from "gatsby"

const BreadcrumbsTemplate = ({ trail }) => (
  <ul className="breadcrumbs text-center">
    {trail.map((t, idx) => (
      <li key={t.path}>
        {idx > 0 && <i className="fa fa-angle-right" />}
        <Link
          to={t.path}
          className={idx + 1 == trail.length ? "active" : null}
          title={t.page_title}
        >
          {idx > 0 && t.page_title}
        </Link>
      </li>
    ))}
  </ul>
)

const Breadcrumbs = ({ trail }) =>
  trail ? (
    <div className="row hidden-xs">
      <div className="col-12">
        <BreadcrumbsTemplate trail={trail} />
      </div>
    </div>
  ) : null

export { Breadcrumbs }
