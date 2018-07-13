import React from "react"
import PropTypes from "prop-types"

const PageWrapper = ({
  children,
  breadcrumbs,
  heading,
  subNav,
  catlist,
  galleryIndex,
  tourList,
  reasons,
  mapCanvasView,
  socialPanel,
  homeGallery
}) => (
  <React.Fragment>
    <div className="container">
      {breadcrumbs && breadcrumbs()}
      <div className="row">
        <div className="col-xs-12 text-center ==has-bc==">
          <h1>{heading && heading}</h1>
        </div>
      </div>
      {subNav || "==sub-nav=="}
      <div className="content">{children}</div>
      <div className="row">
        <div className="col-xs-12">
          <div className="divider" />
        </div>
      </div>
      {catlist || "==cat-list=="}
    </div>
    {galleryIndex || "==gallery-index=="}
    {tourList && tourList}
    {reasons || "==reasons=="}
    {mapCanvasView || "==map_canvas_view=="}
    {socialPanel || "==social-panel=="}
    {homeGallery || "==home-gallery=="}
  </React.Fragment>
)

PageWrapper.propTypes = {
  children: PropTypes.node,
  breadcrumbs: PropTypes.func,
  heading: PropTypes.node,
  subNav: PropTypes.node,
  catlist: PropTypes.array,
  galleryIndex: PropTypes.any,
  tourList: PropTypes.node,
  reasons: PropTypes.array,
  mapCanvasView: PropTypes.node,
  socialPanel: PropTypes.node,
  homeGallery: PropTypes.node
}

export default PageWrapper
