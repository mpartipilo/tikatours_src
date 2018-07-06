import React from "react"
import FontAwesome from "react-fontawesome"

import LanguageSelector from "../language-selector"
import { logo } from "../logos"

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  render() {
    const { languages, contact, navigation } = this.props
    return (
      <header>
        <div className="top">
          <a href="/" className="logo">
            <img src={logo} alt="Tika Tours logo" />
          </a>
          <FontAwesome
            onClick={this.toggleNavbar}
            name="bars"
            className="hidden-lg"
          />
          {contact.telephone && (
            <a className="visible-xs" href={`tel:${contact.telephone}`}>
              <FontAwesome name="phone" />
            </a>
          )}
          {this.state.isOpen && <span>==nav-main==</span>}
          <LanguageSelector languages={languages} selectedLanguage="en" />
        </div>
      </header>
    )
  }
}

export default Header
