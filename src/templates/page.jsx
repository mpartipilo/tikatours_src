import React from "react"

const TemplatePage = props => (
  <div className="page">
    <div className="container">
      {props.breadcrumbs && "==breadcrumbs=="}
      <div className="row">
        <div className={`col-xs-12 text-center ${props.hasBc && "==has-bc=="}`}>
          <h1>{props.heading && "==heading=="}</h1>
        </div>
      </div>
      {props.subNav && "==sub-nav=="}
      <div className="content">{props.content && "==content=="}</div>
      <div className="row">
        <div className="col-xs-12">
          <div className="divider" />
        </div>
      </div>
      {props.catlist && "==cat-list=="}
    </div>
    {props.galleryIndex && "==gallery-index=="}
    {props.tourList && "==tour-list=="}
    {props.reasons && "==reasons=="}
    {props.mapCanvasView && "==map_canvas_view=="}
    {props.socialPanel && "==social-panel=="}
    {props.homeGallery && "==home-gallery=="}
  </div>
)

export default TemplatePage
