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
  isCreatedProduct: false,

  products: loadState('adProducts')?.adProducts ?? [],
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
    afterCreatedProduct: state => {
      state.isCreatedProduct = false
    },
    afterDeletedProduct: state => {
      state.isDeletedProduct = false
    },
    clearMessage: state => {
      state.message = ''
    },
  },
  // ! Extra Reducers here
  extraReducers: builder => {
    builder
      .addCase(getProductsAsync.pending, (state, action) => {
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, data } = action.payload

        if ([200].includes(code)) {
          state.products = data
          saveState('adProducts', data)

          return
        }
      })

      .addCase(createProductAsync.pending, (state, action) => {
      })
      .addCase(createProductAsync.rejected, (state, action) => {
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
          state.isCreatedProduct = true
          state.products = [...loadState('adProducts').adProducts, data]

          return
        }
      })

      .addCase(updateProductAsync.pending, (state, action) => {
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
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
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message, data } = action.payload

        if ([200].includes(code)) {
          state.isDeletedProduct = true
          state.message = message
          const currProducts = loadState('adProducts').adProducts
          const updatedProducts = currProducts.filter(item => item._id !== data._id)
          state.products = updatedProducts
          saveState('adProducts', updatedProducts)

          return
        }
      })
  }
})

export const {
  afterCreatedProduct,
  afterDeletedProduct,
  clearMessage,
} = adminSlice.actions

export default adminSlice.reducer
