const flatten = require('../lib/flatten'),
    calcShape = require('../lib/calcShape'),
    arrange = require('../lib/transpose');

module.exports = function sqrt(arr) {
    return arrange(calcShape(arr), flatten(arr).map(i => Math.sqrt(i)));
}