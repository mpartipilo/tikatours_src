import React from "react"
import PropTypes from "prop-types"
import FontAwesome from "react-fontawesome"
import { Link } from "gatsby"

import LanguageSelector from "../language-selector"
import { logo } from "../logos"

import { contentData } from "../i18n-data"

class NavigationItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  render() {
    const { languages, currentLanguage, level, item } = this.props
    const { path, title, pages } = item
    return (
      <li key={path}>
        <i
          className={`fa ${
            pages && this.state.expanded ? "fa-times" : "fa-bars"
          }`}
          onClick={() => {
            this.setState({
              expanded: !this.state.expanded
            })
          }}
        />
        <Link to={path}>
          {title}
          {pages && (
            <React.Fragment>
              <FontAwesome name="caret-down" />
              <FontAwesome name="caret-right" />
            </React.Fragment>
          )}
        </Link>
        {pages && (
          <NavigationMenu
            languages={languages}
            currentLanguage={currentLanguage}
            menu={item}
            level={level + 1}
            expanded={this.state.expanded}
          />
        )}
      </li>
    )
  }
}

const NavigationMenu = ({
  menu,
  level,
  location,
  languages,
  currentLanguage,
  expanded = true
}) => {
  return (
    <ul style={{ display: expanded ? "block" : "none" }}>
      {menu.pages.map(p => (
        <NavigationItem
          key={p.path}
          item={p}
          {...{ languages, currentLanguage, level }}
        />
      ))}
      {level === 0 && (
        <LanguageSelector
          language={currentLanguage}
          location={location}
          languages={languages}
        />
      )}
    </ul>
  )
}

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      height: 0,
      thresholdCrossed: false
    }

    this.setCollapsibleElement = React.createRef()
    this.divTopHeader = null
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    const height = this.divTopHeader.clientHeight
    this.setState({ height })

    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  toggleNavbar() {
    window.scrollTo({ top: 0, behavior: "smooth" })
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  handleScroll(event) {
    const el = document.scrollingElement || document.documentElement
    const scrollTop = el.scrollTop

    const scrollPoint = scrollTop - this.state.height * 1.5

    if (scrollPoint < this.state.height) {
      this.setState({ thresholdCrossed: false })
    } else {
      this.setState({ thresholdCrossed: true })
    }
  }

  render() {
    const { location, languages, currentLanguage, contact } = this.props

    const { navigation } = contentData[currentLanguage]

    return (
      <header>
        <div
          className={
            "top " + (this.state.thresholdCrossed ? "fixed fade-in" : "")
          }
          ref={divTopHeader => (this.divTopHeader = divTopHeader)}
        >
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
        <nav
          ref={this.setCollapsibleElement}
          style={{ display: this.state.isOpen ? "block" : "none" }}
        >
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
  expanded: PropTypes.bool,
  menu: PropTypes.object,
  level: PropTypes.number,
  location: PropTypes.string,
  languages: PropTypes.array.isRequired,
  currentLanguage: PropTypes.string.isRequired
}

NavigationItem.propTypes = {
  level: PropTypes.number,
  location: PropTypes.string,
  languages: PropTypes.array.isRequired,
  currentLanguage: PropTypes.string.isRequired
}

export default Header
