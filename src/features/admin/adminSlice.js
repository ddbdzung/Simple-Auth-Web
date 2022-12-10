import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import handleAuthAPI from '../../common/handleAuthAPI'
import { loadState, saveState } from '../../helpers/handleState'
import {
  fetchCreateProductAsync,
  fetchDeleteProductAsync,
  fetchGetProductsAsync,
  fetchUpdateProductAsync,
} from './adminAPI'

const initialState = {
  statusCode: '',
  message: '',
  isDeletedProduct: false,

  products: [],
}

export const getProductsAsync = createAsyncThunk(
  'auth/fetchGetProductsAsync',
  async (payload) => {
    try {
      const { data } = await fetchGetProductsAsync(payload)

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

export const createProductAsync = createAsyncThunk(
  'auth/fetchCreateProductAsync',
  async (payload) => {
    try {
      const { data } = await fetchCreateProductAsync(payload)

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

export const updateProductAsync = createAsyncThunk(
  'auth/fetchUpdateProductAsync',
  async (payload) => {
    try {
      const { data } = await fetchUpdateProductAsync(payload)

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

export const deleteProductAsync = createAsyncThunk(
  'auth/fetchDeleteProductAsync',
  async (payload) => {
    try {
      const { data } = await fetchDeleteProductAsync(payload)

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

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  // ! Reducers here
  reducers: {
  },
  // ! Extra Reducers here
  extraReducers: builder => {
    builder
      .addCase(getProductsAsync.pending, (state, action) => {
        state.formStatus = 'loading'
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.formStatus = 'ready'
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.formStatus = 'ready'
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, data } = action.payload

        if ([200].includes(code)) {
          state.products = data

          return
        }
      })

      .addCase(createProductAsync.pending, (state, action) => {
        state.formStatus = 'ready'
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.formStatus = 'ready'
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message, data } = action.payload

        if ([200].includes(code)) {
          state.message = message

          return
        }
      })

      .addCase(updateProductAsync.pending, (state, action) => {
        state.formStatus = 'ready'
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.formStatus = 'ready'
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message, data } = action.payload

        if ([200].includes(code)) {
          state.message = message

          return
        }
      })

      .addCase(deleteProductAsync.pending, (state, action) => {
        state.formStatus = 'ready'
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.formStatus = 'ready'
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message, data } = action.payload

        if ([200].includes(code)) {
          state.message = message

          return
        }
      })
  }
})

export const {
} = adminSlice.actions

export default adminSlice.reducer
