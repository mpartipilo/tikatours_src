import React from "react"
import PropTypes from "prop-types"

const TourCard = ({
  id,
  imagePath,
  tag,
  fullUrl,
  tourName,
  tourDuration,
  shortDescription,
  flag,
  priceFrom,
  featured,
  featuredTag
}) => (
  <div className="col-xs-12 col-md-6 t-item">
    <div className="row">
      <div
        className="col-xs-12 col-sm-6 col-md-12 col-lg-6"
        style={{ backgroundImage: "url('" + imagePath + "')" }}
      >
        <span className="t-info" />
        <div className="tag">
          {featured ? featuredTag || "featured tour" : tag}
        </div>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6">
        <div className="t-info">
          <h3>
            <a href={fullUrl}>{tourName}</a>
          </h3>
          <div className="duration">
            {flag && flag}
            <span>{tourDuration}</span>
          </div>
          <p>{shortDescription}</p>
          {priceFrom && priceFrom}
          <div>
            <a href={fullUrl} className="btn">
              MORE INFO
            </a>
            <form className="book-btn-form" method="POST" action="/">
              <input type="hidden" name="booking-btn" value={id} />
              <button className="btn">BOOK THIS TOUR</button>
            </form>
          </div>
        </div>
        <div className="blur-img">
          <div style={{ backgroundImage: "url('" + imagePath + "')" }} />
          <div className="olay" />
        </div>
      </div>
    </div>
  </div>
)

TourCard.propTypes = {
  id: PropTypes.string,
  imagePath: PropTypes.string,
  tag: PropTypes.string,
  fullUrl: PropTypes.string,
  tourName: PropTypes.string,
  tourDuration: PropTypes.string,
  shortDescription: PropTypes.string,
  flag: PropTypes.string,
  priceFrom: PropTypes.string,
  featured: PropTypes.bool,
  featuredTag: PropTypes.string
}

export default TourCard
