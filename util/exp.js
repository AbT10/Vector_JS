module.exports = function exp(arr) {
    const flatten = require('../lib/flatten'),
        arrange = require('../lib/arrange'),
        calc_shape = require('../lib/calc_shape');
    return arrange(calc_shape(arr), flatten(arr).map(i => Math.exp(i)));
}