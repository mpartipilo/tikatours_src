import React from "react"
import PropTypes from "prop-types"

import data from "../i18n-data"

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

const BlogPostList = ({ posts }) =>
  posts.map(p => <BlogPost key={p.id} post={p} linkTitle={posts.length > 1} />)

const BlogPost = ({ post, linkTitle }) => (
  <div className="col-lg-12 blog-entry">
    {linkTitle && (
      <h2>
        <a href={post.post_url} title={post.title}>
          {post.name}
        </a>
      </h2>
    )}
    <hr />
    <p>
      <span className="fa fa-clock-o" /> Posted on {post.date_posted} in{" "}
      <a href={post.category.url}>{post.category.label}</a>
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

    const { blog_category, blog_post } = data[props.language]

    var posts = blog_post
      .sort((a, b) => b.date_posted.localeCompare(a.date_posted))
      .reduce((result, post) => {
        const category = blog_category.find(c => c.id == post.category_id)
        return result.concat([
          {
            ...post,
            category,
            post_url: `/${props.language}/blog/${category.url}/${post.url}`
          }
        ])
      }, [])

    const recent_posts = posts

    if (props.category_id) {
      var category = blog_category.find(c => c.id == props.category_id)
      posts = posts.filter(b => b.category_id == props.category_id)
    }

    if (props.post_id) {
      posts = posts.filter(b => b.id == props.post_id)
    }

    this.state = {
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
              <BlogPostList posts={this.state.posts} />
            </div>
            {/* <!-- pagination --> */}
          </div>

          <div className="col-lg-4">
            <div className="well well-small">
              <h3>Categories</h3>
              {this.state.category_list &&
                this.state.category_list.length > 0 && (
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
                        <a
                          href={`/${this.props.language}/blog/${c.url}`}
                          title={c.title}
                        >
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <div className="well well-small">
              <h3>Recent posts</h3>
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
                    <a
                      href={`/${this.props.language}/blog/${p.category.url}/${
                        p.url
                      }`}
                      title={p.title}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: truncate.apply(p.name, [45, true])
                        }}
                      />
                    </a>
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
  language: PropTypes.string.isRequired
}

export default Blog
