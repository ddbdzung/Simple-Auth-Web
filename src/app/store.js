// eslint-disable-next-line import/prefer-default-export
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/game/counterSlice';
import authReducer from '../features/auth/authSlice'
import adminReducer from '../features/admin/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    admin: adminReducer,
  },
});
