// import { authAxios } from '../../configs/axios.mjs'
import { customAxios } from '../../helpers/customAxios'
// import { loadState } from '../../helpers/handleState.js'

export async function fetchCheckoutAsync(token, payload) {
  const api = `/checkout/client`

  return customAxios.post(api, token, payload)
}
