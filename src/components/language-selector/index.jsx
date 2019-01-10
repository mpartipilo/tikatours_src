import React from "react"
import ReactCountryFlag from "react-country-flag"
import { Link } from "gatsby"
import ISO6391 from "iso-639-1"

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
      urlNoLang
    }
  }

  render() {
    return (
      <React.Fragment>
        <i className="fa fa-bars" />
        <a href="#">
          <ReactCountryFlag code={this.state.currentLanguage.countryCode} svg />{" "}
          {this.state.currentLanguage.languageName}
          <i className="fa fa-caret-down" />
          <i className="fa fa-caret-right" />
        </a>
        <ul>
          {this.state.languages.map(l => (
            <li key={l.languageCode}>
              <Link to={l.url}>
                <ReactCountryFlag code={l.countryCode} svg /> {l.languageName}
              </Link>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

export default LanguageSelector
