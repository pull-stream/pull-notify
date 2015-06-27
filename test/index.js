
var Notify = require('../')
var tape = require('tape')
var pull = require('pull-stream')

tape('simple', function (t) {

  var notify = Notify(), r = Math.random()

  pull(
    notify.listen(),
    pull.drain(function (data) {
      t.equal(data, r)
    }, function () {
      t.end()
    })
  )

  notify(r)
  notify.end()
})


tape('end', function (t) {

  var notify = Notify(), r = Math.random(), n = 3

  pull(
    notify.listen(),
    pull.drain(function (data) {
      t.equal(data, r)
    }, function () {
      if(--n) return
      t.end()
    })
  )
  pull(
    notify.listen(),
    pull.drain(function (data) {
      t.equal(data, r)
    }, function () {
      if(--n) return
      t.end()
    })
  )
  pull(
    notify.listen(),
    pull.drain(function (data) {
      t.equal(data, r)
    }, function () {
      if(--n) return
      t.end()
    })
  )

  notify(r)
  notify.end()
})

tape('simple', function (t) {

  var notify = Notify(), r = Math.random()

  pull(
    notify.listen(),
    pull.drain(function (data) {
      t.equal(data, r)
    }, function () {
      t.end()
    })
  )

  notify(r)
  notify.end()
})


