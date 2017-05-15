const test = require('ava')
const Im = require('immutable')
const { ContinuousScale } = require('..')

test('is immutable', t => {
    const linear = new ContinuousScale().domain([1, 10]).range([1, 10])
    t.truthy(Im.Iterable.isIterable(linear))
    t.truthy(Im.List.isList(linear.domain()))
    t.truthy(Im.List.isList(linear.range()))
    t.truthy(Im.List.isList(linear.ticks()))
    t.truthy(Im.Iterable.isIterable(linear.nice()))
})
