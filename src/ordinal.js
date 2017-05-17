const Scale = require('./records/ordinal')

class OrdinalScale extends Scale {
    getScale() {
        return this.x.bind(this)
    }

    getInverseScale() {
        return this.y.bind(this)
    }

    x(xValue) {
        return this.range().get(this.domain().findIndex(v => v === xValue))
    }
}

module.exports = OrdinalScale
