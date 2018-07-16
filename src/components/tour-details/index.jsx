import React from "react"
import PropTypes from "prop-types"

import tourData from "../../../data/tour.json"
import tourCategoryData from "../../../data/tour_category.json"

const fullUrl = (main_category_id, sub_category_id, url) => {
  var main_category = tourCategoryData.find(c => c.id === main_category_id)
  var sub_category = tourCategoryData.find(c => c.id === sub_category_id)
  return `/${main_category.url}/${sub_category.url}/${url}`
}

class TourDetails extends React.Component {
  constructor(props) {
    super(props)

    const { url } = props

    const data = tourData.find(
      t => fullUrl(t.main_category_id, t.sub_category_id, t.url) === url
    )

    const tag = props.subCategory
      ? tourCategoryData.find(c => c.id === data.sub_category_id)
        ? tourCategoryData.find(c => c.id === data.sub_category_id).name
        : data.is_featured === "1"
          ? "featured tour"
          : ""
      : tourCategoryData.find(c => c.id === data.main_category_id)
        ? tourCategoryData.find(c => c.id === data.main_category_id).name
        : data.is_featured === "1"
          ? "featured tour"
          : ""

    this.state = {
      data: data,
      tag: tag
    }
  }

  render() {
    const { data, tag } = this.state
    const { duration, inclusions, itinerary, long_descr, price_from } = data

    return (
      <div className="row tour-wrap">
        <div className="col-xs-12 col-md-8">
          <div className="row">
            <div className="col-xs-12">
              <h2>Tour Overview</h2>
              <div dangerouslySetInnerHTML={{ __html: long_descr }} />
            </div>
            ==tour-gallery==
            {itinerary && (
              <div className="col-xs-12">
                <h2>Itinerary</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: itinerary
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-xs-12 col-md-4 side">
          <div className="row">
            <div className="col-xs-12">
              <div className="tag">{tag}</div>
              ==flag==
              <span className="duration">{duration}</span>
              {price_from > 0 && (
                <p>
                  from &#x20AC;<span className="price">{price_from}</span> per
                  person
                </p>
              )}
              <div>
                <form
                  className="book-btn-form"
                  method="POST"
                  action="/{$page_bookings}"
                >
                  <input type="hidden" name="booking-btn" value="{$id}" />
                  <button className="btn">BOOK THIS TOUR</button>
                </form>
              </div>
            </div>
            <div className="col-xs-12 incl-wrap">
              <h2>Inclusions</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: inclusions
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TourDetails.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
  subCategory: PropTypes.bool
}

export default TourDetails
