const Im = require('immutable')
const { ticks, tickStep } = require('d3-array')
const Scale = require('./records/continuous')

class ContinuousScale extends Scale {
    // get the standard scale function
    getScale() {
        return this.x.bind(this)
    }

    // get the inverse scale function
    getInverseScale() {
        return this.y.bind(this)
    }

    x() {}

    y() {}

    ticks(count) {
        const d = this.domain()
        return Im.List(ticks(d.first(), d.last(), count || 10))
    }

    nice(count) {
        let d = this.domain()
        const i = d.size - 1
        const n = count || 10
        let start = d.first()
        let stop = d.get(i)
        let step = tickStep(start, stop, n)

        if (step) {
            start = Math.floor(start / step) * step
            stop = Math.ceil(stop / step) * step
            step = tickStep(start, stop, n)
            d = d.set(0, Math.floor(start / step) * step)
            d = d.set(i, Math.ceil(stop / step) * step)
            return this.domain(d)
        }

        return this
    }
}

module.exports = ContinuousScale
