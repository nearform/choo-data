const html = require('choo-async/html')

async function getPosts () {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  return response.json()
}

function posts (app) {
  return async (state, emit) => {
    const posts = await app.data.load('posts', getPosts)
    return html`
      <body>
        <div>
          ${posts
            ? posts.map(post => preview(post))
            : html`<p>Loading...</p>`
          }
        </div>
      </body>
    `
  }
}

function preview (post) {
  return html`
    <div>
      <a href="/post/${post.id}">${post.title}</a>
    </div>
  `
}

module.exports = posts
