import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const MediumRssFeed = () => {
  const data = useStaticQuery(graphql`
    {
      allFeedMediumBlog {
        edges {
          node {
            title
            link
            content
          }
        }
      }
    
      feedMediumBlog {
        title
        link
        content
      }
    }
  `)

  const posts = data.allFeedMediumBlog.edges

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
      <h1>Option 2</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.node.title
          
          return (
            <li>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <a
                    key={post.node.id}
                    href={post.node.link}
                  >
                  </a>
                  <a
                    href={post.node.link}
                  >
                    <h2>{title}</h2>
                  </a>
                </header>
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default MediumRssFeed
