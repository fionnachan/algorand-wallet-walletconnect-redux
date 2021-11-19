import { configureStore } from '@reduxjs/toolkit'
import walletConnectReducer from '../features/walletConnectSlice';
import applicationReducer from '../features/applicationSlice';

const store = configureStore({
  reducer: {
    walletConnect: walletConnectReducer,
    application: applicationReducer,
  },
  preloadedState: {
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export default store;