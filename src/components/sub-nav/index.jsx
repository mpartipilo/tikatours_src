import React from "react"
import PropTypes from "prop-types"

const SubNav = ({ list }) => (
  <div className="row">
    <div className="col-xs-12">
      <ul className="sub-nav">
        {list.map(l => (
          <li key={l.id}>
            <a
              className={`btn ${l.active && "active"}`}
              title={l.title}
              href={l.full_url}
            >
              {l.label}
            </a>
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
