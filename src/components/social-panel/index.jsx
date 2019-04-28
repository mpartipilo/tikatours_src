import React from "react"
import PropTypes from "prop-types"

const SocialLinks = ({ strings }) => {
  return (
    <ul className="social-links">
      <li>
        <a
          title="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/tikatoursgeorgia/"
        >
          <span>
            <i className="fa fa-instagram" />
          </span>
          <span>Instagram</span>
        </a>
      </li>
      <li>
        <a
          title="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/tikatoursgeorgia/"
        >
          <span>
            <i className="fa fa-facebook" />
          </span>
          <span>Facebook</span>
        </a>
      </li>
      {/*
    <li>
      <a title="Share this page" target="_blank" href="">
        <span>
          <i className="fa fa-share-alt" />
        </span>
        <span>Share this page</span>
        <i className="fa fa-plus" />
      </a>
    </li>
      */}
      <li>
        <a href="mailto:info@tikatours.com">
          <span>
            <i className="fa fa-envelope-o" />
          </span>
          <span>{strings["Send_us_an_email"]}</span>
        </a>
      </li>
    </ul>
  )
}

const SocialPanel = ({ strings }) => (
  <div className="container-fluid social-panel">
    <div className="row">
      <div className="col-12 col-lg-3">
        <h2>
          <img src="/img/logos/motif-sml.png" alt="Tika Tours logo" />
          {strings["Be_Social"]}
        </h2>
      </div>
      <div className="col-12 col-lg-9">
        <SocialLinks strings={strings} />
      </div>
    </div>
  </div>
)

SocialPanel.propTypes = {
  strings: PropTypes.object.isRequired
}

export default SocialPanel
