import React from "react"
import PropTypes from "prop-types"

import ReasonsSlider from "../reasons"
import Footer from "../footer"
import HomeOverlay from "../home-overlay"
import TourList from "../tour-list"
import MapCanvasView from "../map-canvas"
import SocialPanel from "../social-panel"
import HomeGallery from "../home-gallery"

const PageWrapper = ({
  children,
  breadcrumbs,
  heading,
  subNav,
  catlist,
  galleryIndex,
  tourList,
  reasons,
  mapCanvasCountry,
  socialPanel,
  homeGallery
}) => (
  <React.Fragment>
    <HomeOverlay
      heading="Life changing travel experiences"
      subheading="Luxury Journeys to Georgia, Armenia and Azerbaijan"
      intro={`TikaTours warmly welcomes you to places of extraordinary culture and history, geographical diversity and startling beauty. 

      We are your specialists in luxury journeys to less-travelled destinations, offering trips to the Caucasus region of Georgia, Armenia, and Azerbaijan.`}
      btn_text="About us"
      btn_url="/about"
    />
    <div className="main">
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
      {tourList && (
        <TourList
          heading={tourList.heading}
          toursFilter={tourList.toursFilter}
        />
      )}
      {reasons && (
        <ReasonsSlider
          reasons={reasons}
          btnUrl="/georgia-tours"
          btnText="View Georgia Tours"
        />
      )}
      {mapCanvasCountry && <MapCanvasView countryName={mapCanvasCountry} />}
      {socialPanel && <SocialPanel />}
      {homeGallery && <HomeGallery galleryId={5} />}
      <Footer />
    </div>
    ==video== ==scripts-load-top== ==slideshow-script== ==analytics==
  </React.Fragment>
)

PageWrapper.propTypes = {
  children: PropTypes.node,
  breadcrumbs: PropTypes.func,
  heading: PropTypes.node,
  subNav: PropTypes.node,
  catlist: PropTypes.array,
  galleryIndex: PropTypes.any,
  tourList: PropTypes.object,
  reasons: PropTypes.array,
  mapCanvasCountry: PropTypes.string,
  socialPanel: PropTypes.bool,
  homeGallery: PropTypes.bool
}

export default PageWrapper
