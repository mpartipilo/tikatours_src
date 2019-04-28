import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

function truncate(n, useWordBoundary) {
  if (this.length <= n) {
    return this
  }
  var subString = this.substr(0, n - 1)
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;"
  )
}

const BlogPostList = ({ posts, strings }) =>
  posts.map(p => (
    <BlogPost
      key={p.id}
      post={p}
      linkTitle={posts.length > 1}
      strings={strings}
    />
  ))

const BlogPost = ({ post, linkTitle, strings }) => (
  <div className="col-lg-12 blog-entry">
    {linkTitle && (
      <h2>
        <Link to={post.post_url} title={post.title}>
          {post.name}
        </Link>
      </h2>
    )}
    <hr />
    <p>
      <span className="fa fa-clock-o" />
      {strings["posted_on"]}
      {post.date_posted}
      {strings["_in_"]}
      <Link to={post.category.url}>{post.category.label}</Link>
    </p>
    <div className="description">
      <hr />
      <span dangerouslySetInnerHTML={{ __html: post.long_description }} />
      <hr />
    </div>
  </div>
)

class Blog extends React.Component {
  constructor(props) {
    super(props)

    const { blog_post, blog_category, strings, language } = props

    var posts = (blog_post || [])
      .sort((a, b) => b.date_posted.localeCompare(a.date_posted))
      .reduce((result, post) => {
        const category = blog_category.find(c => c.id == post.category_id)
        return result.concat([
          {
            ...post,
            category,
            post_url: `/${language}/${post.url}`
          }
        ])
      }, [])

    const recent_posts = posts

    if (props.category_id) {
      var category = blog_category.find(c => c.id == props.category_id)
      posts = posts.filter(b => b.category_id == props.category_id)
    }

    if (props.post_id) {
      posts = posts.filter(b => b.post_id == props.post_id)
    }

    this.state = {
      strings,
      category_list: blog_category,
      recent_posts,
      category,
      posts
    }
  }

  render() {
    var output = (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <BlogPostList
                posts={this.state.posts}
                strings={this.state.strings}
              />
            </div>
            {/* <!-- pagination --> */}
          </div>

          <div className="col-lg-4">
            <div className="well well-small">
              <h3>{this.state.strings["categories"]}</h3>
              {this.state.category_list && this.state.category_list.length > 0 && (
                <ul className="list-unstyled">
                  {this.state.category_list.map(c => (
                    <li
                      key={c.id}
                      className={
                        (this.state.category &&
                          this.state.category.id == c.id &&
                          "active") ||
                        ""
                      }
                    >
                      <Link
                        to={`/${this.props.language}/${c.url}`}
                        title={c.title}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="well well-small">
              <h3>{this.state.strings["recent_posts"]}</h3>
              <ul className="list-unstyled">
                {this.state.recent_posts.map(p => (
                  <li
                    key={p.id}
                    className={
                      (this.state.posts &&
                        this.props.post_id == p.id &&
                        "active") ||
                      ""
                    }
                  >
                    <Link
                      to={`/${this.props.language}/${p.url}`}
                      title={p.title}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: truncate.apply(p.name, [45, true])
                        }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    )

    return <div className="blog">{output}</div>
  }
}

Blog.propTypes = {
  page_id: PropTypes.number,
  module_id: PropTypes.number,
  category_id: PropTypes.number,
  post_id: PropTypes.number,
  language: PropTypes.string.isRequired,
  blog_post: PropTypes.array.isRequired,
  blog_category: PropTypes.array.isRequired,
  strings: PropTypes.object.isRequired
}

export default Blog
