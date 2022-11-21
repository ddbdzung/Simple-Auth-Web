import axios from 'axios'

import * as URL from '../constants'
import { loadState, saveState } from '../helpers/handleState'

export const authAxios = axios.create({
  baseURL: `${URL.BASE_DOMAIN}${URL.API_ENTRY}`,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor
authAxios.interceptors.request.use(
  config => {
    const { access } = loadState('access')
    if (access) {
      config.headers['Authorization'] = 'Bearer ' + access
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Add a response interceptor
authAxios.interceptors.response.use(
  res => {
    return res
  },
  async error => {
    const originalConfig = error.config

    if (originalConfig.url !== '/auth/sign-in' && error?.response) {
      const { code, message } = error.response.data

      if (code === 403) return Promise.reject(error)

      if (code === 401 && message === 'Expired token') {
        return Promise.reject(error)
      } else {
        try {
          const { refresh: rtFromLocalStorage } = loadState('refresh')
          const rs = await authAxios.post('/auth/refresh-token', {
            refresh: rtFromLocalStorage,
          })

          authAxios.interceptors.response.eject()
          const { data: { access, refresh } } = rs.data
          saveState('access', access.token)
          saveState('refresh', refresh.token)

          return authAxios(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(error)
  }
)
