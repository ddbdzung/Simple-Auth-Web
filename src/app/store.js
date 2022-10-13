// eslint-disable-next-line import/prefer-default-export
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/game/counterSlice';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
  },
});
