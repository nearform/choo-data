const choo = require('choo')
const data = require('choo-data')

const home = require('./views/home')
const posts = require('./views/posts')
const post = require('./views/post')

const app = choo()

app.use(data())
app.route('/', home(app))
app.route('/posts', posts(app))
app.route('/post/:id', post(app))
app.mount('body')
