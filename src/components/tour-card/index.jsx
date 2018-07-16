import React from "react"
import PropTypes from "prop-types"

import tourCategoryData from "../../../data/tour_category_en.json"

const fullUrl = (main_category_id, sub_category_id, url) => {
  var main_category = tourCategoryData.find(c => c.id === main_category_id)
  var sub_category = tourCategoryData.find(c => c.id === sub_category_id)
  return `/${main_category.url}/${sub_category.url}/${url}`
}

const TourCard = ({
  id,
  name,
  url,
  heading,
  short_descr,
  long_descr,
  image_path,
  price_from,
  inclusions,
  itinerary,
  duration,
  title,
  meta_descr,
  status,
  rank,
  is_featured,
  slideshow_id,
  main_category_id,
  sub_category_id,
  gallery_id,
  country_id,
  tag,
  flag,
  subCategory
}) => (
  <div className="col-xs-12 col-md-6 t-item">
    <div className="row">
      <div
        className="col-xs-12 col-sm-6 col-md-12 col-lg-6"
        style={{ backgroundImage: "url('" + image_path + "')" }}
      >
        <span className="t-info" />
        <div className="tag">
          {subCategory
            ? tourCategoryData.find(c => c.id === sub_category_id)
              ? tourCategoryData.find(c => c.id === sub_category_id).name
              : is_featured === "1"
                ? "featured tour"
                : ""
            : tourCategoryData.find(c => c.id === main_category_id)
              ? tourCategoryData.find(c => c.id === main_category_id).name
              : is_featured === "1"
                ? "featured tour"
                : ""}
        </div>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6">
        <div className="t-info">
          <h3>
            <a href={fullUrl(main_category_id, sub_category_id, url)}>{name}</a>
          </h3>
          <div className="duration">
            {flag && flag}
            <span>{duration}</span>
          </div>
          <p>{short_descr}</p>
          {price_from > 0 && (
            <p>
              from &#x20AC;<span className="price">{price_from}</span> per
              person
            </p>
          )}
          <div>
            <a
              href={fullUrl(main_category_id, sub_category_id, url)}
              className="btn"
            >
              MORE INFO
            </a>
            <form className="book-btn-form" method="POST" action="/">
              <input type="hidden" name="booking-btn" value={id} />
              <button className="btn">BOOK THIS TOUR</button>
            </form>
          </div>
        </div>
        <div className="blur-img">
          <div style={{ backgroundImage: "url('" + image_path + "')" }} />
          <div className="olay" />
        </div>
      </div>
    </div>
  </div>
)

export default TourCard
