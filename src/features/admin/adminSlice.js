import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import handleAuthAPI from '../../common/handleAuthAPI'
import { loadState, saveState } from '../../helpers/handleState'
import {
  fetchCreateBrandAsync,
  fetchCreateCatalogAsync,
  fetchCreateProductAsync,
  fetchDeleteBrandAsync,
  fetchDeleteCatalogAsync,
  fetchDeleteProductAsync,
  fetchGetBrandsAsync,
  fetchGetCataloguesAsync,
  fetchGetProductsAsync,
  fetchUpdateBrandAsync,
  fetchUpdateProductAsync,
  fetchUpdateCatalogAsync,
  fetchGetOrdersAsync,
  fetchUpdateOrderAsync,
} from './adminAPI'

const initialState = {
  statusCode: '',
  message: '',
  isCreatedItem: false,

  orders: loadState('adOrders')?.adOrders ?? [],
  products: loadState('adProducts')?.adProducts ?? [],
  brands: loadState('adBrands')?.adBrands ?? [],
  catalogues: loadState('adCatalogues')?.adCatalogues ?? [],
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

export const getBrandsAsync = createAsyncThunk(
  'auth/fetchGetBrandsAsync',
  async (payload) => {
    try {
      const { data } = await fetchGetBrandsAsync(payload)

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

export const getCataloguesAsync = createAsyncThunk(
  'auth/fetchGetCataloguesAsync',
  async (payload) => {
    try {
      const { data } = await fetchGetCataloguesAsync(payload)

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

export const getOrdersAsync = createAsyncThunk(
  'auth/fetchGetOrdersAsync',
  async (payload) => {
    try {
      const { data } = await fetchGetOrdersAsync(payload)

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

export const createBrandAsync = createAsyncThunk(
  'auth/fetchCreateBrandAsync',
  async (payload) => {
    try {
      const { data } = await fetchCreateBrandAsync(payload)

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

export const createCatalogAsync = createAsyncThunk(
  'auth/fetchCreateCatalogAsync',
  async (payload) => {
    try {
      const { data } = await fetchCreateCatalogAsync(payload)

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

export const updateBrandAsync = createAsyncThunk(
  'auth/fetchUpdateBrandAsync',
  async (payload) => {
    try {
      const { data } = await fetchUpdateBrandAsync(payload)

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

export const updateCatalogAsync = createAsyncThunk(
  'auth/fetchUpdateCatalogAsync',
  async (payload) => {
    try {
      const { data } = await fetchUpdateCatalogAsync(payload)

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

export const updateOrderAsync = createAsyncThunk(
  'auth/fetchUpdateOrderAsync',
  async (payload) => {
    try {
      const { data } = await fetchUpdateOrderAsync(payload)

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
export const deleteBrandAsync = createAsyncThunk(
  'auth/fetchDeleteBrandAsync',
  async (payload) => {
    try {
      const { data } = await fetchDeleteBrandAsync(payload)

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

export const deleteCatalogAsync = createAsyncThunk(
  'auth/fetchDeleteCatalogAsync',
  async (payload) => {
    try {
      const { data } = await fetchDeleteCatalogAsync(payload)

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
    afterCreatedItem: state => {
      state.isCreatedItem = false
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

      .addCase(getBrandsAsync.pending, (state, action) => {
      })
      .addCase(getBrandsAsync.rejected, (state, action) => {
      })
      .addCase(getBrandsAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, data } = action.payload

        if ([200].includes(code)) {
          state.brands = data
          saveState('adBrands', data)

          return
        }
      })

      .addCase(getCataloguesAsync.pending, (state, action) => {
      })
      .addCase(getCataloguesAsync.rejected, (state, action) => {
      })
      .addCase(getCataloguesAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, data } = action.payload

        if ([200].includes(code)) {
          state.catalogues = data
          saveState('adCatalogues', data)

          return
        }
      })

      .addCase(getOrdersAsync.pending, (state, action) => {
      })
      .addCase(getOrdersAsync.rejected, (state, action) => {
      })
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, data } = action.payload

        if ([200].includes(code)) {
          state.orders = data
          saveState('adOrders', data)

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
        const newData = [...loadState('adProducts').adProducts, data]

        if ([200].includes(code)) {
          saveState('adProducts', newData)
          state.message = message
          state.isCreatedItem = true
          state.products = newData

          return
        }
      })

      .addCase(createBrandAsync.pending, (state, action) => {
      })
      .addCase(createBrandAsync.rejected, (state, action) => {
      })
      .addCase(createBrandAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message, data } = action.payload

        if ([200].includes(code)) {
          state.message = message
          state.isCreatedItem = true
          state.brands = [...loadState('adBrands').adBrands, data]

          return
        }
      })

      .addCase(createCatalogAsync.pending, (state, action) => {
      })
      .addCase(createCatalogAsync.rejected, (state, action) => {
      })
      .addCase(createCatalogAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message, data } = action.payload

        if ([200].includes(code)) {
          state.message = message
          state.isCreatedItem = true
          state.catalogues = [...loadState('adCatalogues').adCatalogues, data]

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

        const { code, message } = action.payload

        if ([200].includes(code)) {
          state.message = message

          return
        }
      })

      .addCase(updateBrandAsync.pending, (state, action) => {
      })
      .addCase(updateBrandAsync.rejected, (state, action) => {
      })
      .addCase(updateBrandAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message } = action.payload

        if ([200].includes(code)) {
          state.message = message

          return
        }
      })

      .addCase(updateCatalogAsync.pending, (state, action) => {
      })
      .addCase(updateCatalogAsync.rejected, (state, action) => {
      })
      .addCase(updateCatalogAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message } = action.payload

        if ([200].includes(code)) {
          state.message = message

          return
        }
      })

      .addCase(updateOrderAsync.pending, (state, action) => {
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message } = action.payload

        if ([200].includes(code)) {
          state.message = 'Cập nhật thành công'

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
          state.message = message
          const currProducts = loadState('adProducts').adProducts
          const updatedProducts = currProducts.filter(item => item._id !== data._id)
          state.products = updatedProducts
          saveState('adProducts', updatedProducts)

          return
        }
      })

      .addCase(deleteBrandAsync.pending, (state, action) => {
      })
      .addCase(deleteBrandAsync.rejected, (state, action) => {
      })
      .addCase(deleteBrandAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message, data } = action.payload

        if ([200].includes(code)) {
          state.message = message
          const currBrands = loadState('adBrands').adBrands
          const updatedBrands = currBrands.filter(item => item._id !== data._id)
          state.brands = updatedBrands
          saveState('adBrands', updatedBrands)

          return
        }
      })

      .addCase(deleteCatalogAsync.pending, (state, action) => {
      })
      .addCase(deleteCatalogAsync.rejected, (state, action) => {
      })
      .addCase(deleteCatalogAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        if (!handleAuthAPI(state, action.payload)) return

        const { code, message, data } = action.payload

        if ([200].includes(code)) {
          state.message = message
          const currCatalogues = loadState('adCatalogues').adCatalogues
          const updatedCatalogues = currCatalogues.filter(item => item._id !== data._id)
          state.catalogues = updatedCatalogues
          saveState('adCatalogues', updatedCatalogues)

          return
        }
      })
  }
})

export const {
  afterCreatedItem,
  clearMessage,
} = adminSlice.actions

export default adminSlice.reducer
