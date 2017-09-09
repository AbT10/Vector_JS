/* A JS library for dealing with n-dimensional arrays. 
 * Referenced from numpy.
 * Author : Anubhav Tiwari <atworkstudios@gmail.com>
 */

const core = require('./core'),
    math = require('../util/math');

class ndarray {
    constructor(shape = [], arr = [], dtype = 'uint8') {
        this.array = arr.length === 0 ? core.arrange(shape) : arr;
        this.shape = ((shape.length) > 0) ? shape : (core.calc_shape(this.array));
        this.size = core.calc_size(this.array);
        this.dim = core.find_dim(this.array);
        this.dtype = dtype;
        this.flat = core.form_arr(core.flatten(this.array), this.dtype);
    }

    /* class specific (static) methods */
    /* form a new ndarray for the given array */
    static array(arr) {
        return new ndarray([], arr);
    }

    /* make a new zero ndarray */
    static zeroes(shape) {
        let base_arr = core.fill(shape[shape.length - 1], "linear", 0);
        let arr = shape.length < 2 ? base_arr : [];
        for (let i = shape.length - 2; i >= 0; i--) {
            arr = [];
            for (let j = 0; j < shape[i]; j++) {
                arr.push(base_arr);
            }
            base_arr = arr;
        }
        return new ndarray(shape, arr, 'float32');
    }

    /* -------------------------------------------------------------------------------------------------------------------------------------------- */

    /* object specific (property) methods */

    /* sum of 2 ndarrays */
    add(v2) {
        return math.sum(this.array, v2.array);
    }

    /* reshapes the ndarray only if for the new shape the number of elements remain same */
    reshape(new_shape) {
        if (core.calc_size(new_shape, 'shape') === this.size) {
            /* reshape */
            const temp_arr = this.flat;
            this.shape = new_shape;
            this.arrange(temp_arr);
        } else {
            return new Error("Resizing error : can't change the size");
        }
    }

    /* changes the shape and size of the ndarray in place */
    resize(new_shape) {
        const temp_arr = this.flat;
        this.shape = new_shape;
        this.size = core.calc_size(new_shape);
        this.arrange(temp_arr);
    }

    arrange(elems_arr) {
        this.array = core.arrange(this.shape, elems_arr);
        this.flatten();
        this.size = core.calc_size(this.array);
        this.shape = core.calc_shape(this.array);
        this.dim = core.find_dim(this.array);
    }

    clip(min_val, max_val) {
        this.arrange(core.clip(this.array, min_val, max_val));
    }

    flatten() {
        this.flat = core.form_arr(core.flatten(this.array), this.dtype);
        return this.flat;
    }

    transpose() {
        return core.transpose(this.array, this.dtype);
    }

}

module.exports = ndarray;