import React from "react"
import Select, { components } from "react-select"
import ReactCountryFlag from "react-country-flag"

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props)

    var langRegex = /^\/([a-z]{2})\//i
    var urlLang = props.location.match(langRegex) || props.defaultLanguage
    var urlNoLang = props.location.replace(langRegex, "/")

    var currentUrl = props.location

    const options = props.languages.map(l => ({
      value: l.languageCode,
      label: l.languageName,
      url:
        (l.languageCode !== props.defaultLanguage ? `/${l.languageCode}` : "") +
        urlNoLang
    }))

    this.state = {
      currentUrl: currentUrl,
      options: options
    }
  }

  changeUrl(e) {
    window.location.href = e.target.value
  }

  render() {
    return (
      <select
        defaultValue={this.state.currentUrl}
        onChange={this.changeUrl.bind(this)}
      >
        {this.state.options.map(o => (
          <option key={o.value} value={o.url}>
            {o.label}
          </option>
        ))}
      </select>
    )
  }
}

const SingleValue = ({ ...props }) => (
  <components.SingleValue {...props}>
    <ReactCountryFlag
      code={props.data.value.countryCode}
      styleProps={{ padding: -4 }}
    />
  </components.SingleValue>
)

class LanguageSelectorFancy extends React.Component {
  constructor(props) {
    super(props)

    const options = props.languages.map(l => ({
      value: l,
      label: l.languageName
    }))

    this.state = {
      options,
      defaultValue:
        options.find(l => l.value.languageCode === props.selectedLanguage) ||
        options[0]
    }
  }

  render() {
    return (
      <Select
        defaultValue={this.state.defaultValue}
        components={{ SingleValue }}
        options={this.state.options}
        isSearchable={false}
        isClearable={false}
      />
    )
  }
}

export default LanguageSelector
export { LanguageSelector, LanguageSelectorFancy }
