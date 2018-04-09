const choo = require('choo')
const data = require('choo-data')
const async = require('choo-async')

const home = require('./views/home')
const posts = require('./views/posts')
const post = require('./views/post')

const app = async(choo())

app.use(data())
app.route('/', home(app))
app.route('/posts', posts(app))
app.route('/post/:id', post(app))
app.mount('body')
