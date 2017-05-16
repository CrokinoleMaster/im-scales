const { interpolate } = require('d3-interpolate')
const ContinuousScale = require('./continuous')
const { clamp } = require('./utils')

const getLogFunc = reflect => {
    if (reflect) {
        return x => -Math.log(x)
    }
    return x => Math.log(x)
}

class LogScale extends ContinuousScale {
    x(xValue) {
        const interpolator = interpolate(this.range().min(), this.range().max())
        const log = getLogFunc(this.domain().min() < 0)
        // check if clamped is set to true
        if (this.clamped()) {
            xValue = clamp(xValue, this.domain().min(), this.domain().max())
        }
        let n =
            log(xValue / this.domain().min()) /
            log(this.domain().max() / this.domain().min())
        // return (b = Math.log(b / a))
        // ? function(x) { return Math.log(x / a) / b; }
        // : constant(b);
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

module.exports = LogScale
