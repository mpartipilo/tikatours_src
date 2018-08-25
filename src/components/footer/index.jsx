import React from "react"
import PropTypes from "prop-types"

import data from "../i18n-data"

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

const Footer = props => {
  const { language } = props
  const { contact_data, strings } = data[language]

  return (
    <footer>
      <div className="container-fluid">
        <FooterNav links={contact_data.navFooter} language={language} />
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="contact">
              <div className="row">
                <div className="col-xs-4">{strings["phone"]}:</div>
                <div className="col-xs-8">
                  <a href={"tel:" + contact_data.phone}>{contact_data.phone}</a>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-4">{strings["email"]}:</div>
                <div className="col-xs-8">
                  <a href={"mailto:" + contact_data.email}>
                    {contact_data.email}
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-4">{strings["address"]}:</div>
                <div className="col-xs-8">
                  <address>{contact_data.address}</address>
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
                {contact_data.copyright} {contact_data.credits}
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
}

FooterNav.propTypes = {
  links: PropTypes.array,
  language: PropTypes.string.isRequired
}

export default Footer
