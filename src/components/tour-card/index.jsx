import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { contentData } from "../i18n-data"

const TourCardRender = ({
  tag,
  image_path,
  title,
  duration,
  flag,
  price,
  info,
  info_url,
  strings
}) => (
  <div className="col-12 col-lg-6 t-item">
    <div className="row">
      <div
        className="col-12 col-md-6 col-lg-12 col-xl-6"
        style={{ backgroundImage: "url('" + image_path + "')" }}
      >
        <span className="t-info" />
        <div className="tag">{tag}</div>
      </div>
      <div className="col-12 col-md-6 col-lg-12 col-xl-6">
        <div className="t-info">
          <h3>
            <Link to={info_url}>{title}</Link>
          </h3>
          <div className="duration">
            {flag ? flag : null}
            <span>{duration}</span>
          </div>
          <p>{info}</p>
          {price > 0 && (
            <p>
              {strings.from_euro}
              <span className="price">{price}</span>
              {strings["per person"]}
            </p>
          )}
          <div>
            <Link to={info_url} className="btn moreInfo">
              {strings.more_info}
            </Link>
            <a
              href="https://form.jotform.com/TikaTours/bookings"
              className="btn bookNow"
              target="_blank"
            >
              {strings.book_tour}
            </a>
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

const TourCard = ({ tour, tag, language, tourCategoryData }) => {
  var tourTag = tag;
  if (!tag) {
    var subCategory = tourCategoryData.find(
      c => c.sub_category_id == tour.sub_category_id
    )
    if (subCategory) {
      tourTag = subCategory.label
    } else {
      var mainCategory = tourCategoryData.find(
        c => c.template === "tourcategory" && c.main_category_id == tour.main_category_id
      )
      if (mainCategory) {
        tourTag = mainCategory.label
      }
    }
  }
  const { strings } = contentData[language]

  const tcrProps = {
    strings,
    image_path: tour.image_path,
    info_url: tour.url,
    title: tour.name,
    tag: tourTag,
    duration: tour.duration,
    info: tour.short_descr,
    price: tour.price_from
  }

  return <TourCardRender {...tcrProps} />
}

TourCard.propTypes = {
  tour: PropTypes.object.isRequired,
  tag: PropTypes.string,
  language: PropTypes.string.isRequired,
  tourCategoryData: PropTypes.array
}

export default TourCard
