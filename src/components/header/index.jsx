import React from "react"
import PropTypes from "prop-types"
import FontAwesome from "react-fontawesome"
import { Link } from "gatsby"

import LanguageSelector from "../language-selector"
import { logo } from "../logos"

import { contentData } from "../i18n-data"

const NavigationMenu = ({
  menu,
  level,
  location,
  languages,
  currentLanguage
}) => (
  <ul>
    {menu.pages.map(p => (
      <li key={p.path}>
        <i className="fa fa-bars" />
        <Link to={p.path}>
          {p.title}
          {p.pages && (
            <React.Fragment>
              <FontAwesome name="caret-down" />
              <FontAwesome name="caret-right" />
            </React.Fragment>
          )}
        </Link>
        {p.pages && (
          <NavigationMenu
            languages={languages}
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
    const { location, languages, currentLanguage, contact } = this.props

    const { navigation } = contentData[currentLanguage]

    return (
      <header>
        <div className="top">
          <Link to={navigation.path} className="logo">
            <img src={logo} alt={navigation.title} />
          </Link>
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
            currentLanguage={currentLanguage}
          />
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  location: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  contact: PropTypes.object
}

NavigationMenu.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
  location: PropTypes.string,
  languages: PropTypes.array.isRequired,
  currentLanguage: PropTypes.string.isRequired
}

export default Header
