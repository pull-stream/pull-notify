
var pushable = require('pull-pushable')

module.exports = function () {
  var listeners = {}
  var n = 0

  function notify (msg) {
    for (var k in listeners) listeners[k].push(msg)
    return msg
  }

  notify.listen = function () {
    var k = ++n
    var listener = pushable(function () {
      delete listeners[k]
    })
    listeners[k] = listener
    return listener
  }

  notify.abort = function (err) {
    for (var k in listeners) listeners[k].end(err)
  }

  notify.end = function () {
    return notify.abort(true)
  }

  return notify
}
