module.exports.clamp = function(num, min, max) {
    return Math.min(Math.max(num, min), max)
}
