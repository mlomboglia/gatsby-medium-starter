import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import MediumRSSFeed from "../components/medium-rss-feed"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMediumPost.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Option 2</h1>
      <MediumRSSFeed />
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
                    <a key={post.node.id} href={`https://medium.com/@mlombog/${post.node.uniqueSlug}`}>
                      <img alt="blog" src={`https://miro.medium.com/max/500/${post.node.virtuals.previewImage.imageId}`} />
                    </a>
                    <a href={`https://medium.com/@mlombog/${post.node.uniqueSlug}`}>
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
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMediumPost(sort: {createdAt: DESC}) {
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
`
