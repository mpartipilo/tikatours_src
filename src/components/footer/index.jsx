import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { contentData } from "../i18n-data"

const FooterNav = props => (
  <div className="row">
    <div className="col-12">
      <ul className="footer-nav">
        {props.links.map(l => (
          <li key={l.url}>
            <Link href={l.url} title={l.title}>
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const Footer = props => {
  const { language, contact_data } = props
  const { strings } = contentData[language]

  const { copyright, credits, navFooter, phone, email, address } = contact_data

  return (
    <footer>
      <div className="container-fluid">
        <FooterNav links={navFooter} language={language} />
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="contact">
              <div className="row">
                <div className="col-4">{strings["phone"]}:</div>
                <div className="col-8">
                  <a href={"tel:" + phone}>{phone}</a>
                </div>
              </div>
              <div className="row">
                <div className="col-4">{strings["email"]}:</div>
                <div className="col-8">
                  <a href={"mailto:" + email}>{email}</a>
                </div>
              </div>
              <div className="row">
                <div className="col-4">{strings["address"]}:</div>
                <div className="col-8">
                  <address>{address}</address>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 credits text-center">
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
            <Link to="/" className="hidden-xs hidden-sm">
              <img
                src="/img/logos/motif-sml.png"
                alt="Tika Tours logo"
                style={{ paddingLeft: 30 }}
              />
            </Link>
            <div>
              <small>
                <span
                  dangerouslySetInnerHTML={{
                    __html: copyright
                  }}
                />
                <br />
                <span
                  dangerouslySetInnerHTML={{
                    __html: credits
                  }}
                />
              </small>
            </div>
          </div>
        </div>
        <div className="row hidden-md hidden-lg">
          <div className="col-12">
            <div className="divider" />
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  contact_data: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
}

FooterNav.propTypes = {
  links: PropTypes.array,
  language: PropTypes.string.isRequired
}

export default Footer
