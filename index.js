
var pushable = require('pull-pushable')

module.exports = function () {

  var listeners = {}, n = 0

  function notify (msg) {
    for(var k in listeners) listeners[k].push(msg)
    return msg
  }

  notify.listen = function () {
    var k = ++n
    return listeners[k] = pushable(function () {
      delete listeners[k]
    })
  }

  notify.abort = function (err) {
    for(var k in listeners) listeners[k].end(err)
  }

  notify.end = function () {
    return notify.abort(true)
  }

  return notify
}
