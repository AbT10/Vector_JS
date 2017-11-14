/** 
 * choose : Forms a new array consisting of selected elements 
 *          ( Selects elements from a given array and forms a new array of those elements )  
 *
 * @array : [Number] : Required
 *          
 * @...args : Number/[Number] : either a single digit to select the 
 *                              element at given index from every element of 
 *                              the given ndarray or depicting the dimension of the elements
 *                              to select
 * 
 * Returns : [Number] the new array
 * 
 */


module.exports = function choose(array, ...args) {
    const { calc_shape, calc_size, form_arr, flatten, arrange } = require('./core');
    const axisOps = require('../util/axisOps');
    if (!args || args.length === 0) {
        return array;
    } else {
        let arr = flatten(array),
            shape = calc_shape(array),
            axis = args[0],
            idx = args[1] || null,
            range = args[2] || null,
            retVals = [],
            elems = axisOps(shape, axis);
        for (let i = 0; i < elems.length; i++) {
            let rv = [];
            for (let j = 0; j < elems[i].length; j++) {
                rv.push(arr[elems[i][j]]);
            }
            retVals.push(rv);
        }
        return retVals;
    }
}