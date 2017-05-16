const { interpolate } = require('d3-interpolate')
const Im = require('immutable')
const { ticks } = require('d3-array')
const ContinuousScale = require('./continuous')
const { clamp, nice } = require('./utils')

const pow10 = x => {
    return isFinite(x) ? Number('1e' + x) : x < 0 ? 0 : x
}

const getPowFunc = base => {
    if (base === 10) {
        return pow10
    }
    if (base === Math.E) {
        return Math.exp
    }
    return x => Math.pow(base, x)
}

const getLogFunc = base => {
    if (base === Math.E) {
        return Math.log
    }
    if (base === 10) {
        return Math.log10
    }
    if (base === 2) {
        return Math.log2
    }
    return x => Math.log(x) / Math.log(base)
}

const reflect = f => {
    return x => -f(-x)
}

class LogScale extends ContinuousScale {
    x(xValue) {
        const interpolator = interpolate(
            this.range().first(),
            this.range().last()
        )
        let log = getLogFunc(this.base())
        if (this.domain().first() < 0) {
            log = reflect(log)
        }
        // check if clamped is set to true
        if (this.clamped()) {
            xValue = clamp(xValue, this.domain().first(), this.domain().last())
        }
        let n =
            log(xValue / this.domain().first()) /
            log(this.domain().last() / this.domain().first())
        let result = interpolator(n)
        if (xValue === this.domain().first()) {
            result = this.range().first()
        }
        if (xValue === this.domain().last()) {
            result = this.range().last()
        }
        // check if rounded is set to true
        if (isNaN(result) || !this.rounded()) {
            return result
        }
        return Math.round(result)
    }

    y(yValue) {
        const interpolator = interpolate(
            this.domain().first(),
            this.domain().last()
        )
        let n =
            (yValue - this.range().first()) /
            (this.range().last() - this.range().first())
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

    ticks(count) {
        let log = getLogFunc(this.base())
        if (this.domain().first() < 0) {
            log = reflect(log)
        }
        let pow = getPowFunc(this.base())
        if (this.domain().first() < 0) {
            pow = reflect(pow)
        }
        let d = this.domain()
        let u = d.first()
        let v = d.last()
        let r

        let i = log(u)
        let j = log(v)
        let p
        let k
        let t
        let n = count || 10
        let z = []

        if ((r = v < u)) {
            i = u
            u = v
            v = i
        }

        if (!(this.base() % 1) && j - i < n) {
            i = Math.round(i) - 1
            j = Math.round(j) + 1
            if (u > 0) {
                for (; i < j; ++i) {
                    for ((k = 1), (p = pow(i)); k < this.base(); ++k) {
                        t = p * k
                        if (t < u) {
                            continue
                        }
                        if (t > v) {
                            break
                        }
                        z.push(t)
                    }
                }
            } else {
                for (; i < j; ++i) {
                    for ((k = this.base() - 1), (p = pow(i)); k >= 1; --k) {
                        t = p * k
                        if (t < u) {
                            continue
                        }
                        if (t > v) {
                            break
                        }
                        z.push(t)
                    }
                }
            }
        } else {
            z = ticks(i, j, Math.min(j - i, n)).map(pow)
        }

        return Im.List(r ? z.reverse() : z)
    }

    nice() {
        let log = getLogFunc(this.base())
        if (this.domain().first() < 0) {
            log = reflect(log)
        }
        let pow = getPowFunc(this.base())
        if (this.domain().first() < 0) {
            pow = reflect(pow)
        }
        let domain = this.domain()
        return this.domain(
            nice(domain, {
                floor: x => {
                    return pow(Math.floor(log(x)))
                },
                ceil: x => {
                    return pow(Math.ceil(log(x)))
                }
            })
        )
    }
}

module.exports = LogScale
