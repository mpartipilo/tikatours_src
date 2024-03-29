import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const CatList = ({ heading, list }) => (
  <div className="row sub-wrap">
    {heading && (
      <div className="col-12">
        <h3 className="text-center">{heading}</h3>
      </div>
    )}
    {list &&
      list.map(c => (
        <div className="col-12 col-sm-6" key={c.url}>
          <Link to={`${c.url}`}>
            <div
              className="sub-cat"
              style={{ backgroundImage: `url(${c.image_path})` }}
            >
              <h4>{c.label}</h4>
              <p>{c.short_descr}</p>
              <div className="bg" />
            </div>
          </Link>
        </div>
      ))}
  </div>
)

CatList.propTypes = {
  heading: PropTypes.string,
  list: PropTypes.array
}

export default CatList
