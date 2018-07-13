import React from "react"
import PropTypes from "prop-types"

import TourCard from "../tour-card"

const TourList = ({ heading, tours }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-xs-12 text-center">
        <h2>{heading}</h2>
        {tours.map(t => <TourCard key={t.id} {...t} />)}
      </div>
    </div>
  </div>
)

TourList.propTypes = {
  heading: PropTypes.string,
  tours: PropTypes.array
}

export default TourList
