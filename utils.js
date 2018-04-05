const equal = require('deep-equal')

function onChange (current) {
  return function (prev) {
    if (!equal(prev, current, { strict: true })) {
      return current
    }
  }
}

function onChangeWith (current, update) {
  return function (prev) {
    prev = prev || []
    const changed = !equal(prev[0], current, { strict: true })
    const extra = changed ? update() : update(prev[1])
    if (changed || !equal(prev[1], extra)) {
      return [ current, extra ]
    }
  }
}

module.exports.onChange = onChange
module.exports.onChangeWith = onChangeWith
