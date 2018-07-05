import React from "react"
import FontAwesome from "react-fontawesome"

import LanguageSelector from "../language-selector"
import { logo } from "../logos"

import "./_index.scss"

class Header extends React.Component {
  state = {
    isOpen: false
  }

  toggleNavbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  render() {
    const { languages, contact } = this.props
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
