module.exports.clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max)
}

module.exports.raise = (x, exponent) => {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent)
}

module.exports.nice = (domain, interval) => {
    domain = domain.slice()

    let i0 = 0
    let i1 = domain.size - 1
    let x0 = domain.first()
    let x1 = domain.last()
    let t

    if (x1 < x0) {
        t = i0
        i0 = i1
        i1 = t
        t = x0
        x0 = x1
        x1 = t
    }

    domain[i0] = interval.floor(x0)
    domain[i1] = interval.ceil(x1)
    domain = domain.set(i0, interval.floor(x0))
    domain = domain.set(i1, interval.ceil(x1))
    return domain
}

module.exports.rgbToHex = rgb => {
    rgb = rgb.match(
        /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    )
    return rgb && rgb.length === 4
        ? '#' +
              ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
              ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
              ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
        : ''
}
