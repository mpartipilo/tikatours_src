import React from "react"
import FontAwesome from "react-fontawesome"

import LanguageSelector from "../language-selector"
import { logo } from "../logos"

const NavigationMenu = ({
  menu,
  level,
  location,
  languages,
  defaultLanguage
}) => (
  <ul>
    {menu.pages.map(p => (
      <li key={p.path}>
        <i className="fa fa-bars" />
        <a href={p.path}>{p.title}</a>
        {p.pages && (
          <React.Fragment>
            <i className="fa fa-caret-down" />
            <i className="fa fa-caret-right" />
            <NavigationMenu menu={p} level={level + 1} />
          </React.Fragment>
        )}
      </li>
    ))}
    {level === 0 && (
      <li>
        <LanguageSelector
          location={location.pathname}
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
      defaultLanguage,
      contact,
      navigation
    } = this.props
    return (
      <header>
        <div className="top">
          <a href="/" className="logo">
            <img src={logo} alt="Tika Tours logo" />
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
          />
        </nav>
      </header>
    )
  }
}

export default Header
