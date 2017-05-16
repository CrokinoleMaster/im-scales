module.exports.clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max)
}

module.exports.raise = (x, exponent) => {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent)
}
