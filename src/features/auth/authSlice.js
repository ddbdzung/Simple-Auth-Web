import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { customAxios } from '../../helpers/customAxios'

import { loadState, saveState } from '../../helpers/handleState'
import { fetchSignIn, fetchSignUp, fetchFindAccount, fetchResetPwEmail, fetchCheckResetPwCode, fetchResetPasswordAsync, fetchSendValidateEmailAsync } from './authAPI'

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

export const sendValidateEmailAsync = createAsyncThunk(
  'auth/fetchSendValidateEmailAsync',
  async (payload, { getState }) => {
    const { access, refresh } = getState().auth
    try {
      const response = await fetchSendValidateEmailAsync({
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
  // ! Reducers here
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
      localStorage.removeItem('userStatus')
      localStorage.removeItem('email')
      localStorage.removeItem('id')
      localStorage.removeItem('role')
    },
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
          state.message = 'Successfully reset password.'

          state.defaultPw = ''
          state.clientPw = ''
          state.secureCodePw = ''
          state.hasResetPassword = 'true'

          return
        }
      })

      .addCase(sendValidateEmailAsync.pending, state => {
        // state.formStatus = 'loading'
      })
      .addCase(sendValidateEmailAsync.rejected, state => {
        // state.formStatus = 'ready'
      })
      .addCase(sendValidateEmailAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message
          return
        }
        const { code, message } = action.payload
        if ([400, 403, 500, 200, 201, 500].includes(code)) {
          state.statusCode = code
          state.message = message

          return
        }
      })

  }
})

export const {
  logOut,
  activateAccount,
  clearMessage,
  clearStatusCode,
  clearResetPasswordEntry,
} = authSlice.actions

export default authSlice.reducer
