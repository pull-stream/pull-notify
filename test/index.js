
var Notify = require('../')
var tape = require('tape')
var pull = require('pull-stream')

tape('simple', function (t) {
  var notify = Notify()
  var r = Math.random()

  pull(
    notify.listen(),
    pull.drain(function (data) {
      t.equal(data, r)
    }, function () {
      t.end()
    })
  )

  t.equal(notify(r), r)
  notify.end()
})

tape('end', function (t) {
  var notify = Notify()
  var r = Math.random()
  var n = 3

  pull(
    notify.listen(),
    pull.drain(function (data) {
      t.equal(data, r)
    }, function () {
      if (--n) return
      t.end()
    })
  )
  pull(
    notify.listen(),
    pull.drain(function (data) {
      t.equal(data, r)
    }, function () {
      if (--n) return
      t.end()
    })
  )
  pull(
    notify.listen(),
    pull.drain(function (data) {
      t.equal(data, r)
    }, function () {
      if (--n) return
      t.end()
    })
  )

  t.equal(notify(r), r)
  notify.end()
})
