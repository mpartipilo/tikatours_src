import path from "path"
import React from "react"
import PropTypes from "prop-types"

const TourGallery = ({ photos }) => (
  <React.Fragment>
    {photos &&
      photos.length > 0 && (
        <div className="col-xs-12">
          <h2>Tour Gallery</h2>
          <ul className="gallery text-left">
            {photos.map(m => (
              <li key={m.imgslide_id}>
                <a
                  href={m.imgslide_path}
                  rel="group"
                  className="fancybox"
                  title={m.imgslide_caption}
                >
                  <img
                    src={m.srcThumb}
                    alt={m.caption_heading}
                    title={m.imgslide_caption}
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="clearfix" />
        </div>
      )}
  </React.Fragment>
)

TourGallery.propTypes = {
  photos: PropTypes.array
}

class TourDetails extends React.Component {
  constructor(props) {
    super(props)

    const { tour, imagesSlidesData, tourCategoryData } = props

    const subCategoryFound = tourCategoryData.find(
      c => c.id === tour.sub_category_id
    )

    const mainCategoryFound = tourCategoryData.find(
      c => c.id === tour.main_category_id
    )

    const tag =
      (subCategoryFound && subCategoryFound.name) ||
      (mainCategoryFound && mainCategoryFound.name) ||
      (tour.is_featured === "1" && "featured tour") ||
      ""

    var thumbPath = `/thumbs/galleries/g${tour.gallery_id}/`

    const tourGallery = imagesSlidesData
      .filter(i => i.imggrp_id == tour.gallery_id)
      .map(i => ({
        ...i,
        srcThumb: thumbPath + path.basename(i.imgslide_path)
      }))
      .sort((l, r) => {
        return l.imgslide_rank - r.imgslide_rank
      })

    this.state = {
      tour,
      tag,
      tourGallery
    }
  }

  render() {
    const { tour, tag, tourGallery } = this.state
    const { duration, inclusions, itinerary, long_descr, price_from } = tour

    return (
      <div className="row tour-wrap">
        <div className="col-xs-12 col-md-8">
          <div className="row">
            <div className="col-xs-12">
              <h2>Tour Overview</h2>
              <div dangerouslySetInnerHTML={{ __html: long_descr }} />
            </div>
            {tourGallery && <TourGallery photos={tourGallery} />}
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
              {/* flag */}
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
  language: PropTypes.string.isRequired,
  tour: PropTypes.object.isRequired,
  imagesSlidesData: PropTypes.array.isRequired,
  tourCategoryData: PropTypes.array.isRequired
}

export default TourDetails
