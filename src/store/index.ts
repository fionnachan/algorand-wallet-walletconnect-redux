import { configureStore } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'
import walletConnectReducer from '../features/walletConnectSlice';
import myAlgoReducer from '../features/myAlgoSlice';
import applicationReducer from '../features/applicationSlice';
import { ChainType } from '../helpers/api';

const PERSISTED_KEYS: string[] = ["walletConnect"];

const store = configureStore({
  reducer: {
    walletConnect: walletConnectReducer,
    myAlgo: myAlgoReducer,
    application: applicationReducer,
  },
  preloadedState: {
    // walletConnect: {
    //   accounts: [],
    //   address: "",
    //   assets: [],
    //   connected: false,
    //   connector: JSON.parse(window.localStorage.getItem("walletconnect") as string),
    //   chain: ChainType.TestNet
    // }
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    })
    // .concat(save({ states, debounce: 1000 })),
});

export default store;