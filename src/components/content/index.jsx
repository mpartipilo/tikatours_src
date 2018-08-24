import React from "react"
import PropTypes from "prop-types"

import data from "../i18n-data"

class Content extends React.Component {
  constructor(props) {
    super(props)

    const { content, content_row, content_column } = data[props.language]

    var content_index = content.find(
      c => c.page_id == props.page_id && c.module_id == props.module_id
    )

    if (content_index) {
      var rows = content_row
        .filter(c => c.content_id == content_index.id)
        .sort((a, b) => a.rank - b.rank)
        .map(r => ({
          id: r.id,
          columns: content_column
            .filter(c => c.content_row_id == r.id)
            .sort((a, b) => a.rank - b.rank)
            .map(c => ({
              id: c.id,
              content: c.content,
              css_class: c.css_class
            }))
        }))

      this.state = {
        rows
      }
    }
  }

  render() {
    return (
      this.state.rows &&
      this.state.rows.map(r => (
        <div className="row content-row" key={r.id}>
          {r.columns.map(c => (
            <div
              key={c.id}
              className={c.css_class}
              dangerouslySetInnerHTML={{ __html: c.content }}
            />
          ))}
        </div>
      ))
    )
  }
}

Content.propTypes = {
  page_id: PropTypes.number,
  module_id: PropTypes.number,
  language: PropTypes.string.isRequired
}

export default Content
