import React from "react"
import PropTypes from "prop-types"

import { contentData } from "../i18n-data"

const SocialLinks = ({ currentLanguage }) => {
  const contentDataLoc = contentData[currentLanguage]
  const { strings } = contentDataLoc
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
          <span>{strings["Send us an email"]}</span>
        </a>
      </li>
    </ul>
  )
}

const SocialPanel = ({ currentLanguage }) => {
  const contentDataLoc = contentData[currentLanguage]
  const { strings } = contentDataLoc
  return (
    <div className="container-fluid social-panel">
      <div className="row">
        <div className="col-xs-12 col-md-3">
          <h2>
            <img src="/img/logos/motif-sml.png" alt="Tika Tours logo" />
            {strings["Be Social"]}
          </h2>
        </div>
        <div className="col-xs-12 col-md-9">
          <SocialLinks currentLanguage={currentLanguage} />
        </div>
      </div>
    </div>
  )
}

export default SocialPanel
