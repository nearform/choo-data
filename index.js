'use strict'

var assert = require('assert')
var utils = require('./utils')

var isBrowser = typeof window !== 'undefined'

function store () {
  return function data (state, emitter, app) {
    assert.equal(state.async, true, 'choo-async decorator is required')
    // State
    state.data = state.data || {}

    // Events
    emitter.on('data:store', function (name, args, data, opts) {
      opts = opts || {}
      opts.render = opts.render || false

      state.data[name] = {
        args: args,
        data: data
      }
      opts.render && emitter.emit('render')
    })

    // Enhancements
    app.data = {
      load: function (name, loader, update, opts) {
        update = update || true
        opts = opts || {}
        opts.blocking = opts.blocking || false

        var store = state.data[name] || {}

        if (typeof update !== 'function') {
          update = utils.onChange(update)
        }
        var args = update(store.args)
        if (!args) {
          return store.data
        }
        var promise = loader(args, store.data)
        if (isBrowser && !opts.blocking) {
          // non-blocking
          promise.then(function (data) {
            emitter.emit('data:store', name, args, data, { render: true })
          })
        } else {
          // blocking
          return promise.then(function (data) {
            emitter.emit('data:store', name, args, data)
            return data
          })
        }
      }
    }
  }
}

module.exports = store
