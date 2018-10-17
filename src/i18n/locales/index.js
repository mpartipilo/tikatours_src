/* eslint-disable global-require */

const localeData = [
  ...require("react-intl/locale-data/en"),
  ...require("react-intl/locale-data/zh")
]

module.exports = {
  localeData,
  languages: [
    { value: "en", text: "English", flag: "US" },
    { value: "zh", text: "Chinese", flag: "CN" }
  ]
}
