import axios from 'axios'

import * as URL from '../constants'

const configHeaderRequest = (tokens) => {
  try {
    if (!tokens?.access || !tokens?.refresh) {
      return {}
    }
    return {
      Authorization: `Bearer ${access}`,
    }
  } catch (e) {
    console.error('config header request error')
    return {}
  }
}

const request = method => async (api, tokens, data, _headers = {}) => {
  const headers = _headers || configHeaderRequest(tokens)
  const body = {
    method,
    data,
    url: `${URL.BASE_DOMAIN}${URL.API_ENTRY}${api}`,
  }
  if (Object.keys(headers).length > 0) {
    body.headers = headers
  }

  return axios(body)
}

export const customAxios = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
}
