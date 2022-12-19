/**
 * Handle Auth private API only used in private API.
 * Will automatically handle 400, 401 and 403 error code
 * @param {Object} state state object
 * @param {Object} action.payload
 * @returns {Boolean} True then continue false then return immediately
 */
const handleAuthAPI = (state, { code, message }) => {
  if ([401].includes(code)) {
    if (message === 'Expired token') {
      state.statusCode = code
      state.message = 'Your session is expired. Please re-login to continue'

      return false
    } else {
      state.statusCode = code
      state.message = message

      return false
    }

  } else if ([403].includes(code)) {
    state.statusCode = code
    state.message = 'FORBIDDEN! Maybe your account was banned or some malicious actions took place'

    return false
  } else if ([400].includes(code)) {
    state.statusCode = code
    state.message = message ?? 'Your request is bad. Please try again.'

    return false
  } else return true
}

export default handleAuthAPI
