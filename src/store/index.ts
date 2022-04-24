import { configureStore } from "@reduxjs/toolkit";
import walletConnectReducer from "../features/walletConnectSlice";
import applicationReducer from "../features/applicationSlice";
import logger from "../features/logger";

const store = configureStore({
  reducer: {
    walletConnect: walletConnectReducer,
    application: applicationReducer,
  },
  preloadedState: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
