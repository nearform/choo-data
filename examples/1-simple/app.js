const choo = require('choo')
const data = require('choo-data')
const async = require('choo-async')
const html = require('choo-async/html')

const app = async(choo())

app.use(data())
app.route('/', view)
app.mount('body')

async function view (state, emit) {
  const post = await app.data.load('post', getData, 1)
  return html`
    <body>
      ${post
        ? html`<p>${post.title}</p>`
        : html`<p>Loading...</p>`
      }
    </body>
  `
}

async function getData (id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  return response.json()
}