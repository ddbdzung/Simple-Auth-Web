// eslint-disable-next-line import/prefer-default-export
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/game/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});