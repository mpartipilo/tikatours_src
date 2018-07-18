import React from "react"
import PropTypes from "prop-types"

const CatList = ({ heading, list, location }) => (
  <div className="row sub-wrap">
    {heading && <h3 className="text-center">{heading}</h3>}
    {list &&
      list.map(c => (
        <div className="col-xs-12 col-sm-6" key={c.id}>
          <a href={`${location.pathname}/${c.url}`}>
            <div
              className="sub-cat"
              style={{ backgroundImage: `url(${c.image_path})` }}
            >
              <h4>{c.label}</h4>
              <p>{c.short_descr}</p>
              <div className="bg" />
            </div>
          </a>
        </div>
      ))}
  </div>
)

CatList.propTypes = {
  language: PropTypes.string.isRequired,
  location: PropTypes.object,
  heading: PropTypes.string,
  list: PropTypes.array
}

export default CatList
