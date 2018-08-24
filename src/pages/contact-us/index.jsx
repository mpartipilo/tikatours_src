import React from "react"
import PropTypes from "prop-types"

import PageWrapper from "../../components/page-wrapper"

const error = {
  fname: "",
  fname_class: "",
  lname: "",
  email: "",
  captcha: ""
}

const comments = ""

const Page = ({ location, pathContext }) => (
  <PageWrapper
    location={location}
    locale={pathContext.locale}
    content={{
      page_id: 8,
      module_id: 3
    }}
  >
    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <p style={{ marginTop: 0 }}>
          <span className="text-danger">*</span> indicates required fields
        </p>
        <form
          action="submit_form.php"
          method="post"
          role="form"
          className="custom-form"
        >
          <div className={`form-group ${error.fname_class}`}>
            <label htmlFor="fname" className="control-label">
              First Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="fname"
              value="fname"
              className="form-control"
              name="fname"
            />
            <p className="text-danger">{error.fname}</p>
          </div>
          <div className="form-group lname_error_class">
            <label htmlFor="lname" className="control-label">
              Last Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="lname"
              value="$lname"
              className="form-control"
              name="lname"
            />
            <p className="text-danger">{error.lname}</p>
          </div>
          <div className="form-group email_error_class">
            <label htmlFor="email" className="control-label">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              id="email"
              value="$email"
              className="form-control"
              name="email"
            />
            <p className="text-danger">{error.email}</p>
          </div>
          <div className="form-group">
            <label htmlFor="mobile" className="control-label">
              Phone/Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              className="form-control"
              value="$mobile"
              name="mobile"
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments" className="control-label">
              Message
            </label>
            <textarea
              rows="4"
              name="comments"
              id="comments"
              className="form-control"
            >
              {comments}
            </textarea>
          </div>
          <div className="form-group">
            <label>
              Anti Spam Captcha<span className="text-danger">*</span>
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
                placeholder="Please enter the text you see above"
                value=""
                name="captcha"
                id="captcha-inp"
                className="form-control"
                style={{ width: "300px" }}
                autoComplete="off"
              />
              <p className="text-danger">{error.captcha}</p>
            </div>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn"
              name="continue"
              value="continue"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </PageWrapper>
)

Page.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object.isRequired
}

export default Page
