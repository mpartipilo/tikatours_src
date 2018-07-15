import React from "react"
import PropTypes from "prop-types"

const ReasonsSlider = ({ reasons, btnUrl, btnText }) => (
  <div className="r-wrap text-center">
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h2>{reasons.length} Reasons to Visit Georgia</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-sm-push-1 col-md-10 col-md-push-1 col-lg-8 col-lg-push-2">
          <div className="carousel">
            <div className="row">
              <div className="col-xs-12 col-sm-8 col-sm-push-2">
                <ul className="slides">
                  {reasons.sort((a, b) => b.rank - a.rank).map(r => (
                    <li key={r.id} className="slide">
                      <p>{r.highlight}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-xs-6 col-sm-2 col-sm-pull-8">
                <i className="fa fa-angle-left r-prev" />
              </div>
              <div className="col-xs-6 col-sm-2">
                <i className="fa fa-angle-right r-next" />
              </div>
            </div>
            <div className="count">
              <span>1</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {btnUrl && btnText ? (
            <a href={btnUrl} className="btn">
              {btnText}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  </div>
)

ReasonsSlider.propTypes = {
  reasons: PropTypes.array,
  btnUrl: PropTypes.string,
  btnText: PropTypes.string
}

export default ReasonsSlider
