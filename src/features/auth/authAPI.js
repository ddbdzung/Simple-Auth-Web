import { authAxios } from '../../configs/axios.mjs'
import { customAxios } from '../../helpers/customAxios'

export async function fetchSignUp(token, payload) {
  const api = `/auth/register`

  return customAxios.post(api, token, payload)
}

export async function fetchSignIn(tokens, payload) {
  const api = `/auth/sign-in`

  return customAxios.post(api, tokens, payload)
}

export async function fetchFindAccount(tokens, payload) {
  const api = `/auth/find-account`

  return customAxios.post(api, tokens, payload)
}

export async function fetchResetPwEmail(tokens, payload) {
  const api = `/auth/resetpw-email`

  return customAxios.post(api, tokens, payload)
}

export async function fetchCheckResetPwCode(tokens, payload) {
  const api = `/auth/confirm-pwcode`

  return customAxios.post(api, tokens, payload)
}

export async function fetchResetPasswordAsync(tokens, payload) {
  const api = `/auth/reset-pw`

  return customAxios.post(api, tokens, payload)
}

export async function fetchSendValidateEmailAsync(tokens, _payload) {
  const api = `/user/confirm-email`

  return customAxios.post(api, tokens, {})
}

export async function fetchLogOutAsync(tokens, _payload) {
  const api = `/auth/sign-out`

  return authAxios.post(api, { refresh: tokens.refresh })
}
