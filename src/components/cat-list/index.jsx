import React from "react"
import PropTypes from "prop-types"

import tourCategoryData_en from "../../../data/tour_category_en.json"
import tourCategoryData_zh from "../../../data/tour_category_zh.json"

class CatList extends React.Component {
  constructor(props) {
    super(props)

    var data =
      props.language === "zh" ? tourCategoryData_zh : tourCategoryData_en

    this.state = {
      categories: props.tourCategoryFilter(data)
    }
  }

  render() {
    return (
      <div className="row sub-wrap">
        {this.props.heading && (
          <h3 className="text-center">{this.props.heading}</h3>
        )}
        {this.state.categories &&
          this.state.categories.map(c => (
            <div className="col-xs-12 col-sm-6" key={c.id}>
              <a href={`${this.props.location.pathname}/${c.url}`}>
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
  }
}

CatList.propTypes = {
  language: PropTypes.string.isRequired,
  location: PropTypes.object,
  heading: PropTypes.string,
  tourCategoryFilter: PropTypes.func
}

export default CatList
