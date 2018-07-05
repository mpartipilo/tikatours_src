import React from "react"
import Select, { components } from "react-select"
import ReactCountryFlag from "react-country-flag"

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    <ReactCountryFlag code={props.data.value.countryCode} />
  </components.SingleValue>
)

const Option = props => (
  <div>
    <ReactCountryFlag
      code={props.data.value.countryCode}
      styleProps={{ padding: -4 }}
    />
    <components.Option {...props} />
  </div>
)

class LanguageSelector extends React.Component {
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
        components={{ SingleValue, Option }}
        options={this.state.options}
        isSearchable={false}
        isClearable={false}
      />
    )
  }
}

export default LanguageSelector
