const Im = require('immutable')
const { interpolate } = require('d3-interpolate')
const { ticks, tickStep } = require('d3-array')
const { Scale } = require('./scale')
const { clamp } = require('./utils')

class ContinuousScale extends Scale {
    // get the standard scale function
    getScale() {
        return this.x.bind(this)
    }

    // get the inverse scale function
    getInverseScale() {
        return this.y.bind(this)
    }

    x(xValue) {
        const interpolator = interpolate(this.range().min(), this.range().max())
        let n =
            (xValue - this.domain().min()) /
            (this.domain().max() - this.domain().min())
        n = Math.pow(n, this.exponent())
        // check if clamped is set to true
        if (this.clamped) n = clamp(n, 0, 1)
        const result = interpolator(n)
        // check if rounded is set to true
        if (isNaN(result) || !this.rounded()) {
            return result
        } else {
            return Math.round(result)
        }
    }

    y(yValue) {
        const interpolator = interpolate(
            this.domain().min(),
            this.domain().max()
        )
        let n =
            (yValue - this.range().min()) /
            (this.range().max() - this.range().min())
        n = Math.pow(n, this.exponent())
        // check if clamped is set to true
        if (this.clamped) n = clamp(n, 0, 1)
        const result = interpolator(n)
        // check if rounded is set to true
        if (isNaN(result) || !this.rounded()) {
            return result
        } else {
            return Math.round(result)
        }
    }

    ticks(count) {
        const d = this.domain()
        return ticks(d.first(), d.last(), count == null ? 10 : count)
    }

    nice(count) {
        let d = this.domain()
        const i = d.size - 1
        const n = count == null ? 10 : count
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
