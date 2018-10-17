import React from "react"
import PropTypes from "prop-types"

import { contentData } from "../i18n-data"

const TourCard = ({ tour, tag, language, tourCategoryData }) => {
  const mainCategory = tourCategoryData.find(
    c => c.main_category_id == tour.main_category_id
  )
  const subCategory = tourCategoryData.find(
    c => c.sub_category_id == tour.sub_category_id
  )
  const { strings } = contentData[language]

  return (
    <div className="col-xs-12 col-md-6 t-item">
      <div className="row">
        <div
          className="col-xs-12 col-sm-6 col-md-12 col-lg-6"
          style={{ backgroundImage: "url('" + tour.image_path + "')" }}
        >
          <span className="t-info" />
          <div className="tag">
            {tag
              ? tag
              : subCategory
                ? subCategory.name
                : mainCategory
                  ? mainCategory.name
                  : ""}
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6">
          <div className="t-info">
            <h3>
              <a href={tour.url}>{tour.name}</a>
            </h3>
            <div className="duration">
              {tour.flag ? tour.flag : null}
              <span>{tour.duration}</span>
            </div>
            <p>{tour.short_descr}</p>
            {tour.price_from > 0 && (
              <p>
                {strings.from_euro}
                <span className="price">{tour.price_from}</span>
                {strings["per person"]}
              </p>
            )}
            <div>
              <a href={tour.url} className="btn">
                {strings.more_info}
              </a>
              <form
                className="book-btn-form"
                method="GET"
                action={`/${language}/bookings/${tour.tour_id}`}
              >
                <button className="btn">{strings.book_tour}</button>
              </form>
            </div>
          </div>
          <div className="blur-img">
            <div
              style={{ backgroundImage: "url('" + tour.image_path + "')" }}
            />
            <div className="olay" />
          </div>
        </div>
      </div>
    </div>
  )
}

TourCard.propTypes = {
  tour: PropTypes.object.isRequired,
  tag: PropTypes.string,
  language: PropTypes.string.isRequired,
  tourCategoryData: PropTypes.array.isRequired
}

export default TourCard
