import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

import contentData from "../../components/i18n-data"
import PageWrapper from "../../components/page-wrapper"

class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    const { location, pathContext } = props
    const { strings } = contentData[pathContext.locale]

    this.state = {
      location,
      pathContext,
      strings,
      error: {
        tname: "",
        tname_class: "",
        fname: "",
        fname_class: "",
        lname: "",
        lname_class: "",
        email: "",
        email_class: "",
        mobile: "",
        mobile_class: "",
        comments: "",
        comments_class: "",
        captcha: "",
        captcha_class: ""
      },
      tname: "",
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      comments: "",
      captcha: "",
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChangeTName = this.handleInputChangeTName.bind(this)
    this.handleInputChangeFName = this.handleInputChangeFName.bind(this)
    this.handleInputChangeLName = this.handleInputChangeLName.bind(this)
    this.handleInputChangeEmail = this.handleInputChangeEmail.bind(this)
    this.handleInputChangeMobile = this.handleInputChangeMobile.bind(this)
    this.handleInputChangeMessage = this.handleInputChangeMessage.bind(this)
    this.handleInputChangeCaptcha = this.handleInputChangeCaptcha.bind(this)
  }

  handleInputChangeTName(event) {
    this.setState({ tname: event.target.value })
  }

  handleInputChangeFName(event) {
    this.setState({ fname: event.target.value })
  }

  handleInputChangeLName(event) {
    this.setState({ lname: event.target.value })
  }

  handleInputChangeEmail(event) {
    this.setState({ email: event.target.value })
  }

  handleInputChangeMobile(event) {
    this.setState({ mobile: event.target.value })
  }

  handleInputChangeMessage(event) {
    this.setState({ comments: event.target.value })
  }

  handleInputChangeCaptcha(event) {
    this.setState({ captcha: event.target.value })
  }

  handleSubmit(event) {
    const form = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      mobile: this.state.mobile,
      comments: this.state.comments,
      captcha: this.state.captcha
    }
    var hasErrors = false
    var error = {
      fname: "",
      fname_class: "",
      lname: "",
      lname_class: "",
      email: "",
      email_class: "",
      mobile: "",
      mobile_class: "",
      comments: "",
      comments_class: "",
      captcha: "",
      captcha_class: ""
    }

    if (form.fname.length == 0) {
      hasErrors = true
      error.fname = this.state.strings.required_fname
      error.fname_class = "error"
    }

    if (form.lname.length == 0) {
      hasErrors = true
      error.lname = this.state.strings.required_lname
      error.lname_class = "error"
    }

    if (form.email.length == 0) {
      hasErrors = true
      error.email = this.state.strings.required_email
      error.email_class = "error"
    }

    //if (form.captcha.length == 0) {
    //  hasErrors = true
    //  error.captcha = this.state.strings.required_captcha
    //  error.captcha_class = "error"
    //}

    this.setState({ error: error, submitted: !hasErrors })

    alert("A form was submitted: " + JSON.stringify(form))
    event.preventDefault()
  }

  render() {
    const enable_captcha = false
    return (
      <PageWrapper
        location={this.state.location}
        locale={this.state.pathContext.locale}
        content={{
          page_id: 15,
          module_id: 1
        }}
      >
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            {this.state.submitted ? (
              <div className="contact-submitted">
                <p>Thank you</p>
              </div>
            ) : (
              <React.Fragment>
                <p style={{ marginTop: 0 }}>
                  <span className="text-danger">*</span>
                  {this.state.strings.required_fields}
                </p>
                <form
                  onSubmit={this.handleSubmit}
                  role="form"
                  className="custom-form"
                >
                  <div className={`form-group ${this.state.error.tname_class}`}>
                    <label htmlFor="tour" className="control-label">
                      {this.state.strings.tour_name}
                      <span className="text-danger">*</span>
                    </label>
                    <Route
                      render={({ location }) => (
                        <Route
                          location={location}
                          key={location.key}
                          path="/:language/:page/:tour_code?"
                          render={({
                            match: {
                              params: { tour_code }
                            }
                          }) => (
                            <select
                              name="tour"
                              className="form-control"
                              style={{ width: "100%", padding: "0 6px" }}
                              onChange={this.handleInputChangeTName}
                              defaultValue={tour_code}
                            >
                              <option value="">Please select tour name</option>
                              <option value="1">Tour 1</option>
                              <option value="2">Tour 2</option>
                            </select>
                          )}
                        />
                      )}
                    />
                    <p className="text-danger">{this.state.error.tname}</p>
                  </div>
                  <div className={`form-group ${this.state.error.fname_class}`}>
                    <label htmlFor="fname" className="control-label">
                      {this.state.strings.first_name}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="fname"
                      value={this.state.fname}
                      className="form-control"
                      name="fname"
                      onChange={this.handleInputChangeFName}
                    />
                    <p className="text-danger">{this.state.error.fname}</p>
                  </div>
                  <div className={`form-group ${this.state.error.lname_class}`}>
                    <label htmlFor="lname" className="control-label">
                      {this.state.strings.last_name}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="lname"
                      value={this.state.lname}
                      className="form-control"
                      name="lname"
                      onChange={this.handleInputChangeLName}
                    />
                    <p className="text-danger">{this.state.error.lname}</p>
                  </div>
                  <div className={`form-group ${this.state.error.email_class}`}>
                    <label htmlFor="email" className="control-label">
                      {this.state.strings.email}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={this.state.email}
                      className="form-control"
                      name="email"
                      onChange={this.handleInputChangeEmail}
                    />
                    <p className="text-danger">{this.state.error.email}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile" className="control-label">
                      {this.state.strings["phone/mobile"]}
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      className="form-control"
                      value={this.state.mobile}
                      name="mobile"
                      onChange={this.handleInputChangeMobile}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="comments" className="control-label">
                      {this.state.strings.message}
                    </label>
                    <textarea
                      rows="4"
                      name="comments"
                      id="comments"
                      className="form-control"
                      onChange={this.handleInputChangeMessage}
                      value={this.state.comments}
                    />
                  </div>
                  {enable_captcha && (
                    <div className="form-group">
                      <label>
                        {this.state.strings.captcha}
                        <span className="text-danger">*</span>
                      </label>
                      <div>
                        <div style={{ marginBottom: "10px" }}>
                          <img
                            src="$htmlrootfull/captcha.jpg"
                            alt="spam control image"
                            id="anti-spam"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder={
                            this.state.strings.enter_text_you_see_above
                          }
                          value={this.state.captcha}
                          name="captcha"
                          id="captcha-inp"
                          className="form-control"
                          style={{ width: "300px" }}
                          autoComplete="off"
                          onChange={this.handleInputChangeCaptcha}
                        />
                        <p className="text-danger">
                          {this.state.error.captcha}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn"
                      name="continue"
                      value="continue"
                    >
                      {this.state.strings.submit}
                    </button>
                  </div>
                </form>
              </React.Fragment>
            )}
          </div>
        </div>
      </PageWrapper>
    )
  }
}

ContactPage.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired
}

export default ContactPage
