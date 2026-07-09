/**
 * Creates a standard success response.
 *
 * @param {string} message - Human-readable success message.
 * @param {object|array|null} data - Response payload.
 * @param {object} meta - Additional metadata.
 *
 * @returns {object}
 */
export function successResponse(message, data = null, meta = {}) {
  return {
    success: true,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  };
}

/**
 * Creates a standard error response.
 *
 * @param {string} message - Human-readable error message.
 * @param {array} errors - Validation or application errors.
 * @param {object} meta - Additional metadata.
 *
 * @returns {object}
 */
export function errorResponse(message, errors = [], meta = {}) {
  return {
    success: false,
    message,
    errors,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  };
}