const test = require('ava')
const { scaleLinear } = require('d3-scale')
const { LinearScale } = require('..')

test('set domain', t => {
    let linearD3 = scaleLinear().domain([1, 10])
    let linear = new LinearScale().domain([1, 10])
    t.deepEqual(linearD3.domain(), linear.domain().toJS())
    linearD3 = linearD3.domain([20, 30])
    linear = linear.domain([20, 30])
    t.deepEqual(linearD3.domain(), linear.domain().toJS())
})

test('set range', t => {
    let linearD3 = scaleLinear().range([1, 10])
    let linear = new LinearScale().range([1, 10])
    t.deepEqual(linearD3.range(), linear.range().toJS())
    linearD3 = linearD3.range([20, 30])
    linear = linear.range([20, 30])
    t.deepEqual(linearD3.range(), linear.range().toJS())
    linearD3 = linearD3.range(['#111111', '#00ff00'])
    linear = linear.range(['#111111', '#00ff00'])
    t.deepEqual(linearD3.range(), linear.range().toJS())
})

test('scale output', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let linearD3 = scaleLinear().domain(domain).range(range)
    let linear = new LinearScale().domain(domain).range(range)
    domain.forEach(x => t.is(linearD3(x), linear.x(x)))
    range.forEach(y => t.is(linearD3.invert(y), linear.y(y)))

    range = ['#000', '#0f0']
    linearD3 = scaleLinear().domain(domain).range(range)
    linear = new LinearScale().domain(domain).range(range)
    domain.forEach(x => t.is(linearD3(x), linear.x(x)))
})

test('outofbounds not clamped', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let linearD3 = scaleLinear().domain(domain).range(range)
    let linear = new LinearScale().domain(domain).range(range)
    t.is(linearD3(20), linear.x(20))
    t.is(linearD3(-2), linear.x(-2))
    t.is(linearD3.invert(10), linear.y(10))
    t.is(linearD3.invert(44), linear.y(44))
})

test('outofbounds clamped', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let linearD3 = scaleLinear().domain(domain).range(range).clamp(true)
    let linear = new LinearScale().domain(domain).range(range).clamped(true)
    t.is(linearD3(20), linear.x(20))
    t.is(linearD3(-23), linear.x(-23))
    t.is(linearD3.invert(10), linear.y(10))
    t.is(linearD3.invert(44), linear.y(44))
})

test('ticks', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let linearD3 = scaleLinear().domain(domain).range(range).clamp(true)
    let linear = new LinearScale().domain(domain).range(range).clamped(true)
    t.deepEqual(linearD3.ticks(), linear.ticks().toJS())
    t.deepEqual(linearD3.ticks(20), linear.ticks(20).toJS(20))
})

test('nice', t => {
    let domain = [3, 87]
    let range = [24, 44]
    let linearD3 = scaleLinear().domain(domain).range(range).clamp(true).nice()
    let linear = new LinearScale()
        .domain(domain)
        .range(range)
        .clamped(true)
        .nice()
    t.deepEqual(linearD3.domain(), linear.domain().toJS())
    t.deepEqual(linearD3.range(), linear.range().toJS(20))
    t.deepEqual(linearD3.ticks(), linear.ticks().toJS())
    t.deepEqual(linearD3.ticks(20), linear.ticks(20).toJS(20))
})
