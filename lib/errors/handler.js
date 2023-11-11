const kCode = Symbol('code');
const messages = new Map();

/**
 * Format the message for an error.
 *
 * @param {string} key Error key
 * @param {Array<*>} args Arguments to pass for util format or as function args
 * @returns {string} Formatted string
 */
const message = (key, args) => {
    if (typeof key !== 'string') throw new Error('Error message key must be a string');
    const msg = messages.get(key);
    if (!msg) throw new Error(`An invalid error message key was used: ${key}.`);
    if (typeof msg === 'function') return msg(...args);
    if (args === undefined || args.length === 0) return msg;
    args.unshift(msg);
    return String(...args);
};

/**
 * Extend an error of some sort into a JsError.
 *
 * @param {Error} Base Base error to extend
 * @returns {JsError}
 */
const makeJsError = (Base) => class JsError extends Base {
    constructor(key, ...args) {
        super(message(key, args));
        this[kCode] = key;
        if (Error.captureStackTrace) Error.captureStackTrace(this, JsError);
    }

    get name() {
        return `${super.name} [${this[kCode]}]`;
    }

    get code() {
        return this[kCode];
    }
};

/**
 * Register an error code and message.
 *
 * @param {string} sym Unique name for the error
 * @param {*} val Value of the error
 */
const register = (sym, val) => {
    messages.set(sym, typeof val === 'function' ? val : String(val));
};

module.exports = {
    register,
    Error: makeJsError(Error),
    TypeError: makeJsError(TypeError),
    RangeError: makeJsError(RangeError)
};
