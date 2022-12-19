import { authAxios } from "../../configs/axios.mjs"
import { API } from "../../constants/index.js"

export async function fetchGetProductsAsync(_payload) {
  const api = `${API.PRODUCT.BASE}/${API.ADMIN}/${API.PRODUCT.GET_PRODUCTS}`

  return authAxios.get(api)
}

export async function fetchGetBrandsAsync(_payload) {
  const api = `${API.BRAND.BASE}/${API.BRAND.GET_BRANDS}`

  return authAxios.get(api)
}

export async function fetchGetCataloguesAsync(_payload) {
  const api = `${API.CATALOG.BASE}/${API.CATALOG.GET_CATALOGUES}`

  return authAxios.get(api)
}

export async function fetchGetOrdersAsync(_payload) {
  const api = `${API.TRANSACTION.BASE}/${API.ADMIN}/${API.TRANSACTION.GET_TRANSACTIONS}`

  return authAxios.get(api)
}

export async function fetchGetUsersAsync(_payload) {
  const api = `${API.USER.BASE}/${API.ADMIN}/${API.USER.GET_CLIENT}`

  return authAxios.get(api)
}

export async function fetchCreateProductAsync(payload) {
  const api = `${API.PRODUCT.BASE}/${API.ADMIN}/${API.PRODUCT.CREATE_PRODUCT}`

  return authAxios.post(api, payload)
}

export async function fetchCreateBrandAsync(payload) {
  const api = `${API.BRAND.BASE}/${API.BRAND.CREATE_BRAND}`

  return authAxios.post(api, payload)
}

export async function fetchCreateCatalogAsync(payload) {
  const api = `${API.CATALOG.BASE}/${API.CATALOG.CREATE_CATALOG}`

  return authAxios.post(api, payload)
}

export async function fetchCreateUserAsync(payload) {
  const api = `${API.USER.BASE}/${API.ADMIN}/${API.USER.CREATE_CLIENT}`

  return authAxios.post(api, payload)
}

export async function fetchUpdateProductAsync(payload) {
  const api = `${API.PRODUCT.BASE}/${API.ADMIN}/${API.PRODUCT.UPDATE_PRODUCT}${payload.id}`
  return authAxios.patch(api, payload)
}

export async function fetchUpdateBrandAsync(payload) {
  const api = `${API.BRAND.BASE}/${API.BRAND.UPDATE_BRAND}${payload.id}`
  return authAxios.patch(api, payload)
}

export async function fetchUpdateCatalogAsync(payload) {
  const api = `${API.CATALOG.BASE}/${API.CATALOG.UPDATE_CATALOG}${payload.id}`
  return authAxios.patch(api, payload)
}

export async function fetchUpdateOrderAsync(payload) {
  const api = `${API.TRANSACTION.BASE}/${API.ADMIN}/${API.TRANSACTION.UPDATE_TRANSACTION}${payload.id}`
  return authAxios.patch(api, payload)
}

export async function fetchUpdateUserAsync(payload) {
  const api = `${API.USER.BASE}/${API.ADMIN}/${API.USER.UPDATE_CLIENT}${payload.id}`
  return authAxios.patch(api, payload)
}

export async function fetchDeleteProductAsync(payload) {
  const api = `${API.PRODUCT.BASE}/${API.ADMIN}/${API.PRODUCT.DELETE_PRODUCT}${payload.id}`
  return authAxios.delete(api, payload)
}

export async function fetchDeleteBrandAsync(payload) {
  const api = `${API.BRAND.BASE}/${API.BRAND.DELETE_BRAND}${payload.id}`
  return authAxios.delete(api, payload)
}

export async function fetchDeleteCatalogAsync(payload) {
  const api = `${API.CATALOG.BASE}/${API.CATALOG.DELETE_CATALOG}${payload.id}`
  return authAxios.delete(api, payload)
}

export async function fetchDeleteUserAsync(payload) {
  const api = `${API.USER.BASE}/${API.ADMIN}/${API.USER.DELETE_CLIENT}${payload.id}`
  return authAxios.delete(api, payload)
}
