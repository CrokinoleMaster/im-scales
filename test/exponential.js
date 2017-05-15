const test = require('ava')
const { scalePow } = require('d3-scale')
const { ContinuousScale } = require('..')

test('set domain', t => {
    let powerD3 = scalePow().domain([1, 10]).exponent(2)
    let power = new ContinuousScale().domain([1, 10]).exponent(2)
    t.deepEqual(powerD3.domain(), power.domain().toJS())
    powerD3 = powerD3.domain([20, 30])
    power = power.domain([20, 30])
    t.deepEqual(powerD3.domain(), power.domain().toJS())
})

test('set range', t => {
    let powerD3 = scalePow().range([1, 10]).exponent(2)
    let power = new ContinuousScale().range([1, 10]).exponent(2)
    t.deepEqual(powerD3.range(), power.range().toJS())
    powerD3 = powerD3.range([20, 30])
    power = power.range([20, 30])
    t.deepEqual(powerD3.range(), power.range().toJS())
})

test('scale output', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let powerD3 = scalePow().domain(domain).range(range).exponent(2)
    let power = new ContinuousScale().domain(domain).range(range).exponent(2)
    t.is(powerD3(4), power.x(4))
    t.is(powerD3.invert(24), power.y(24))
})

test('outofbounds not clamped', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let powerD3 = scalePow().domain(domain).range(range).exponent(2)
    let power = new ContinuousScale().domain(domain).range(range).exponent(2)
    t.is(powerD3(20), power.x(20))
    t.is(powerD3.invert(10), power.y(10))
})

test('outofbounds clamped', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let powerD3 = scalePow().domain(domain).range(range).clamp(true).exponent(2)
    let power = new ContinuousScale()
        .domain(domain)
        .range(range)
        .clamped(true)
        .exponent(2)
    t.is(powerD3(20), power.x(20))
    t.is(powerD3.invert(10), power.y(10))
})

test('ticks', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let powerD3 = scalePow().domain(domain).range(range).clamp(true).exponent(2)
    let power = new ContinuousScale()
        .domain(domain)
        .range(range)
        .clamped(true)
        .exponent(2)
    t.deepEqual(powerD3.ticks(), power.ticks().toJS())
    t.deepEqual(powerD3.ticks(20), power.ticks(20).toJS(20))
})

test('nice', t => {
    let domain = [3, 87]
    let range = [24, 44]
    let powerD3 = scalePow()
        .domain(domain)
        .range(range)
        .clamp(true)
        .nice()
        .exponent(2)
    let power = new ContinuousScale()
        .domain(domain)
        .range(range)
        .clamped(true)
        .nice()
        .exponent(2)
    t.deepEqual(powerD3.domain(), power.domain().toJS())
    t.deepEqual(powerD3.range(), power.range().toJS(20))
    t.deepEqual(powerD3.ticks(), power.ticks().toJS())
    t.deepEqual(powerD3.ticks(20), power.ticks(20).toJS(20))
})
