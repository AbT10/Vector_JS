/* A JS library for dealing with n-dimensional arrays. 
 * Referenced from numpy.
 * Author : Anubhav Tiwari <atworkstudios@gmail.com>
 */

const core = require('./core'),
    math = require('../util/math');

class Ndarray {
    constructor({ shape = [], dtype = 'float32', initializer = 'zeros', arr = [] } = {}, ...args) {
        this.array = arr.length === 0 ? core.fill(shape, dtype, initializer, ...args) : arr;
        this.shape = ((shape.length) > 0) ? shape : (core.calcShape(this.array));
        this.size = core.calcSize(this.array);
        this.dim = core.findDim(this.array);
        this.dtype = dtype;
        this.flat = core.formArr(core.flatten(this.array), this.dtype);
    }

    /* form a new Ndarray for the given array */
    static array(arr, dtype = 'float32') {
        return new Ndarray({ dtype: dtype, arr: arr });
    }

    /* make a new zero Ndarray */
    static zeroes(shape) {
        return new Ndarray({ shape, dtype: 'float32', initializer: 'zeros' });
    }

    /* ---------------------------------------------------------------- */


    /* sum of 2 Ndarrays */
    add(v2) {
        return math.sum(this.array, v2.array);
    }

    /* reshapes the Ndarray only if for the new shape the number of elements remain same */
    reshape(newShape) {
        if (core.calcSize(newShape, 'shape') === this.size) {
            const tempArr = this.flat;
            this.shape = newShape;
            this.arrange(tempArr);
        } else {
            return new Error(`Resizing error : can't change the shape from ${this.shape} to ${newShape}`);
        }
    }

    /* changes the shape and size of the Ndarray in place */
    resize(newShape) {
        const tempArr = this.flat;
        this.shape = newShape;
        this.size = core.calcSize(newShape);
        this.arrange(tempArr);
    }

    arrange(elemsArr) {
        this.array = core.arrange(this.shape, elemsArr);
        this.flatten();
        this.size = core.calcSize(this.array);
        this.shape = core.calcShape(this.array);
        this.dim = core.findDim(this.array);
    }

    fill(initializer, ...args) {
        this.array = core.fill(this.shape, this.dtype, initializer, ...args);
        this.flatten();
    }

    clip(minVal, maxVal) {
        this.arrange(core.clip(this.array, minVal, maxVal));
    }

    flatten() {
        this.flat = core.formArr(core.flatten(this.array), this.dtype);
        return this.flat;
    }

    transpose() {
        return core.transpose(this.array, this.dtype);
    }

}

module.exports = Ndarray;