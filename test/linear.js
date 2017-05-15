const test = require('ava')
const { scaleLinear } = require('d3-scale')
const { ContinuousScale } = require('..')

test('set domain', t => {
    let linearD3 = scaleLinear().domain([1, 10])
    let linear = new ContinuousScale().domain([1, 10])
    t.deepEqual(linearD3.domain(), linear.domain().toJS())
    linearD3 = linearD3.domain([20, 30])
    linear = linear.domain([20, 30])
    t.deepEqual(linearD3.domain(), linear.domain().toJS())
})

test('set range', t => {
    let linearD3 = scaleLinear().range([1, 10])
    let linear = new ContinuousScale().range([1, 10])
    t.deepEqual(linearD3.range(), linear.range().toJS())
    linearD3 = linearD3.range([20, 30])
    linear = linear.range([20, 30])
    t.deepEqual(linearD3.range(), linear.range().toJS())
})

test('scale output', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let linearD3 = scaleLinear().domain(domain).range(range)
    let linear = new ContinuousScale().domain(domain).range(range)
    t.is(linearD3(4), linear.x(4))
    t.is(linearD3.invert(24), linear.y(24))
})

test('outofbounds not clamped', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let linearD3 = scaleLinear().domain(domain).range(range)
    let linear = new ContinuousScale().domain(domain).range(range)
    t.is(linearD3(20), linear.x(20))
    t.is(linearD3.invert(10), linear.y(10))
})

test('outofbounds clamped', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let linearD3 = scaleLinear().domain(domain).range(range).clamp(true)
    let linear = new ContinuousScale().domain(domain).range(range).clamped(true)
    t.is(linearD3(20), linear.x(20))
    t.is(linearD3.invert(10), linear.y(10))
})
