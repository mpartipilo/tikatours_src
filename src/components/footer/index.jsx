import React from "react"

const data = {
  phone: "+995 570 70 72 14",
  email: "info@tikatours.com",
  address: `11, Grishashvili str.
            0105
            Tbilisi, Georgia`,
  copyright: "© Copyright 2018. Tika Tours.",
  credits: "Website by Michelangelo Partipilo",
  navFooter: [
    {
      title: "About",
      url: "/about"
    },
    {
      title: "Contact us",
      url: "/contact-us"
    }
  ]
}

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

const Footer = props => (
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

export default Footer
