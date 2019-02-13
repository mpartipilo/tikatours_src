import React from "react"
import PropTypes from "prop-types"
import ReactCountryFlag from "react-country-flag"
import ISO6391 from "iso-639-1"
import FontAwesome from "react-fontawesome"
import { Link } from "gatsby"

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props)

    const langRegex = new RegExp(`^/${props.language}`, "i")
    const currentUrl = props.location
    const urlNoLang = currentUrl.replace(langRegex, "")

    var languagesLocal = props.languages.map(l => ({
      countryCode: l.flag,
      languageCode: l.value,
      languageName: ISO6391.getNativeName(l.value),
      url: urlNoLang.length > 1 ? `/${l.value}${urlNoLang}` : `/${l.value}`
    }))

    this.state = {
      currentLanguage: languagesLocal.find(
        l => l.languageCode == props.language
      ),
      languages: languagesLocal.filter(l => l.languageCode != props.language),
      urlNoLang,
      expanded: false
    }
  }

  render() {
    return (
      <li>
        <i
          className={`fa ${this.state.expanded ? "fa-times" : "fa-bars"}`}
          onClick={() => {
            this.setState({
              expanded: !this.state.expanded
            })
          }}
        />
        <a href="#">
          <ReactCountryFlag code={this.state.currentLanguage.countryCode} svg />{" "}
          {this.state.currentLanguage.languageName}
          <FontAwesome name="caret-down" />
          <FontAwesome name="caret-right" />
        </a>
        <ul style={{ display: this.state.expanded ? "block" : "none" }}>
          {this.state.languages.map(l => (
            <li key={l.languageCode}>
              <Link to={l.url}>
                <ReactCountryFlag code={l.countryCode} svg /> {l.languageName}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    )
  }
}

LanguageSelector.propTypes = {
  language: PropTypes.string,
  location: PropTypes.string,
  languages: PropTypes.array
}

export default LanguageSelector
