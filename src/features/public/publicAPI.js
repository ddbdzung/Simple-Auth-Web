// import { authAxios } from '../../configs/axios.mjs'
import { customAxios } from '../../helpers/customAxios'
// import { loadState } from '../../helpers/handleState.js'

export async function fetchSignUp(token, payload) {
  const api = `/auth/register`

  return customAxios.post(api, token, payload)
}
