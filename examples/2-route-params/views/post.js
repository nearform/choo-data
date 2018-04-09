const html = require('choo-async/html')

async function getPost (id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  return response.json()
}

function post (app) {
  return async (state, emit) => {
    const post = await app.data.load('post', getPost, state.params.id)
    return html`
      <body>
        ${post
          ? html`
            <div>
              <h2>${post.title}</h2>
              <p>${post.body}</p>
            </div>
          `
          : html`<p>Loading...</p>`
        }
      </body>
    `
  }
}

module.exports = post
