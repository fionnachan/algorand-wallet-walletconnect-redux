import { configureStore } from '@reduxjs/toolkit'
import walletConnectReducer from '../features/walletConnectSlice';
import { ChainType } from '../helpers/api';

export default configureStore({
  reducer: {
    walletConnect: walletConnectReducer,
  },
  preloadedState: {
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});