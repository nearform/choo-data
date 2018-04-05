const html = require('choo/html')

function home (app) {
  return (state, emit) => html`
    <body>
      <div>
        <h1>Welcome!</h1>
        <a href="/posts">Post list</a>
      </div>
    </body>
  `
}

module.exports = home
