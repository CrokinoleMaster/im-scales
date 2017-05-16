const { interpolate } = require('d3-interpolate')
const ContinuousScale = require('./continuous')
const { clamp, raise } = require('./utils')

const reinterpolate = (a, b, exponent) => {
    b = raise(b, exponent) - (a = raise(a, exponent))
    return t => {
        return raise(a + b * t, 1 / exponent)
    }
}

class ExponentialScale extends ContinuousScale {
    x(xValue) {
        const interpolator = interpolate(
            this.range().first(),
            this.range().last()
        )
        let n =
            (raise(xValue, this.exponent()) - this.domain().first()) /
            (raise(this.domain().last(), this.exponent()) -
                raise(this.domain().first(), this.exponent()))
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
            (yValue - this.range().first()) /
            (this.range().last() - this.range().first())
        // check if clamped is set to true
        if (this.clamped()) {
            n = clamp(n, 0, 1)
        }
        const result = reinterpolate(
            this.domain().first(),
            this.domain().last(),
            this.exponent()
        )(n)
        // check if rounded is set to true
        if (isNaN(result) || !this.rounded()) {
            return result
        }
        return Math.round(result)
    }
}

module.exports = ExponentialScale
