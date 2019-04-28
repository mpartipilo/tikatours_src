import React from "react"
import PropTypes from "prop-types"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"

class ContactPageForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      strings: props.strings,
      options: props.tours,
      selectedTour: props.selectedTour,
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
      tname: props.selectedTour,
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
    this.getForm = this.getForm.bind(this)
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

  handleInputChangeCaptcha(value) {
    this.setState({ captcha: value })
  }

  getForm() {
    const { tname, fname, lname, email, mobile, comments, captcha } = this.state
    return {
      tname,
      fname,
      lname,
      email,
      mobile,
      comments,
      captcha
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const form = this.getForm()

    var hasErrors = false
    var error = {
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
      captcha_class: "",
      general: {}
    }

    if (
      this.state.options &&
      this.state.options.length > 0 &&
      form.tname &&
      form.tname.length == 0
    ) {
      hasErrors = true
      error.tname = this.state.strings.required_tname
      error.tname_class = "error"
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
    if (form.captcha.length == 0) {
      hasErrors = true
      error.captcha = this.state.strings.required_captcha
      error.captcha_class = "error"
    }
    if (!hasErrors) {
      var formData = new FormData()

      if (this.state.options && this.state.options.length >= 1) {
        formData.append("tname", form.tname)
      }

      formData.append("fname", form.fname)
      formData.append("lname", form.lname)
      formData.append("email", form.email)
      formData.append("mobile", form.mobile)
      formData.append("comments", form.comments)
      formData.append("captcha", form.captcha)

      axios
        .post("/server/enquiry.php", formData)
        .then(response => {
          if (response.data.success == false) {
            error.general = response.data.message
          }
          this.setState({ error: error, submitted: response.data.success })
        })
        .catch(err => {
          error.general = err
          this.setState({ error: error, submitted: false })
        })
    } else {
      this.setState({ error: error, submitted: !hasErrors })
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-sm-6">
          {this.state.submitted ? (
            <div className="contact-submitted">
              <p>{this.state.strings["Thank_you"]}</p>
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
                {this.state.options && (
                  <div className={`form-group ${this.state.error.tname_class}`}>
                    <label htmlFor="tour" className="control-label">
                      {this.state.strings.tour_name}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      name="tour"
                      className="form-control"
                      style={{ width: "100%", padding: "0 6px" }}
                      onChange={this.handleInputChangeTName}
                      defaultValue={this.state.selectedTour}
                    >
                      <option value="">Please select tour name</option>
                      {this.state.options.map(o => (
                        <option key={o.tour_id} value={o.tour_id}>
                          {o.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-danger">{this.state.error.tname}</p>
                  </div>
                )}
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
                    {this.state.strings["phone_mobile"]}
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
                <div className="form-group">
                  <label>
                    {this.state.strings.captcha}
                    <span className="text-danger">*</span>
                  </label>
                  <div>
                    <ReCAPTCHA
                      sitekey="6Lf5wHIUAAAAAAO7KILmBzGz2TgN0yeipSqxwXhb"
                      onChange={this.handleInputChangeCaptcha}
                    />
                  </div>
                </div>
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
    )
  }
}

ContactPageForm.propTypes = {
  strings: PropTypes.object,
  selectedTour: PropTypes.object,
  tours: PropTypes.array
}

export default ContactPageForm
