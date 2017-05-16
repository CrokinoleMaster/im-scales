const Im = require('immutable')
const { interpolate } = require('d3-interpolate')
const { ticks, tickStep } = require('d3-array')
const { Scale } = require('./scale')
const { clamp, raise } = require('./utils')

const reinterpolate = (a, b, exponent) => {
    b = raise(b, exponent) - (a = raise(a, exponent))
    return t => {
        return raise(a + b * t, 1 / exponent)
    }
}

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
            (raise(xValue, this.exponent()) - this.domain().min()) /
            (raise(this.domain().max(), this.exponent()) -
                raise(this.domain().min(), this.exponent()))
        // check if clamped is set to true
        if (this.clamped()) {
            n = clamp(n, 0, 1)
        }
        const result = interpolator(n)
        // check if rounded is set to true
        if (isNaN(result) || !this.rounded()) {
            return result
        }
        return Math.round(result)
    }

    y(yValue) {
        let n =
            (yValue - this.range().min()) /
            (this.range().max() - this.range().min())
        // check if clamped is set to true
        if (this.clamped()) {
            n = clamp(n, 0, 1)
        }
        const result = reinterpolate(
            this.domain().min(),
            this.domain().max(),
            this.exponent()
        )(n)
        // check if rounded is set to true
        if (isNaN(result) || !this.rounded()) {
            return result
        }
        return Math.round(result)
    }

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
