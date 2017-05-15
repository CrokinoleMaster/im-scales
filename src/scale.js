const Im = require('immutable')

const ScaleRecord = Im.Record({
    _domain: Im.List(),
    _range: Im.List(),
    _rounded: false,
    _clamped: false,
    _exponent: 1
})

class Scale extends ScaleRecord {
    domain(newDomain) {
        if (!newDomain) {
            return this._domain
        }
        return this.set('_domain', Im.List(newDomain))
    }

    range(newRange) {
        if (!newRange) {
            return this._range
        }
        return this.set('_range', Im.List(newRange))
    }
    rounded(shouldRound) {
        if (shouldRound === undefined) {
            return this._rounded
        }
        return this.set('_rounded', shouldRound)
    }
    clamped(shouldClamp) {
        if (shouldClamp === undefined) {
            return this._shouldClamp
        }
        return this.set('_shouldClamp', shouldClamp)
    }
    exponent(newExponent) {
        if (newExponent === undefined) {
            return this._exponent
        }
        return this.set('_exponent', newExponent)
    }
}

module.exports = {
    Scale
}
