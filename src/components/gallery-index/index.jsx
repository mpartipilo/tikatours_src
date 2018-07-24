import React from "react"
import PropTypes from "prop-types"

const GalleryIndexTabs = ({ groups }) => (
  <React.Fragment>
    <div className="row hidden-xs">
      <div className="col-xs-12">
        <ul className="tabs">
          <li>
            <a
              className="btn shuffle-btn shuffle-active"
              title="All gallery images"
              data-group="all"
              href=""
            >
              All images
            </a>
          </li>
          {groups.map(g => (
            <li key={g.imggrp_id}>
              <a
                className="btn shuffle-btn"
                title={g.imggrp_name + " gallery"}
                data-group={g.gallery_id_md5}
                href=""
              >
                {g.imggrp_name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </React.Fragment>
)

GalleryIndexTabs.propTypes = {
  groups: PropTypes.array
}

const GalleryIndex = ({ groups }) => (
  <React.Fragment>
    {groups &&
      groups.length >= 0 && (
        <div className="container-fluid gallery-index">
          <GalleryIndexTabs groups={groups} />
          <div className="row">
            <div className="col-xs-12" />
          </div>
        </div>
      )}
  </React.Fragment>
)

GalleryIndex.propTypes = {
  groups: PropTypes.array
}

export default GalleryIndex
