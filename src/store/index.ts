import { configureStore } from '@reduxjs/toolkit'
import walletConnectReducer from '../features/walletConnectSlice';
import myAlgoReducer from '../features/myAlgoSlice';
import applicationReducer from '../features/applicationSlice';
import { ChainType } from '../helpers/api';

export default configureStore({
  reducer: {
    walletConnect: walletConnectReducer,
    myAlgo: myAlgoReducer,
    application: applicationReducer,
  },
  preloadedState: {
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});