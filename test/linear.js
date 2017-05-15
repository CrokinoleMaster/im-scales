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
