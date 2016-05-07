'use strict';

let delay = 0;

/**
 * Creates an exponential back off.
 *
 * @param {Function} inner
 * @param {Number} max
 * @param {Object} context
 * @returns {Function}
 */
const backOff = (inner, context, max = 4) => {

  const timeOutExecutor = (retry) => setTimeout(() => {
    delay = Math.max(delay *= 2, 1);
    inner.call(context, retry);
  }, delay * 1000);

  const execute = () => {
    const shouldRetry = (delay <= max);

    if (shouldRetry) {
      timeOutExecutor(execute);
    }

    return shouldRetry;
  };

  return execute();
};

module.exports = backOff;
