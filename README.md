# choo-data

Simple data fetching plugin for Choo with SSR (server-side rendering) support.

[Usage](#usage) -
[Install](#install) -
[License: MIT](#license)

[![stability][stability-image]][stability-url]
[![standard][standard-image]][standard-url]

[stability-image]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Usage

```js
const choo = require('choo')
const html = require('choo/html')
const data = require('choo-data')

const app = choo()

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
```

See [examples](https://github.com/nearform/choo-data/tree/master/examples) for more

## Install

```
npm install choo-data
```

## License

[MIT](LICENSE.md)
