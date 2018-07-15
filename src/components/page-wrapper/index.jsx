import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import ReasonsSlider from "../reasons"
import Breadcrumbs from "../breadcrumbs"
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
  breadcrumbs,
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
  hasBreadcrumbs
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
        {breadcrumbs && <Breadcrumbs {...breadcrumbs} />}
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
        <div className="content">{children}</div>
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
                {image:"/library/slides/slide1.jpg",title:"<span>Discover Amazing Georgia</span><span class=\"caption\">Surrounded by hills, sliced in two by the Mtkvari (Kura) River, with tree-lined boulevards, charming lanes, towering churches and pastel-painted houses, Tbilisi is unexpectedly lovely.</span><div><a href=\"#\" data-href=\"#slide-1867\" class=\"btn video-link\"><i class=\"fa fa-youtube-play\"></i>watch video</a></div>"}
,{image:"/library/slides/slide2.jpg",title:"<span>Experience a Unique Culture</span><span class=\"caption\"></span><div><a href=\"#\" data-href=\"#slide-1868\" class=\"btn video-link\"><i class=\"fa fa-youtube-play\"></i>watch video</a></div>"}
,{image:"/library/slides/exotic-flavours.jpg",title:"<span>Encounter Exotique Flavours</span><span class=\"caption\"></span><div><a class=\"btn\" href=\"/georgia-tours/food-and-wine\">view food and wine</a></div>"}
,{image:"/library/slides/luxury-dining1.jpg",title:"<span>Customized Luxury Dining</span><span class=\"caption\"></span><div><a href=\"#\" data-href=\"#slide-1870\" class=\"btn video-link\"><i class=\"fa fa-youtube-play\"></i>watch video</a></div>"}
,{image:"/library/slides/svaneti4.jpg",title:"<span>Explore Tranquil Svaneti</span><span class=\"caption\"></span><div><a class=\"btn\" href=\"/georgia-tours/adventure-tours\">view adventure</a></div>"}
,{image:"/library/slides/wineculture.jpg",title:"<span>Discover Wine Culture</span><span class=\"caption\"></span><div><a href=\"#\" data-href=\"#slide-1872\" class=\"btn video-link\"><i class=\"fa fa-youtube-play\"></i>watch video</a></div>"}
,{image:"/library/blog/14-images/dsc03834.jpg",title:"<span>Family Holiday</span><span class=\"caption\"></span><div><a href=\"#\" data-href=\"#slide-1873\" class=\"btn video-link\"><i class=\"fa fa-youtube-play\"></i>watch video</a></div>"}
,{image:"/library/slides/romance28.jpg",title:"<span>Bring Romance to Life</span><span class=\"caption\"></span><div><a class=\"btn\" href=\"/georgia-tours/romance\">view romance</a></div>"}
,{image:"/library/tours/health3.jpg",title:"<span>Soak in Sulfur Springs</span><span class=\"caption\"></span><div><a href=\"#\" data-href=\"#slide-1875\" class=\"btn video-link\"><i class=\"fa fa-youtube-play\"></i>watch video</a></div>"}
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
  breadcrumbs: PropTypes.func,
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
  location: PropTypes.string,
  hasBreadcrumbs: PropTypes.bool
}

export default PageWrapper
