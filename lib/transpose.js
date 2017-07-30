/* function to find the transpose */
module.exports = function transpose(arr, dtype = 'uint8') {
    const calc_shape = require('./calc_shape'),
        flatten = require('./flatten'),
        form_arr = require('./form_arr'),
        arrange = require('./arrange'),

        s = calc_shape(arr);
    let flat_arr = flatten(arr),
        t = form_arr(flat_arr, dtype),
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