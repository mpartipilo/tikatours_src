import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import ReasonsSlider from "../reasons"
import { BreadcrumbsNavigation } from "../breadcrumbs"
import Content from "../content"
import Footer from "../footer"
import HomeOverlay from "../home-overlay"
import TourList from "../tour-list"
import MapCanvasView from "../map-canvas"
import SocialPanel from "../social-panel"
import Slideshow from "../slideshow"
import SubNav from "../sub-nav"
import CatList from "../cat-list"
import HomeGallery from "../home-gallery"
import GalleryIndex from "../gallery-index"
import Video from "../video"
import Analytics from "../analytics"

const PageWrapper = ({
  analytics,
  children,
  heading,
  subNav,
  catlist,
  galleryIndex,
  homeOverlay,
  tourList,
  reasons,
  mapCanvasCountry,
  socialPanel,
  homeGallery,
  slideshow,
  video,
  bodyTagClasses,
  location,
  hasBreadcrumbs,
  content
}) => (
  <React.Fragment>
    <Helmet
      bodyAttributes={{
        class: (bodyTagClasses || "") + (slideshow ? "" : " no-ss")
      }}
    />
    {homeOverlay && <HomeOverlay {...homeOverlay} />}
    {slideshow && <Slideshow {...slideshow} />}
    <div className="main">
      <div className="container">
        {hasBreadcrumbs && <BreadcrumbsNavigation page={location.pathname} />}
        <div className="row">
          <div
            className={
              "col-xs-12 text-center" + (hasBreadcrumbs ? " has-bc" : "")
            }
          >
            {heading && <h1>{heading}</h1>}
          </div>
        </div>
        {subNav && <SubNav {...subNav} />}
        <div className="content">
          {!content && children}
          {content && <Content {...content} />}
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="divider" />
          </div>
        </div>
        {catlist && <CatList {...catlist} location={location} />}
      </div>
      {galleryIndex && <GalleryIndex {...galleryIndex} />}
      {tourList && <TourList {...tourList} />}
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
    {video && <Video {...video} />}
    ==scripts-load-top==
    {slideshow && (
      <script>
        {`
    $(function($){
        $.supersized({
            slide_interval: 5000,
            transition_speed:800,
            performance:0,
            slide_links:'blank',
            slides:[        
            ]
        });
        $('.prev').click(function(){api.prevSlide();});
        $('.next').click(function(){api.nextSlide();});
        var hammertime = new Hammer($('.ss-wrap')[0]);
        hammertime.on('swipeleft', function(ev) {
            api.prevSlide();
        });
        hammertime.on('swiperight', function(ev) {
            api.nextSlide();
        });
      });`}
      </script>
    )}
    {analytics && <Analytics {...analytics} />}
  </React.Fragment>
)

PageWrapper.propTypes = {
  analytics: PropTypes.any,
  children: PropTypes.node,
  heading: PropTypes.node,
  subNav: PropTypes.node,
  catlist: PropTypes.any,
  galleryIndex: PropTypes.any,
  homeOverlay: PropTypes.bool,
  tourList: PropTypes.object,
  reasons: PropTypes.array,
  mapCanvasCountry: PropTypes.string,
  socialPanel: PropTypes.bool,
  homeGallery: PropTypes.bool,
  slideshow: PropTypes.any,
  video: PropTypes.any,
  bodyTagClasses: PropTypes.string,
  location: PropTypes.object,
  hasBreadcrumbs: PropTypes.bool,
  content: PropTypes.object
}

export default PageWrapper
