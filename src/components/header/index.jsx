import React from "react"
import PropTypes from "prop-types"
import FontAwesome from "react-fontawesome"
import { Link } from "gatsby"

import LanguageSelector from "../language-selector"
import { logo } from "../logos"

import { findInTree } from "../i18n-data"

class NavigationItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  render() {
    const { languages, currentLanguage, level, item, active } = this.props
    const { path, title, pages } = item
    return (
      <li key={path} className={active ? "active" : undefined}>
        {pages && (
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
        )}
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
  const locationRootPath = findInTree(location, menu)

  return (
    <ul style={{ display: expanded ? "block" : "none" }}>
      {menu.pages.map(p => {
        const menuItemRootPath = findInTree(p.path, menu)
        const match =
          level === 0 &&
          locationRootPath &&
          menuItemRootPath &&
          locationRootPath.path[1] === menuItemRootPath.path[1]
        return (
          <NavigationItem
            key={p.path}
            item={p}
            active={match}
            {...{ languages, currentLanguage, level }}
          />
        )
      })}
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
      isOpen: false
    }

    this.thresholdCrossed = false
    this.setCollapsibleElement = React.createRef()
    this.divTopHeader = React.createRef()
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
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
    if (this.divTopHeader.current == null) {
      return
    }

    const el = document.scrollingElement || document.documentElement
    const scrollTop = el.scrollTop
    const height = this.divTopHeader.clientHeight

    const scrollPoint = scrollTop - height * 1.5

    const thresholdCrossed = scrollPoint >= height

    if (this.thresholdCrossed == thresholdCrossed) {
      return
    }

    this.thresholdCrossed = thresholdCrossed
    if (thresholdCrossed) {
      this.divTopHeader.current.classList.add("fixed")
      this.divTopHeader.current.classList.add("fade-in")
    } else {
      this.divTopHeader.current.classList.remove("fixed")
      this.divTopHeader.current.classList.remove("fade-in")
    }
  }

  render() {
    const {
      location,
      languages,
      currentLanguage,
      contact,
      navigation
    } = this.props

    return (
      <header>
        <div
          className={"top " + (this.thresholdCrossed ? "fixed fade-in" : "")}
          ref={this.divTopHeader}
        >
          <Link to={navigation.path} className="logo">
            <img src={logo} alt={navigation.title} />
          </Link>
          <i className="fa fa-bars d-xl-none" onClick={this.toggleNavbar} />
          {contact.telephone && (
            <a className="d-block d-sm-none" href={`tel:${contact.telephone}`}>
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
  contact: PropTypes.object,
  navigation: PropTypes.object.isRequired
}

NavigationMenu.propTypes = {
  expanded: PropTypes.bool,
  menu: PropTypes.object,
  level: PropTypes.number,
  location: PropTypes.string,
  languages: PropTypes.array.isRequired,
  currentLanguage: PropTypes.string.isRequired
}

NavigationItem.defaultProps = {
  active: false
}

NavigationItem.propTypes = {
  level: PropTypes.number,
  location: PropTypes.string,
  languages: PropTypes.array.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  active: PropTypes.bool
}

export default Header
