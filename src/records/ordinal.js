const Im = require('immutable')

const ScaleRecord = Im.Record({
    _domain: Im.List(),
    _range: Im.List()
})

class Record extends ScaleRecord {
    domain(newDomain) {
        if (!newDomain) {
            return this._domain
        }
        return this.set('_domain', Im.Set(newDomain).toList())
    }
    range(newRange) {
        if (!newRange) {
            return this._range
        }
        return this.set('_range', Im.List(newRange))
    }
}

module.exports = Record
