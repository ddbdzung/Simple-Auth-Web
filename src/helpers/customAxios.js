import axios from 'axios'

import * as URL from '../constants'

const configHeaderRequest = ({ access, refresh }) => {
  try {
    if (!access || !refresh) {
      return {}
    }
    return {
      Authorization: `Bearer ${access}`
    }
  } catch (e) {
    console.error('config header request error')
    return {}
  }
}

const request = method => async (api, tokens, data) => {
  const headers = configHeaderRequest(tokens)
  const body = {
    method,
    data,
    url: `${URL.BASE_DEV}${URL.API_ENTRY}${api}`,
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
