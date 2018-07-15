import React from "react"
import PropTypes from "prop-types"

import TourCard from "../tour-card"

import dataTourList from "../../../data/tour.json"

const TourList = ({ heading, toursFilter, subCategory }) => {
  var list = toursFilter(dataTourList)

  return (
    list &&
    list.length > 0 && (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h2>{heading}</h2>
            {list.map(t => (
              <TourCard key={t.id} {...t} subCategory={subCategory} />
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
