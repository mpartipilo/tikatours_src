import React from "react"
import PropTypes from "prop-types"
import FontAwesome from "react-fontawesome"

import LanguageSelector from "../language-selector"
import { logo } from "../logos"

import data from "../i18n-data"

const NavigationMenu = ({
  menu,
  level,
  location,
  languages,
  currentLanguage,
  defaultLanguage
}) => (
  <ul>
    {menu.pages.map(p => (
      <li key={p.path}>
        <i className="fa fa-bars" />
        <a href={p.path}>
          {p.title}
          {p.pages && (
            <React.Fragment>
              <i className="fa fa-caret-down" />
              <i className="fa fa-caret-right" />
            </React.Fragment>
          )}
        </a>
        {p.pages && (
          <NavigationMenu
            currentLanguage={currentLanguage}
            menu={p}
            level={level + 1}
          />
        )}
      </li>
    ))}
    {level === 0 && (
      <li>
        <LanguageSelector
          language={currentLanguage}
          location={location}
          languages={languages}
          defaultLanguage={defaultLanguage}
        />
      </li>
    )}
  </ul>
)

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
    const {
      location,
      languages,
      currentLanguage,
      defaultLanguage,
      contact
    } = this.props

    const { navigation } = data[currentLanguage]

    return (
      <header>
        <div className="top">
          <a href={navigation.path} className="logo">
            <img src={logo} alt={navigation.title} />
          </a>
          <i className="fa fa-bars hidden-lg" onClick={this.toggleNavbar} />
          {contact.telephone && (
            <a className="visible-xs" href={`tel:${contact.telephone}`}>
              <FontAwesome name="phone" />
            </a>
          )}
        </div>
        <nav style={{ display: this.state.isOpen ? "block" : "none" }}>
          <NavigationMenu
            menu={navigation}
            level={0}
            location={location}
            languages={languages}
            defaultLanguage={defaultLanguage}
            currentLanguage={currentLanguage}
          />
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  location: PropTypes.string.isRequired,
  languages: PropTypes.array,
  currentLanguage: PropTypes.string,
  defaultLanguage: PropTypes.string,
  contact: PropTypes.object
}

NavigationMenu.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
  location: PropTypes.string,
  languages: PropTypes.array,
  currentLanguage: PropTypes.string,
  defaultLanguage: PropTypes.string
}

export default Header
