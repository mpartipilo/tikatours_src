/* eslint no-param-reassign: 0 */
import React, { Component } from "react"
import PropTypes from "prop-types"

class HeightMatchingGroup extends Component {
  constructor(props) {
    super(props)

    this.getMaxHeight = this.getMaxHeight.bind(this)
    this.matchHeights = this.matchHeights.bind(this)
  }

  componentDidMount() {
    window.addEventListener("resize", this.matchHeights)
    setTimeout(this.matchHeights, 500)
  }

  componentDidUpdate() {
    this.matchHeights()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.matchHeights)
  }

  getMaxHeight(els) {
    return Array.prototype.map
      .call(els, el => el.scrollHeight)
      .reduce((pre, cur) => Math.max(pre, cur), -Infinity)
  }

  matchHeights() {
    if (this.props.containerRef.current == null) {
      return
    }

    const els = this.props.containerRef.current.querySelectorAll(
      this.props.selector
    )
    els.forEach(el => {
      el.style.height = null
    })
    const maxHeight = this.getMaxHeight(els)
    els.forEach(el => {
      el.style.height = `${maxHeight}px`
    })
  }

  render() {
    return <>{this.props.children}</>
  }
}

HeightMatchingGroup.propTypes = {
  children: PropTypes.node.isRequired,
  containerRef: PropTypes.any.isRequired,
  selector: PropTypes.string
}

HeightMatchingGroup.defaultProps = {
  selector: ".match-height"
}

export default HeightMatchingGroup
