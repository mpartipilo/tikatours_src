import React from "react"

const NotFoundPage = () => (
  <div className="row" style={{ marginBottom: 20 }}>
    <div className="col-12">
      <div className="jumbotron" style={{ textAlign: "center" }}>
        <h1>
          <p>Page Not Found</p>
          <small>
            <font color="red">Error 404</font>
          </small>
        </h1>
        <br />
        <p>
          The page you requested could not be found, either contact your
          webmaster or try again. Use your browsers <b>Back</b> button to
          navigate to the page you have prevously come from
        </p>
        <p>
          <b>Or you could just press this neat little button:</b>
        </p>
        <a href="/" className="btn btn-large btn-primary custom">
          <i className="glyphicon glyphicon-home" />
          <span>Take Me Home</span>
        </a>
      </div>
    </div>
  </div>
)

export default NotFoundPage
