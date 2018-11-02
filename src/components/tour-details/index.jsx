import path from "path"
import React from "react"
import PropTypes from "prop-types"

import { getSlideshowData, contentData } from "../i18n-data"

import Gallery from "../gallery"

class TourDetails extends React.Component {
  constructor(props) {
    super(props)

    const { tour, imagesSlidesData, tourCategoryData, language } = props
    const { strings } = contentData[language]

    var tag = ""

    if (tour) {
      const subCategoryFound = tourCategoryData.find(
        c => c.sub_category_id === tour.sub_category_id
      )

      const mainCategoryFound = tourCategoryData.find(
        c => c.main_category_id === tour.main_category_id
      )

      tag =
        (subCategoryFound && subCategoryFound.name) ||
        (mainCategoryFound && mainCategoryFound.name) ||
        (tour.is_featured == "1" && "featured tour") ||
        ""

      var thumbPath = `/thumbs/galleries/g${tour.gallery_id}/`

      var tourGallery = imagesSlidesData
        .filter(i => i.imggrp_id == tour.gallery_id)
        .map(i => ({
          ...i,
          srcThumb: thumbPath + path.basename(i.imgslide_path)
        }))
        .sort((l, r) => {
          return l.imgslide_rank - r.imgslide_rank
        })
    }

    this.state = {
      tour,
      tag,
      tourGallery,
      strings
    }
  }

  render() {
    const { tour, tag, tourGallery } = this.state

    if (!tour) {
      return "Tour not found"
    }

    const { duration, inclusions, itinerary, long_descr, price_from } = tour

    return (
      <div className="row tour-wrap">
        <div className="col-xs-12 col-md-8">
          <div className="row">
            <div className="col-xs-12">
              <h2>{this.state.strings["tour overview"]}</h2>
              <div dangerouslySetInnerHTML={{ __html: long_descr }} />
            </div>
            {tourGallery && (
              <Gallery
                heading={this.state.strings["tour gallery"]}
                photos={tourGallery}
              />
            )}
            {itinerary && (
              <div className="col-xs-12">
                <h2>{this.state.strings["itinerary"]}</h2>
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
              {/* flag */}
              <span className="duration">{duration}</span>
              {price_from > 0 && (
                <p>
                  {this.state.strings.from_euro}
                  <span className="price">{price_from}</span>
                  {this.state.strings["per person"]}
                </p>
              )}
              <div>
                <form
                  className="book-btn-form"
                  method="GET"
                  action={`/${this.props.language}/bookings/${tour.id}`}
                >
                  <button className="btn">
                    {this.state.strings.book_tour}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-xs-12 incl-wrap">
              <h2>{this.state.strings["inclusions"]}</h2>
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
  language: PropTypes.string.isRequired,
  tour: PropTypes.object.isRequired,
  imagesSlidesData: PropTypes.array.isRequired,
  tourCategoryData: PropTypes.array.isRequired
}

export default TourDetails
