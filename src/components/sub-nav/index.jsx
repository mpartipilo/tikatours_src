import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const SubNav = ({ list }) => (
  <div className="row">
    <div className="col-12">
      <ul className="sub-nav">
        {list.map(l => (
          <li key={l.id}>
            <Link
              className={`btn ${l.active && "active"}`}
              title={l.title}
              to={l.full_url}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

SubNav.propTypes = {
  list: PropTypes.array
}

export default SubNav
