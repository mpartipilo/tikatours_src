import React from "react"
import PropTypes from "prop-types"

import ContentI18N from "../i18n-data"

const fullUrl = (
  language,
  tourCategoryData,
  main_category_id,
  sub_category_id,
  url
) => {
  var main_category = tourCategoryData.find(c => c.id == main_category_id)
  var sub_category = tourCategoryData.find(c => c.id == sub_category_id)

  if (!main_category || !sub_category) return null

  return `/${language}/${main_category.url}/${sub_category.url}/${url}`
}

const TourCard = ({ tour, tag, language, tourCategoryData }) => {
  var mainCategory = tourCategoryData.find(c => c.id == tour.main_category_id)
  var subCategory = tourCategoryData.find(c => c.id == tour.sub_category_id)

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
              <a
                href={fullUrl(
                  language,
                  tourCategoryData,
                  tour.main_category_id,
                  tour.sub_category_id,
                  tour.url
                )}
              >
                {tour.name}
              </a>
            </h3>
            <div className="duration">
              {tour.flag ? tour.flag : null}
              <span>{tour.duration}</span>
            </div>
            <p>{tour.short_descr}</p>
            {tour.price_from > 0 && (
              <p>
                from &#x20AC;<span className="price">{tour.price_from}</span>{" "}
                per person
              </p>
            )}
            <div>
              <a
                href={fullUrl(
                  language,
                  tourCategoryData,
                  tour.main_category_id,
                  tour.sub_category_id,
                  tour.url
                )}
                className="btn"
              >
                {ContentI18N[language].strings.more_info}
              </a>
              <form className="book-btn-form" method="POST" action="/">
                <input type="hidden" name="booking-btn" value={tour.id} />
                <button className="btn">
                  {ContentI18N[language].strings.book_tour}
                </button>
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

export default TourCard
