import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const MediumPlugin = () => {
  const data = useStaticQuery(graphql`
    {
      allMediumPost(sort: { createdAt: DESC }) {
        edges {
          node {
            id
            uniqueSlug
            title
            createdAt(formatString: "MMM YYYY")
            virtuals {
              subtitle
              readingTime
              previewImage {
                imageId
              }
            }
            author {
              username
            }
          }
        }
      }
    }
  `)

  const posts = data.allMediumPost.edges

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to "content/blog" (or the
        directory you specified for the "gatsby-source-filesystem" plugin in
        gatsby-config.js).
      </p>
    )
  }

  return (
    <div>
      <h1>Option 1</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.node.title
          const subtitle = post.node.virtuals.subtitle

          return (
            <li key={post.node.id}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <a
                    key={post.node.id}
                    href={`https://medium.com/@mlombog/${post.node.uniqueSlug}`}
                  >
                    <img
                      alt="blog"
                      src={`https://miro.medium.com/max/500/${post.node.virtuals.previewImage.imageId}`}
                    />
                  </a>
                  <a
                    href={`https://medium.com/@mlombog/${post.node.uniqueSlug}`}
                  >
                    <h2>{title}</h2>
                    <h5>{subtitle}</h5>
                  </a>
                  <small>{post.node.createdAt}</small>
                </header>
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default MediumPlugin
