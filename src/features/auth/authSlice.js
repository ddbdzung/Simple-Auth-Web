import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";
import handleAuthAPI from '../../common/handleAuthAPI.js';

import { authAxios } from '../../configs/axios.mjs'
import { loadState, saveState } from '../../helpers/handleState'
import {
  fetchSignIn,
  fetchSignUp,
  fetchFindAccount,
  fetchResetPwEmail,
  fetchCheckResetPwCode,
  fetchResetPasswordAsync,
  fetchSendValidateEmailAsync,
  fetchLogOutAsync
} from './authAPI'

const initialState = {
  formStatus: 'ready',
  statusCode: '',
  message: '',

  // Token type
  access: loadState('access')?.access || '',
  refresh: loadState('refresh')?.refresh || '',
  defaultPw: '', // Default reset pw token
  clientPw: '', // Client reset pw token
  secureCodePw: '', // Secure reset pw token
  hasResetPassword: '',

  username: loadState('username')?.username || 'Simple Shop',
  userStatus: loadState('userStatus')?.userStatus || '',
  email: loadState('email')?.email || '',
  id: loadState('id')?.id || '',
  role: loadState('role')?.role || '',
  slug: '',
}

export const signUpAsync = createAsyncThunk(
  'auth/fetchSignUp',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const { data } = await fetchSignUp({
        access,
        refresh,
      }, payload)

      return data
    } catch (errorResponse) {
      const { code, message } = errorResponse
      if (errorResponse.code === 'ERR_NETWORK') {
        return { code, message }
      }

      return errorResponse.response.data
    }
  }
)

export const signInAsync = createAsyncThunk(
  'auth/fetchSignIn',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const { data } = await fetchSignIn({
        access,
        refresh,
      }, payload)

      return data
    } catch (errorResponse) {
      const { code, message } = errorResponse
      if (errorResponse.code === 'ERR_NETWORK') {
        return { code, message }
      }

      return errorResponse.response.data
    }
  }
)

export const findAccountAsync = createAsyncThunk(
  'auth/fetchFindAccount',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const { data } = await fetchFindAccount({
        access,
        refresh,
      }, payload)

      return data
    } catch (errorResponse) {
      const { code, message } = errorResponse
      if (errorResponse.code === 'ERR_NETWORK') {
        return { code, message }
      }

      return errorResponse.response.data
    }
  }
)

export const resetpwEmailAsync = createAsyncThunk(
  'auth/fetchResetPwEmail',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const { data } = await fetchResetPwEmail({
        access,
        refresh,
      }, payload)

      return data
    } catch (errorResponse) {
      const { code, message } = errorResponse
      if (errorResponse.code === 'ERR_NETWORK') {
        return { code, message }
      }

      return errorResponse.response.data
    }
  }
)

export const checkResetPwCodeAsync = createAsyncThunk(
  'auth/fetchCheckResetPwCode',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const { data } = await fetchCheckResetPwCode({
        access,
        refresh,
      }, payload)

      return data
    } catch (errorResponse) {
      const { code, message } = errorResponse
      if (errorResponse.code === 'ERR_NETWORK') {
        return { code, message }
      }

      return errorResponse.response.data
    }
  }
)

export const resetPasswordAsync = createAsyncThunk(
  'auth/fetchResetPasswordAsync',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const { data } = await fetchResetPasswordAsync({
        access,
        refresh,
      }, payload)

      return data
    } catch (errorResponse) {
      const { code, message } = errorResponse
      if (errorResponse.code === 'ERR_NETWORK') {
        return { code, message }
      }

      return errorResponse.response.data
    }
  }
)

export const sendValidateEmailAsync = createAsyncThunk(
  'auth/fetchSendValidateEmailAsync',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const { data } = await fetchSendValidateEmailAsync({
        access,
        refresh,
      }, payload)

      return data
    } catch (errorResponse) {
      const { code, message } = errorResponse
      if (errorResponse.code === 'ERR_NETWORK') {
        return { code, message }
      }

      return errorResponse.response.data
    }
  }
)

export const logOutAsync = createAsyncThunk(
  'auth/fetchLogOutAsync',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const response = await fetchLogOutAsync({
        access,
        refresh,
      }, payload)

      return response.data
    } catch (errorResponse) {
      const { code, message } = errorResponse
      if (errorResponse.code === 'ERR_NETWORK') {
        return { code, message }
      }

      return errorResponse.response.data
    }
  }
)

export const testAsync = createAsyncThunk(
  'auth/fetchTest',
  async (_payload, { getState }) => {
    try {
      const response = await authAxios.post('/auth/test', {
        refresh: getState().auth.refresh,
      })

      return response.data
    } catch (errorResponse) {
      if (errorResponse.code === 'ERR_NETWORK') {
        return {
          code: errorResponse.code,
          message: errorResponse.message,
        }
      }

      const data = errorResponse.response?.data
      return data
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // ! Reducers here
  reducers: {
    activateAccount: state => {
      state.userStatus = 'active'
      state.statusCode = 200
      state.message = 'Activate account successfully!'
    },
    clearMessage: state => {
      state.message = ''
    },
    clearStatusCode: state => {
      state.statusCode = ''
    },
    clearResetPasswordEntry: state => {
      state.hasResetPassword = ''
    },
  },

  // ! Extra Reducers here
  extraReducers: builder => {
    builder
      // handle signUpAsync cases
      .addCase(signUpAsync.pending, state => {
        state.formStatus = 'loading'
        return
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.formStatus = 'ready'
        return
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.formStatus = 'ready'
          state.message = action.payload.message
          return
        }

        const { code, message } = action.payload
        if ([400, 401, 500].includes(code)) {
          state.formStatus = 'ready'
          state.message = message
          return
        } else if (code === 201) {
          state.formStatus = 'ready'
          const { tokens, user } = action.payload.data
          saveState('access', tokens.access.token);
          saveState('refresh', tokens.refresh.token);
          saveState('username', user.username);
          saveState('userStatus', user.status);
          saveState('email', user.email);
          saveState('id', user.id);
          saveState('role', user.role);

          state.access = tokens.access.token
          state.refresh = tokens.refresh.token

          state.id = user.id
          state.slug = user.slug
          state.userStatus = user.status
          state.username = user.username
          state.role = user.role
          state.email = user.email
          return
        }
      })

      .addCase(signInAsync.pending, state => {
        state.formStatus = 'loading'
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.formStatus = 'ready'
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.formStatus = 'ready'
          state.message = action.payload.message
          return
        }

        const { code, message } = action.payload
        if ([400, 401, 500].includes(code)) {
          state.formStatus = 'ready'
          state.message = message
          return
        } else if (code === 200) {
          state.formStatus = 'ready'
          const { tokens, user } = action.payload.data
          saveState('access', tokens.access.token);
          saveState('refresh', tokens.refresh.token);
          saveState('username', user.username);
          saveState('userStatus', user.status);
          saveState('email', user.email);
          saveState('id', user.id);
          saveState('role', user.role);

          state.access = tokens.access.token
          state.refresh = tokens.refresh.token

          state.id = user.id
          state.slug = user.slug
          state.userStatus = user.status
          state.username = user.username
          state.role = user.role
          state.email = user.email

          document.title = user.username
          return
        }

      })

      .addCase(testAsync.rejected, (state, action) => {
        state.formStatus = 'ready'
      })
      .addCase(testAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return
        console.log('still here')

        const { code, message } = action.payload

        if ([200].includes(code)) {
          state.statusCode = code
          state.message = message

          return
        }
      })

      .addCase(findAccountAsync.pending, state => {
        state.formStatus = 'loading'
      })
      .addCase(findAccountAsync.rejected, state => {
        state.formStatus = 'ready'
      })
      .addCase(findAccountAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        const { code, message } = action.payload
        if (code === 400 || code === 401) {
          state.formStatus = 'ready'
          state.message = 'Your search did not return any results. Please try again with other information.'

          return
        } else if (code === 500) {
          state.formStatus = 'ready'
          state.message = message

          return
        } else if (code === 200) {
          state.formStatus = 'ready'
          state.statusCode = code

          if (action.payload?.data?.token) {
            state.defaultPw = action.payload?.data?.token
            const { email } = jwt_decode(action.payload?.data?.token)
            state.email = email
          }

          return
        }
      })

      .addCase(resetpwEmailAsync.pending, state => {
        state.formStatus = 'loading'
      })
      .addCase(resetpwEmailAsync.rejected, state => {
        state.formStatus = 'ready'
      })
      .addCase(resetpwEmailAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message
          return
        }

        const { code, message } = action.payload
        if (code === 400) {
          state.formStatus = 'ready'
          state.message = 'Something wrong! Please back to find account and try again!'

          return
        } if ([401, 500].includes(code)) {
          state.formStatus = 'ready'
          state.message = message

          return
        } else if (code === 200) {
          state.formStatus = 'ready'
          state.statusCode = code

          const { token } = action.payload?.data
          if (token) {
            state.clientPw = token
          }

          return
        }
      })

      .addCase(checkResetPwCodeAsync.pending, state => {
        state.formStatus = 'loading'
      })
      .addCase(checkResetPwCodeAsync.rejected, state => {
        state.formStatus = 'ready'
      })
      .addCase(checkResetPwCodeAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message
          return
        }

        const { code, message } = action.payload
        if (code === 400) {
          state.formStatus = 'ready'
          state.message = 'Something wrong! Please back to find account and try again!'

          return
        } else if (code === 401) {
          state.formStatus = 'ready'
          state.message = 'The number that you\'ve entered doesn\'t match your code. Please try again but no more than 5 times.'

          return
        } else if (code === 403) {
          state.formStatus = 'ready'
          state.message = 'React limit of reset password session!'

          return
        } else if (code === 500) {
          state.formStatus = 'ready'
          state.message = message

          return
        } else if (code === 200) {
          state.formStatus = 'ready'
          state.statusCode = code

          const { token } = action.payload?.data
          if (token) {
            state.secureCodePw = token
          }

          return
        }
      })

      .addCase(resetPasswordAsync.pending, state => {
        state.formStatus = 'loading'
      })
      .addCase(resetPasswordAsync.rejected, state => {
        state.formStatus = 'ready'
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message
          return
        }

        const { code, message } = action.payload
        if (code === 400) {
          state.formStatus = 'ready'
          state.message = 'Something wrong!'

          return
        } else if ([401, 500].includes(code)) {
          state.formStatus = 'ready'
          state.message = message

          return
        } else if (code === 200) {
          state.formStatus = 'ready'
          state.statusCode = code
          state.message = 'Successfully reset password.'

          state.defaultPw = ''
          state.clientPw = ''
          state.secureCodePw = ''
          state.hasResetPassword = 'true'
          state.email = ''

          return
        }
      })

      .addCase(sendValidateEmailAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message
          return
        }
        const { code, message } = action.payload
        if ([400, 403, 500, 200, 201].includes(code)) {
          state.statusCode = code
          state.message = message

          return
        }
      })

      .addCase(logOutAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        const { code, message } = action.payload

        if ([200, 400, 404, 500].includes(code)) {
          state.statusCode = code
          state.message = message

          state.id = ''
          state.slug = ''
          state.userStatus = ''
          state.username = 'simple shop'
          state.role = ''
          state.access = ''
          state.refresh = ''

          localStorage.removeItem('username')
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
          localStorage.removeItem('userStatus')
          localStorage.removeItem('email')
          localStorage.removeItem('id')
          localStorage.removeItem('role')

          return
        }
      })

  }
})

export const {
  activateAccount,
  clearMessage,
  clearStatusCode,
  clearResetPasswordEntry,
} = authSlice.actions

export default authSlice.reducer
