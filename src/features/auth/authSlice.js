import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { customAxios } from '../../helpers/customAxios'

import { loadState, saveState } from '../../helpers/handleState'
import { fetchSignIn, fetchSignUp } from './authAPI'

const initialState = {
  formStatus: 'ready',
  message: '',

  access: loadState('access')?.access || '',
  refresh: loadState('refresh')?.refresh || '',

  username: loadState('username')?.username || '',
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
      state.username = ''
      state.role = ''
      state.access = ''
      state.refresh = ''

      localStorage.removeItem('username')
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
    },
    clearMessage: state => {
      state.message = ''
    }
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
          // Handle error 400
          state.formStatus = 'ready'
          state.message = message
          return
        } else if (code === 500) {
          // Handle internal server error
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
          // Handle error 400
          state.formStatus = 'ready'
          state.message = message
          return
        } else if (code === 500) {
          // Handle internal server error
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
          // Handle error 400
          state.message = message
          return
        } else if (code === 500) {
          // Handle internal server error
          state.message = message
          return

        } else if (code === 200) {
          state.message = message
          return
        }

      })
  }
})

export const { logOut, clearMessage } = authSlice.actions

export default authSlice.reducer
