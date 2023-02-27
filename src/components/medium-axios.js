import React, { useState, useEffect } from "react"
import axios from "axios"

const MediumAxios = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mlombog"
      )
      .then(response => setPosts(response.data.items))
  }, [])

  return (
    <div>
      <h1>Option 3</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title

          return (
            <li key={post.guid}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <a key={post.guid} href={post.link}>
                    <img alt="blog" width={250} src={post.thumbnail} />
                  </a>
                  <a href={post.link}>
                    <h2>{title}</h2>
                  </a>
                  <small>{post.pubDate}</small>
                </header>
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default MediumAxios
