import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import _ from 'lodash'

import { loadState, saveState } from '../../helpers/handleState'
import {
  fetchCheckoutAsync,
} from './publicAPI'

const initialState = {
  message: '',
  statusCode: '',

  cart: loadState('cart')?.cart ?? [],
}

export const checkoutAsync = createAsyncThunk(
  'auth/fetchCheckoutAsync',
  async (payload) => {
    try {
      const { data } = await fetchCheckoutAsync({}, payload)

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
export const publicSlice = createSlice({
  name: 'public',
  initialState,
  // ! Reducers here
  reducers: {
    clearStatus: state => {
      state.statusCode = ''
      state.message = ''
    },
    clearStatusCode: state => {
      state.statusCode = ''
    },
    clearMessage: state => {
      state.message = ''
    },
    addToCart: (state, action) => {
      const { id } = action.payload
      const currCart = current(state)?.cart ?? loadState('cart')?.cart
      const idList = currCart.map(item => item?.id)
      if (!idList.includes(id)) {
        const cart = [...state.cart, { id, amount: 1 }]
        state.cart = cart
        saveState('cart', cart)
      } else {
        const newCart = currCart.map(item => (item?.id === id) ? { id, amount: item.amount + 1 } : item)
        state.cart = newCart
        saveState('cart', newCart)
      }
      state.message = 'Thêm vào giỏ hàng thành công'
    },
    increaseItemInCart: (state, action) => {
      const { id } = action.payload
      const currCart = current(state)?.cart ?? loadState('cart')?.cart
      const idList = currCart.map(item => item?.id)
      if (!idList.includes(id)) {
        const cart = [...state.cart, { id, amount: 1 }]
        state.cart = cart
        saveState('cart', cart)
      } else {
        const newCart = currCart.map(item => (item?.id === id) ? { id, amount: item.amount + 1 } : item)
        state.cart = newCart
        saveState('cart', newCart)
      }
    },
    decreaseItemInCart: (state, action) => {
      const { id } = action.payload
      const currCart = current(state)?.cart ?? loadState('cart')?.cart
      const idList = currCart.map(item => item?.id)
      if (idList.includes(id)) {
        const x = currCart.map(item => {
          if (item?.id === id) {
            if (item.amount === 1) return undefined

            return { id, amount: item.amount - 1 }
          }

          return item
        })

        const newCart = _.without(x, undefined)
        state.cart = newCart
        saveState('cart', newCart)
      }
    },
    removeItemInCart: (state, action) => {
      const { id } = action.payload
      const currCart = current(state)?.cart ?? loadState('cart')?.cart
      const idList = currCart.map(item => item?.id)
      if (idList.includes(id)) {
        const x = currCart.map(item => (item?.id === id) ? undefined : item)

        const newCart = _.without(x, undefined)
        state.cart = newCart
        saveState('cart', newCart)
      }
    },
  },
  // ! Extra Reducers here
  extraReducers: builder => {
    builder
      .addCase(checkoutAsync.fulfilled, (state, action) => {
        if (action?.payload?.code === 'ERR_NETWORK') {
          state.message = action.payload.message

          return
        }

        const { code, message, _data } = action.payload

        if ([201].includes(code)) {
          state.statusCode = 201
          state.message = message
          state.cart = []

          return
        }
      })
  }
})

export const {
  clearStatus,
  clearMessage,
  clearStatusCode,
  addToCart,
  increaseItemInCart,
  decreaseItemInCart,
  removeItemInCart,
} = publicSlice.actions

export default publicSlice.reducer
