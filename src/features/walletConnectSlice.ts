import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { apiGetAccountAssets, ChainType } from "../helpers/api";
import { IAssetData } from "../helpers/types";
import { RootState } from "../store";

interface WalletConnectState {
  chain: ChainType;
  accounts: string[];
  address: string;
  assets: IAssetData[];
  fetching: boolean;
}

const initialState = {
  accounts: [],
  address: "",
  assets: [],
  chain: ChainType.TestNet,
  fetching: false,
} as WalletConnectState;

export const getAccountAssets = createAsyncThunk(
  "walletConnect/getAccountAssets",
  async ({ chain, address }: { chain: ChainType; address: string }) => {
    return await apiGetAccountAssets(chain, address);    
  },
);

export const walletConnectSlice = createSlice({
  name: "walletConnect",
  initialState,
  reducers: {
    switchChain(state, action) {
      state.chain = action.payload;
    },
    reset: (state) => ({ ...initialState, chain: state.chain }),
    onSessionUpdate: (state, action) => {
      state.accounts = action.payload;
      state.address = action.payload[0];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAccountAssets.fulfilled, (state, action) => {
      state.fetching = false;
      state.assets = action.payload;
    });
    builder.addCase(getAccountAssets.pending, (state) => {
      state.fetching = true;
    });
  },
});

export const selectAssets = createSelector(
  (state: RootState) => state.walletConnect.assets,
  (assets) => assets.map((a) => ({ ...a, amount: BigInt(a.amount) })),
);

export const { switchChain, reset, onSessionUpdate } = walletConnectSlice.actions;

export default walletConnectSlice.reducer;
