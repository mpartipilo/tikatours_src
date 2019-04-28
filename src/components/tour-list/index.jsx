import React from "react"
import PropTypes from "prop-types"

import HeightMatchingGroup from "../react-match-height-group"
import TourCard from "../tour-card"

class TourList extends React.Component {
  constructor(props) {
    super(props)

    this.containerRef = React.createRef()
  }

  render() {
    const { language, heading, list, tag, tourCategoryData, strings } = this.props

    return (
      list &&
      list.length > 0 && (
        <div className="container-fluid">
          <div className="row" ref={this.containerRef}>
            <div className="col-12 text-center">
              <h2>{heading}</h2>
            </div>
            <HeightMatchingGroup
              selector=".t-info"
              containerRef={this.containerRef}
            >
              {list.map(t => (
                <TourCard
                  language={language}
                  key={t.tour_id}
                  tour={t}
                  tag={tag}
                  tourCategoryData={tourCategoryData}
                  strings={strings}
                />
              ))}
            </HeightMatchingGroup>
          </div>
        </div>
      )
    )
  }
}

TourList.propTypes = {
  language: PropTypes.string,
  heading: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  tag: PropTypes.string,
  tourCategoryData: PropTypes.array,
  strings: PropTypes.object.isRequired
}

export default TourList
