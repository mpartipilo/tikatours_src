import React from "react"
import PropTypes from "prop-types"

import data from "../../../data/contact.json"

const FooterNav = props => (
  <div className="row">
    <div className="col-xs-12">
      <ul className="footer-nav">
        {props.links.map(l => (
          <li key={l.url}>
            <a href={l.url} title={l.title}>
              {l.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const Footer = () => (
  <footer>
    <div className="container-fluid">
      <FooterNav links={data.navFooter} />
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <div className="contact">
            <div className="row">
              <div className="col-xs-4">phone:</div>
              <div className="col-xs-8">
                <a href={"tel:" + data.phone}>{data.phone}</a>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">email:</div>
              <div className="col-xs-8">
                <a href={"mailto:" + data.email}>{data.email}</a>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">address:</div>
              <div className="col-xs-8">
                <address>{data.address}</address>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-6 credits text-center">
          <img
            src="/img/logos/beyond-logo.png"
            alt="Beyond Limits logo"
            style={{
              maxHeight: 100,
              paddingTop: 14,
              paddingBottom: 14,
              paddingLeft: 4,
              paddingRight: 4
            }}
          />
          <a href="/" className="hidden-xs hidden-sm">
            <img
              src="/img/logos/motif-sml.png"
              alt="Tika Tours logo"
              style={{ paddingLeft: 30 }}
            />
          </a>
          <div>
            <small>
              {data.copyright} {data.credits}
            </small>
          </div>
        </div>
      </div>
      <div className="row hidden-md hidden-lg">
        <div className="col-xs-12">
          <div className="divider" />
        </div>
      </div>
    </div>
  </footer>
)

FooterNav.propTypes = {
  links: PropTypes.array
}

export default Footer
