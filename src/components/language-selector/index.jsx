import React from "react"
import Select, { components } from "react-select"
import ReactCountryFlag from "react-country-flag"

const LanguageSelector = props => {
  const options = props.languages.map(l => ({
    value: l.languageCode,
    label: l.languageName
  }))

  return (
    <select defaultValue={props.selectedLanguage}>
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
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
