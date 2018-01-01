/* function to find the transpose */
module.exports = function transpose(arr, dtype = 'float32') {
    const { calcShape, flatten, formArr, arrange } = require('./core');
    let flatArr = flatten(arr),
        s = calcShape(arr),
        t = formArr(flatArr, dtype),
        r = s.length > 1 ? s[0] : 1,
        c = s.length > 1 ? s[1] : s[0],
        k = 0,
        b = [];
    for (let i = 0; i < c; i++) {
        for (let j = i; j < t.length; j += c) {
            b[k++] = t[j];
        }
    }
    return arrange([c, r], b);
}