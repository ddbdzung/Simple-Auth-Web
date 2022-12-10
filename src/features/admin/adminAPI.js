import { authAxios } from "../../configs/axios.mjs"
import { API } from "../../constants/index.js"

export async function fetchGetProductsAsync(_payload) {
  const api = `${API.PRODUCT.BASE}/${API.PRODUCT.GET_PRODUCTS}`

  return authAxios.get(api)
}
export async function fetchCreateProductAsync(payload) {
  const api = `${API.PRODUCT.BASE}/${API.PRODUCT.CREATE_PRODUCT}`

  return authAxios.post(api, payload)
}
export async function fetchUpdateProductAsync(payload) {
  const api = `${API.PRODUCT.BASE}/${API.PRODUCT.UPDATE_PRODUCT}${payload.id}`
  return authAxios.put(api, payload)
}

export async function fetchDeleteProductAsync(payload) {
  console.log(payload)
  const api = `${API.PRODUCT.BASE}/${API.PRODUCT.DELETE_PRODUCT}${payload.id}`
  return authAxios.delete(api, payload)
}
