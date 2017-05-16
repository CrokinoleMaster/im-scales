const { interpolate } = require('d3-interpolate')
const ContinuousScale = require('./continuous')
const { clamp } = require('./utils')

class LinearScale extends ContinuousScale {
    x(xValue) {
        const interpolator = interpolate(this.range().min(), this.range().max())
        let n =
            (xValue - this.domain().min()) /
            (this.domain().max() - this.domain().min())
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
        const interpolator = interpolate(
            this.domain().min(),
            this.domain().max()
        )
        let n =
            (yValue - this.range().min()) /
            (this.range().max() - this.range().min())
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
}

module.exports = LinearScale
