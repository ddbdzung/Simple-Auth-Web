import { customAxios } from '../../helpers/customAxios'

export async function fetchSignUp(token, payload) {
  const api = `/auth/register`
  const access = token?.access
  const refresh = token?.refresh
  if (access && refresh) {
    // Ignore calling API because user already sign-in to application
    // return API Error
    const APIError = {
      code: 403,
      message: 'FORBIDDEN',
      data: [],
    }
    return Promise.resolve(APIError)
  }
  return customAxios.post(api, token, payload)
}

export async function fetchSignIn(tokens, payload) {
  const api = `/auth/sign-in`
  const access = tokens?.access
  const refresh = tokens?.refresh
  if (access && refresh) {
    // Ignore calling API because user already sign-in to application
    // return API Error
    const APIError = {
      code: 403,
      message: 'FORBIDDEN',
      data: [],
    }
    return Promise.resolve(APIError)
  }
  return customAxios.post(api, tokens, payload)
}

export async function fetchFindAccount(tokens, payload) {
  const api = `/auth/find-account`
  const access = tokens?.access
  const refresh = tokens?.refresh
  if (access && refresh) {
    // Ignore calling API because user already sign-in to application
    // return API Error
    const APIError = {
      code: 403,
      message: 'FORBIDDEN',
      data: [],
    }
    return Promise.resolve(APIError)
  }
  return customAxios.post(api, tokens, payload)
}

export async function fetchResetPwEmail(tokens, payload) {
  const api = `/auth/resetpw-email`
  const access = tokens?.access
  const refresh = tokens?.refresh
  if (access && refresh) {
    // Ignore calling API because user already sign-in to application
    // return API Error
    const APIError = {
      code: 403,
      message: 'FORBIDDEN',
      data: [],
    }
    return Promise.resolve(APIError)
  }
  return customAxios.post(api, tokens, payload)
}
