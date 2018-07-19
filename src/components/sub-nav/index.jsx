import React from "react"
import PropTypes from "prop-types"

const SubNav = ({ location, list }) => (
  <div className="row">
    <div className="col-xs-12">
      <ul className="sub-nav">
        {list.map(l => {
          var active = location.replace(/\/$/, "") === l ? "active" : ""
          return (
            <li key={l.id}>
              <a className={`btn ${active}`} title={l.title} href={l.full_url}>
                {l.label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  </div>
)

SubNav.propTypes = {
  language: PropTypes.string,
  location: PropTypes.string,
  list: PropTypes.array
}

export default SubNav
