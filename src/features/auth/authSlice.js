import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { customAxios } from '../../helpers/customAxios'

import { loadState, saveState } from '../../helpers/handleState'
import { fetchSignIn, fetchSignUp, fetchFindAccount, fetchResetPwEmail, fetchCheckResetPwCode, fetchResetPasswordAsync } from './authAPI'

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

  username: loadState('username')?.username || 'Simple Shop',
  userStatus: '',
  id: '',
  role: '',
  slug: '',
}

export const signUpAsync = createAsyncThunk(
  'auth/fetchSignUp',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const response = await fetchSignUp({
        access,
        refresh,
      }, payload)

      return response.data
    } catch (errorResponse) {
      if (errorResponse.code === 'ERR_NETWORK') {
        return {
          code: errorResponse.code,
          message: errorResponse.message,
        }
      }

      const { data } = errorResponse.response
      return data
    }
  }
)

export const signInAsync = createAsyncThunk(
  'auth/fetchSignIn',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const response = await fetchSignIn({
        access,
        refresh,
      }, payload)

      return response.data
    } catch (errorResponse) {
      if (errorResponse.code === 'ERR_NETWORK') {
        return {
          code: errorResponse.code,
          message: errorResponse.message,
        }
      }

      const { data } = errorResponse.response
      return data
    }
  }
)
export const findAccountAsync = createAsyncThunk(
  'auth/fetchFindAccount',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const response = await fetchFindAccount({
        access,
        refresh,
      }, payload)

      return response.data
    } catch (errorResponse) {
      if (errorResponse.code === 'ERR_NETWORK') {
        return {
          code: errorResponse.code,
          message: errorResponse.message,
        }
      }

      const { data } = errorResponse.response
      return data
    }
  }
)

export const resetpwEmailAsync = createAsyncThunk(
  'auth/fetchResetPwEmail',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const response = await fetchResetPwEmail({
        access,
        refresh,
      }, payload)

      return response.data
    } catch (errorResponse) {
      if (errorResponse.code === 'ERR_NETWORK') {
        return {
          code: errorResponse.code,
          message: errorResponse.message,
        }
      }

      const { data } = errorResponse.response
      return data
    }
  }
)

export const checkResetPwCodeAsync = createAsyncThunk(
  'auth/fetchCheckResetPwCode',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const response = await fetchCheckResetPwCode({
        access,
        refresh,
      }, payload)

      return response.data
    } catch (errorResponse) {
      if (errorResponse.code === 'ERR_NETWORK') {
        return {
          code: errorResponse.code,
          message: errorResponse.message,
        }
      }

      const { data } = errorResponse.response
      return data
    }
  }
)

export const resetPasswordAsync = createAsyncThunk(
  'auth/fetchResetPasswordAsync',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const response = await fetchResetPasswordAsync({
        access,
        refresh,
      }, payload)

      return response.data
    } catch (errorResponse) {
      if (errorResponse.code === 'ERR_NETWORK') {
        return {
          code: errorResponse.code,
          message: errorResponse.message,
        }
      }

      const { data } = errorResponse.response
      return data
    }
  }
)

export const testAsync = createAsyncThunk(
  'auth/fetchTest',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth

    try {
      const response = await customAxios.post('/auth/test', { access, refresh }, payload)

      return response.data
    } catch (errorResponse) {
      if (errorResponse.code === 'ERR_NETWORK') {
        return {
          code: errorResponse.code,
          message: errorResponse.message,
        }
      }

      const { data } = errorResponse.response
      return data
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logOut: state => {
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
    },
    clearMessage: state => {
      state.message = ''
    },
    clearStatusCode: state => {
      state.statusCode = ''
    },
  },

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
        if (code === 400 || code === 401) {
          state.formStatus = 'ready'
          state.message = message
          return
        } else if (code === 500) {
          state.formStatus = 'ready'
          state.message = message
          return
        } else if (code === 201) {
          state.formStatus = 'ready'
          const { tokens, user } = action.payload.data
          saveState('access', tokens.access.token);
          saveState('refresh', tokens.refresh.token);
          saveState('username', user.username);

          state.access = tokens.access.token
          state.refresh = tokens.refresh.token

          state.id = user.id
          state.slug = user.slug
          state.userStatus = user.status
          state.username = user.username
          state.role = user.role
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
        if (code === 400 || code === 401) {
          state.formStatus = 'ready'
          state.message = message
          return
        } else if (code === 500) {
          state.formStatus = 'ready'
          state.message = message
          return

        } else if (code === 200) {
          state.formStatus = 'ready'
          const { tokens, user } = action.payload.data
          saveState('access', tokens.access.token);
          saveState('refresh', tokens.refresh.token);
          saveState('username', user.username);

          state.access = tokens.access.token
          state.refresh = tokens.refresh.token

          state.id = user.id
          state.slug = user.slug
          state.userStatus = user.status
          state.username = user.username
          state.role = user.role

          document.title = user.username
          return
        }

      })

      .addCase(testAsync.pending, state => {

      })
      .addCase(testAsync.rejected, (state, action) => {

      })
      .addCase(testAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message
          return
        }

        const { code, message } = action.payload
        if (code === 400 || code === 401) {
          state.message = message
          return
        } else if (code === 500) {
          state.message = message
          return

        } else if (code === 200) {
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
        } else if (code === 401) {
          state.formStatus = 'ready'
          state.message = message

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
        } else if (code === 401) {
          state.formStatus = 'ready'
          state.message = message

          return
        } else if (code === 500) {
          state.formStatus = 'ready'
          state.message = message

          return
        } else if (code === 200) {
          state.formStatus = 'ready'
          state.statusCode = code
          state.message = ' Successfully reset password.'

          state.defaultPw = ''
          state.clientPw = ''
          state.secureCodePw = ''

          return
        }
      })

  }
})

export const { logOut, clearMessage, clearStatusCode, cancelResetPassword } = authSlice.actions

export default authSlice.reducer
