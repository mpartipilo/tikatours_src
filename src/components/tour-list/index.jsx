import React from "react"
import PropTypes from "prop-types"

import TourCard from "../tour-card"

const TourList = ({ language, heading, list, tag, tourCategoryData }) => {
  return (
    list &&
    list.length > 0 && (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h2>{heading}</h2>
          </div>
          {list.map(t => (
            <TourCard
              language={language}
              key={t.id}
              tour={t}
              tag={tag}
              tourCategoryData={tourCategoryData}
            />
          ))}
        </div>
      </div>
    )
  )
}

TourList.propTypes = {
  language: PropTypes.string,
  heading: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  tag: PropTypes.string,
  tourCategoryData: PropTypes.array
}

export default TourList
