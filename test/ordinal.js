const test = require('ava')
const { scaleOrdinal } = require('d3-scale')
const { OrdinalScale } = require('..')

test('set domain', t => {
    let ordinalD3 = scaleOrdinal().domain([1, 10])
    let ordinal = new OrdinalScale().domain([1, 10])
    t.deepEqual(ordinalD3.domain(), ordinal.domain().toJS())
    ordinalD3 = ordinalD3.domain([20, 30])
    ordinal = ordinal.domain([20, 30])
    t.deepEqual(ordinalD3.domain(), ordinal.domain().toJS())
})

test('set range', t => {
    let ordinalD3 = scaleOrdinal().range([1, 10])
    let ordinal = new OrdinalScale().range([1, 10])
    t.deepEqual(ordinalD3.range(), ordinal.range().toJS())
    ordinalD3 = ordinalD3.range([20, 30])
    ordinal = ordinal.range([20, 30])
    t.deepEqual(ordinalD3.range(), ordinal.range().toJS())
    ordinalD3 = ordinalD3.range(['#111111', '#00ff00'])
    ordinal = ordinal.range(['#111111', '#00ff00'])
    t.deepEqual(ordinalD3.range(), ordinal.range().toJS())
})

test('scale output', t => {
    let domain = [1, 10]
    let range = [20, 40]
    let ordinalD3 = scaleOrdinal().domain(domain).range(range)
    let ordinal = new OrdinalScale().domain(domain).range(range)
    domain.forEach(x => t.is(ordinalD3(x), ordinal.x(x)))

    range = ['#000', '#0f0']
    ordinalD3 = scaleOrdinal().domain(domain).range(range)
    ordinal = new OrdinalScale().domain(domain).range(range)
    domain.forEach(x => t.is(ordinalD3(x), ordinal.x(x)))
})
