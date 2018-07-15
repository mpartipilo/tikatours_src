import React from "react"
import PropTypes from "prop-types"

import content from "../../../data/content.json"
import content_column from "../../../data/content_column.json"
import content_row from "../../../data/content_row.json"

class Content extends React.Component {
  constructor(props) {
    super(props)
    var content_index = content.find(
      c => c.page_id == props.page_id && c.module_id == props.module_id
    )

    var content_rows = []

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

      rows.forEach(r => content_rows.push(r))

      this.state = {
        rows: content_rows
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
  module_id: PropTypes.number
}

export default Content
