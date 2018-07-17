import React from "react"
import PropTypes from "prop-types"

import TourCard from "../tour-card"

import dataTourList_en from "../../../data/tour_en.json"
import dataTourList_zh from "../../../data/tour_zh.json"

const TourList = ({ language, heading, toursFilter, subCategory }) => {
  const dataTourList = language === "zh" ? dataTourList_zh : dataTourList_en

  var list = toursFilter(dataTourList)

  return (
    list &&
    list.length > 0 && (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h2>{heading}</h2>
            {list.map(t => (
              <TourCard
                language={language}
                key={t.id}
                {...t}
                subCategory={subCategory}
              />
            ))}
          </div>
        </div>
      </div>
    )
  )
}

TourList.propTypes = {
  subCategory: PropTypes.bool,
  heading: PropTypes.string,
  toursFilter: PropTypes.func
}

export default TourList
