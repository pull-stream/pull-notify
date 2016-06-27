
var pushable = require('pull-pushable')

module.exports = function () {
  var listeners = []

  function notify (message) {
    // notify by pushing to all listeners
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].push(message)
    }
    return message
  }

  notify.listen = function () {
    // create listener with `onClose` handler
    var listener = pushable(function onClose () {
      // if listener is found, delete from list
      var index = listeners.indexOf(listener)
      if (index !== -1) listeners.splice(index, 1)
    })
    listeners.push(listener)
    return listener
  }

  notify.abort = function (err) {
    // abort by ending all listeners
    while (listeners.length) listeners[0].end(err)
  }

  notify.end = function () {
    return notify.abort(true)
  }

  return notify
}
