import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import MyAlgo, { Accounts } from "@randlabs/myalgo-connect";
import { apiGetAccountAssets, ChainType } from "../helpers/api";
import { IAssetData } from "../helpers/types";

interface MyAlgoState {
  chain: ChainType,
  accounts: Accounts[],
  address: string,
  assets: IAssetData[],
  connected: boolean,
  connector: MyAlgo | null
}

const initialState = {
  accounts: [],
  address: "",
  assets: [],
  connected: false,
  connector: null,
  chain: ChainType.TestNet
} as MyAlgoState;

export const myAlgoConnect = createAsyncThunk("myAlgo/connect", async (connector: MyAlgo) => {
  return await connector.connect()
    .then((accounts) => {
      return accounts;
    })
    .catch((err) => {
      console.error(err);
    });
})

export const myAlgoSlice = createSlice({
    name: 'myAlgo',
    initialState,
    reducers: {
      switchChain(state, action) {
        state.chain = action.payload
      },
      reset: state => {
        state.accounts = [];
        state.address = "";
        state.assets = [];
        state.connected = false;
        state.connector = null;
        console.log("reset state", state)
      },
      myAlgoInit: state => {
        // Create a connector
        const connector = new MyAlgo();
        state.connector = connector;
      },
      killSession: state => {
        if (state.connected) {
        }
      }
    },
    extraReducers(builder) {
      builder.addCase(myAlgoConnect.fulfilled, (state, action) => {
        console.log("action in extra reduc", action);
        state.accounts = action.payload as Accounts[];
        if (action.payload) {
          state.address = (action.payload as Accounts[])[0].address;
        }
      })
    }
});

export const selectChain = (state: any) => state.myAlgo && state.myAlgo.chain;
export const selectMyAlgoConnector = (state: any) => state.myAlgo && state.myAlgo.connector;
export const selectMyAlgoAccounts = (state: any) => state.myAlgo && state.myAlgo.accounts;
export const selectAddress = (state: any) => state.myAlgo && state.myAlgo.address;

export const {
  reset,
  myAlgoInit,
  killSession
} = myAlgoSlice.actions;

export default myAlgoSlice.reducer;